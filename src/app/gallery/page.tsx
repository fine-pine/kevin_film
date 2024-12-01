import MasonryGridWrapper from "@/src/components/custom/MasonryGridWithDialog";
import { createClient } from "@/src/utils/supabase/server";
import { TAGS } from "@/src/constants";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

interface Props {
  searchParams: Promise<{
    tag: (typeof TAGS)[];
  }>;
}

export default async function Component({ searchParams }: Props) {
  const { tag } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase.from("images").select();
  if (tag) {
    query = query.contains("tags", [tag]);
  }
  const { data: images } = await query;

  return (
    <>
      {user && (
        <Link className="fixed bottom-4 right-14" href="/gallery/write">
          Write
        </Link>
      )}
      {images && <MasonryGridWrapper images={images} />}
    </>
  );
}
