"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { SubmitButton } from "../submit-button";
import UppyApp from "../uppy/UppyApp";
import { Badge } from "../ui/badge";
import { createClient } from "@/src/utils/supabase/client";
import dayjs from "dayjs";

export interface ImageForm {
  image_url: string;
  title: string;
  description: string;
  tags: string[];
  filmed_at: Date | null;
}

export default function Component() {
  const defaultValues: ImageForm = {
    image_url: "",
    title: "",
    description: "",
    tags: [],
    filmed_at: null,
  };

  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<ImageForm>(defaultValues);
  const [tag, setTag] = useState("");
  const [supabase] = useState(createClient());
  const [error, setError] = useState<string | null>(null);

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

  const handleDialogConfirm = () => {
    supabase.from("images").insert(formData);
    setTag("");
    setFormData(defaultValues);
    setShowDialog(false);
  };

  const handleDialogCancel: MouseEventHandler = (e) => {
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
          <UppyApp
            className="mb-3"
            bucketName="finepine"
            folderPath="kevin_film_images"
            setImageUrl={setImageUrl}
          />

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
          <div className="fixed flex flex-col gap-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-sm px-3 py-2 rounded-md z-10">
            <p></p>
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
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-25"
            onClick={handleDialogCancel}
          />
        </>
      )}
    </>
  );
}
