import Image from "next/image";
import highlights_1 from "/public/images/highlights_x1 (1).png";
import highlights_2 from "/public/images/highlights_x1 (2).png";
import paper_1 from "/public/images/paper_x1 (1).png";
import paper_2 from "/public/images/paper_x1 (2).png";
import type { TAGS } from "@/constants";
import Link from "next/link";

interface Props {
  tag: (typeof TAGS)[number];
  src: string;
  alt: string;
  variant: boolean;
}

export default function Component({ tag, src, alt, variant }: Props) {
  return (
    <Link
      className="flex flex-col hover:-translate-y-[2px] hover:cursor-pointer transition-all"
      href={`/gallery?tag=${tag}`}
    >
      <h2>#{tag}</h2>
      <div className="relative flex flex-col w-96 h-[545px] p-8 shadow">
        <Image
          className="absolute"
          src={variant ? paper_2 : paper_1}
          alt="paper"
          fill
        />
        <span className="relative w-full h-full">
          <Image
            className="object-contain object-center"
            fill
            src={src}
            alt={alt}
          />
        </span>
        <Image
          className="absolute mix-blend-screen"
          src={variant ? highlights_2 : highlights_1}
          alt="highlights"
          fill
        />
      </div>
    </Link>
  );
}
