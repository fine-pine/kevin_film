import business_card from "@/public/images/business_card_x4.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative flex flex-col items-end mt-16 w-[792px]">
      <Image
        className="object-contain"
        src={business_card}
        alt="business card"
      />
      <p className="absolute bottom-40">
        For prints, please contact Via E-Mail.
      </p>
      <a
        className="absolute top-[18.75rem] right-72 -rotate-[32deg] opacity-0"
        href="https://instagram.com/film.bykevin"
      >
        @film.bykevin
      </a>
      <a
        className="absolute top-[20.25rem] right-56 -rotate-[32deg] opacity-0"
        href="mailto:ottoran1217@naver.com"
      >
        ottoran1217@naver.com
      </a>
    </div>
  );
}
