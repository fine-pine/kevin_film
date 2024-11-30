"use client";

import { ImageRow } from "@/src/constants";
import { MasonryGrid } from "@egjs/react-grid";
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

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
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
            <Image
              className="w-full max-h-[540px]"
              src={image.image_url}
              alt={image.title}
              sizes="100vw"
              width={512}
              height={512}
            />
            <div className="flex w-full justify-between">
              <p>#{image.tags.join(" #")}</p>
              <div className="flex">
                <h2>{image.title}</h2>
                {showDescription ? (
                  <ChevronUp className="w-6 h-6" onClick={toggleDescription} />
                ) : (
                  <ChevronDown
                    className="w-6 h-6"
                    onClick={toggleDescription}
                  />
                )}
              </div>
              <p>{image.filmed_at.toString()}</p>
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
