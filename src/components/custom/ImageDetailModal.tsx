"use client";

import { ImageRow } from "@/src/constants";
import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

interface Props {
  image: ImageRow;
  handleClose: () => void;
}

export default function Component({ image, handleClose }: Props) {
  const [showDescription, setShowDescription] = useState(false);

  const handleOpenDescription = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <>
      <div className="absolute top-24 flex flex-col gap-2 pb-24 text-destructive-foreground z-10">
        <p>#{image.tags.join(" #")}</p>
        <Image
          className="w-full h-[700px] object-contain"
          src={image.image_url}
          alt={image.title}
          sizes="100dvw"
          width={512}
          height={512}
        />
        <div className="flex justify-between w-full">
          <div className="flex justify-self-center">
            <h2>{image.title}</h2>
            {showDescription ? (
              <TriangleUpIcon
                className="w-6 h-6 cursor-pointer"
                onClick={handleCloseDescription}
              />
            ) : (
              <TriangleDownIcon
                className="w-6 h-6 cursor-pointer"
                onClick={handleOpenDescription}
              />
            )}
          </div>
          <p className="justify-self-end">
            {dayjs(image.filmed_at).format("YYYY-MM-DD")}
          </p>
        </div>
        {showDescription && <p>{image.description}</p>}
      </div>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85"
        onClick={handleClose}
      />
    </>
  );
}
