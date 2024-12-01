"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { SubmitButton } from "../submit-button";
import { Badge } from "../ui/badge";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { ImageForm } from "@/constants";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { isValidKey } from "@/lib/limits";
import Dashboard from "@uppy/react/lib/Dashboard";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const defaultValues: ImageForm = {
  image_url: "",
  title: "",
  description: "",
  tags: [],
  filmed_at: null,
};

export default function Component() {
  const bucketName = "finepine";
  const folderPath = "kevin_film_images";

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<ImageForm>(defaultValues);
  const [tag, setTag] = useState("");
  const [supabase] = useState(createClient());
  const [error, setError] = useState<string | null>(null);
  const [uppy] = useState(
    () => new Uppy({ restrictions: { maxNumberOfFiles: 1 } })
  );

  useEffect(() => {
    const initializeUppy = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      uppy
        .use(Tus, {
          endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/upload/resumable`, // Supabase TUS endpoint
          retryDelays: [0, 3000, 5000, 10000, 20000], // Retry delays for resumable uploads
          headers: {
            authorization: `Bearer ${session?.access_token}`, // User session access token
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // API key for Supabase
          },
          uploadDataDuringCreation: true, // Send metadata with file chunks
          removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
          chunkSize: 6 * 1024 * 1024, // Chunk size for TUS uploads (6MB)
          allowedMetaFields: [
            "bucketName",
            "objectName",
            "contentType",
            "cacheControl",
          ], // Metadata fields allowed for the upload
          onError: (error) => console.error("Upload error:", error), // Error handling for uploads
        })
        .on("file-added", (file) => {
          // Attach metadata to each file, including bucket name and content type

          const validFileName = isValidKey(file.name!)
            ? file.name
            : `${Buffer.from(file.name?.split(".")[0]!, "utf8").toString("base64")}.${file.name?.split(".")[1]}`;

          file.meta = {
            ...file.meta,
            bucketName, // Bucket specified by the user of the hook
            objectName: `${folderPath}/${validFileName}`, // Use file name as object name
            contentType: file.type, // Set content type based on file MIME type
          };
        })
        .on("upload-success", (file, response) => {
          // Set the image URL to the uploaded file's URL
          setImageUrl(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${folderPath}/${file!.name}`
          );
        });
    };

    initializeUppy();
  }, [uppy, bucketName]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTag: MouseEventHandler = (e) => {
    e.preventDefault();
    const value = tag.trim();
    setTag("");
    if (!value) return;
    if (value === "") return;
    if (formData.tags.includes(value)) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (formData.image_url === "") {
      setError("Image is required");
      return;
    }
    if (formData.title === "") {
      setError("Title is required");
      return;
    }
    if (formData.description === "") {
      setError("Description is required");
      return;
    }
    if (formData.tags.length === 0) {
      setError("Tags are required");
      return;
    }
    if (formData.filmed_at === null) {
      setError("Filmed at is required");
      return;
    }

    setShowDialog(true);
  };

  const handleDialogConfirm = async () => {
    const { error } = await supabase.from("images").insert(formData);
    if (error) {
      console.error(error.code + " " + error.message);
      return;
    }

    setTag("");
    setError(null);
    uppy.clear();
    setFormData(defaultValues);
    setShowDialog(false);
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  const setImageUrl = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  return (
    <>
      <form
        className="flex-1 flex flex-col min-w-64"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-2 mt-8">
          <Label>Image</Label>
          <Dashboard className="mb-3" uppy={uppy} showProgressDetails />

          <Label htmlFor="title">Title</Label>
          <Input
            className="mb-3"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <Label className="mb-3" htmlFor="description">
            Description
          </Label>
          <Textarea
            className="mb-3"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />

          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2">
            <Input
              placeholder="input tags"
              value={tag}
              onChange={(e) => setTag(e.currentTarget.value)}
            />
            <Button onClick={handleAddTag}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, idx) => (
              <Badge
                key={idx}
                className="cursor-pointer"
                variant="outline"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: prev.tags.filter((_, i) => i !== idx),
                  }))
                }
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Label htmlFor="filmed_at">Filemed At</Label>
          <Input
            className="mb-3"
            id="filmed_at"
            name="filmed_at"
            type="datetime-local"
            value={dayjs(formData.filmed_at).format("YYYY-MM-DDTHH:mm")}
            onChange={handleChange}
          />

          <SubmitButton pendingText="Uploading...">Upload</SubmitButton>
          {error && <p className="text-xm text-destructive">{error}</p>}
        </div>
      </form>

      {showDialog && (
        <>
          <div className="fixed flex flex-col gap-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-sm px-3 py-2 rounded-md z-50">
            <p>Are you sure you want to submit?</p>
            <div className="flex gap-4">
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleDialogCancel}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleDialogConfirm}>
                Confirm
              </Button>
            </div>
          </div>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25 z-40"
            onClick={handleDialogCancel}
          />
        </>
      )}
    </>
  );
}
