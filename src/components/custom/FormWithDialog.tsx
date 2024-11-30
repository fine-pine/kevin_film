"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../submit-button";

export default function Component() {
  const [showDialog, setShowDialog] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [],
      title: "",
      description: "",
      image: null,
      filmed_at: new Date(),
    },
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    () => {
      setShowDialog(true);
    }
  );

  const handleDialogConfirm = handleSubmit((formData) => {
    const data = new FormData();

    // TODO: add attributes
    data.append("image", formData.image!);
    data.append("description", formData.description);

    // TODO: supabase image upload
    // TODO: supabase row insert

    setShowDialog(false);
    reset();
  });

  const handleDialogCancel: MouseEventHandler = (e) => {
    e.preventDefault();
    setShowDialog(false);
  };

  return (
    <>
      <form
        className="flex-1 flex flex-col min-w-64"
        onSubmit={handleFormSubmit}
      >
        {
          // TODO: add attributes
        }
        <div className="flex flex-col gap-2 [&>p]:mb-3 mt-8">
          <Label>Image</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Image is required.",
            })}
          />
          {errors.image && (
            <p className="text-xs text-destructive">{errors.image.message}</p>
          )}
          <Label>Description</Label>
          <Textarea
            {...register("description", {
              required: "Description is required.",
            })}
          ></Textarea>
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
          <SubmitButton pendingText="Uploading...">Upload</SubmitButton>
        </div>
      </form>

      {showDialog && (
        <>
          <div className="fixed flex flex-col gap-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-sm px-3 py-2 rounded-md z-10">
            <p>정말로 제출하시겠습니까?</p>
            <div className="flex gap-4">
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleDialogCancel}
              >
                취소
              </Button>
              <Button className="flex-1" onClick={handleDialogConfirm}>
                확인
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
