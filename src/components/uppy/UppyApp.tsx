"use client";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Dashboard from "@uppy/react/lib/Dashboard";
import Uppy from "@uppy/core";
import { useEffect, useState } from "react";
import Tus from "@uppy/tus";
import { createClient } from "@/src/utils/supabase/client";
import { isValidKey } from "@/src/lib/limits";

interface Props {
  bucketName: string;
  folderPath?: string;
  setImageUrl: (url: string) => void;
  className?: string;
}

export default function Component({
  bucketName,
  folderPath,
  setImageUrl,
  className,
}: Props) {
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
            objectName:
              folderPath +
              "/" +
              (isValidKey(file.name!) ? file.name : window.btoa(file.name!)),
            contentType: file.type,
          };
        })
        .on("upload-success", async (file, response) => {
          // Upload is successful, update the image_url in the form data
          setImageUrl(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${folderPath}/${file!.name}`
          );
        });
    };

    initializeUppy();
  }, []);

  return <Dashboard className={className} uppy={uppy} showProgressDetails />;
}
