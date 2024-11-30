import Image from "next/image";
import ImageCard from "../components/custom/ImageCard";
import { TAGS } from "../constants";

export default function Home() {
  return (
    <section className="flex flex-col gap-32">
      <Image
        className="object-cover"
        src="/images/portrait.jpg"
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
        {TAGS.map((tag) => (
          <ImageCard
            key={tag}
            tag={tag}
            src={`/images/${tag}.jpg`}
            alt={`${tag} image`}
            variant={true}
          />
        ))}
      </article>
    </section>
  );
}
