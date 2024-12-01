"use client";

import { ImageRow } from "@/constants";
import { MasonryGrid } from "@egjs/react-grid";
import Image from "next/image";
import { useState } from "react";
import ImageDetailModal from "./ImageDetailModal";

interface Props {
  images: ImageRow[];
}

export default function Component({ images }: Props) {
  const [image, setImage] = useState<ImageRow | null>(null);

  const handleClose = () => {
    setImage(null);
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
      {image && <ImageDetailModal image={image} handleClose={handleClose} />}
    </>
  );
}
