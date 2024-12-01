"use server";

import Image from "next/image";
import ImageCard from "../components/custom/ImageCard";
import { ImageRow, TAGS } from "../constants";
import { createClient } from "../utils/supabase/server";
import banner_image from "@/public/images/person.jpg";
import placeholder_image from "@/public/images/image_placeholder.svg";

export default async function Home() {
  const supabase = await createClient();
  const { data: images } = await supabase.from("images").select();

  return (
    <section className="flex flex-col gap-32">
      <Image
        className="object-cover"
        src={banner_image}
        alt="main image, the man standing"
        width={1200}
        height={800}
      />
      <article>
        <h1 className="text-2xl font-medium mb-2">Kevin Film</h1>
        <p>
          Based is Seoul, I pursue traditional silver gelatin photography. In
          the rampant of digital photography, I try to juxtapose my imagination
          with the technique of printing with an enlarger. Welcome to my shrine
          of genuine affection towards analogue photography.
        </p>
      </article>
      <article className="flex flex-wrap w-full gap-6">
        {TAGS.map((tag) => {
          const thumbnail_url = images?.filter((image: ImageRow) =>
            image.tags.includes(tag)
          )[0]?.image_url;

          return (
            <ImageCard
              key={tag}
              tag={tag}
              src={thumbnail_url || placeholder_image}
              alt={`${tag} image`}
              variant={true}
            />
          );
        })}
      </article>
    </section>
  );
}
