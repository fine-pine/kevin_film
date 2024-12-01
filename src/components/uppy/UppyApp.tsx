"use client";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Dashboard from "@uppy/react/lib/Dashboard";
import Uppy from "@uppy/core";
import { useEffect, useState } from "react";
import Tus from "@uppy/tus";
import { createClient } from "@/src/utils/supabase/client";
import { ImageForm } from "../custom/FormWithDialog";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  bucketName: string;
  folderPath?: string;
  setValue: UseFormSetValue<ImageForm>;
}

export default function Component({ bucketName, folderPath, setValue }: Props) {
  const supabase = createClient();
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
          endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/upload/resumable`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            authorization: `Bearer ${session?.access_token}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          uploadDataDuringCreation: true,
          removeFingerprintOnSuccess: true,
          chunkSize: 6 * 1024 * 1024,
          allowedMetaFields: [
            "bucketName",
            "objectName",
            "contentType",
            "cacheControl",
          ],
          onError: (error) => console.error("Upload error:", error),
        })
        .on("file-added", (file) => {
          // Attach metadata to each file, including bucket name and content type
          file.meta = {
            ...file.meta,
            bucketName,
            objectName: folderPath + "/" + file.name,
            contentType: file.type,
          };
        })
        .on("upload-success", async (file, response) => {
          // Handle successful upload
          setValue(
            "image_url",
            `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${folderPath}/${file!.name}`
          );
        });
    };

    initializeUppy();
  }, []);

  return <Dashboard uppy={uppy} showProgressDetails />;
}
