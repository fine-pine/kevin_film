"use client";

import { ImageRow } from "@/src/constants";
import { MasonryGrid } from "@egjs/react-grid";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: ImageRow[];
}

export default function Component({ images }: Props) {
  const [image, setImage] = useState<ImageRow | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const handleClose = () => {
    setImage(null);
  };

  const handleOpenDescription = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <>
      <MasonryGrid
        className="container"
        gap={24}
        defaultDirection="end"
        align="justify"
        column={3}
        columnSize={384}
      >
        {images.map((image) => (
          <Image
            className="item object-contain"
            key={image.id}
            src={image.image_url}
            alt={image.title}
            width={384}
            height={384}
            onClick={() => setImage(image)}
          />
        ))}
      </MasonryGrid>
      {image && (
        <>
          <div className="absolute top-32 flex flex-col gap-2 text-destructive-foreground z-10">
            <p>#{image.tags.join(" #")}</p>
            <Image
              className="w-full h-[540px]"
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
                  <ChevronUp
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleCloseDescription}
                  />
                ) : (
                  <ChevronDown
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
      )}
    </>
  );
}
