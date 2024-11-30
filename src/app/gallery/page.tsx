import MasonryGridWrapper from "@/src/components/custom/MasonryGridWithDialog";
import { createClient } from "@/src/utils/supabase/server";
import { TAGS } from "@/src/constants";

interface Props {
  searchParams: Promise<{
    tag: (typeof TAGS)[];
  }>;
}

export default async function Component({ searchParams }: Props) {
  const { tag } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("images").select();
  if (tag) {
    query = query.contains("tags", [tag]);
  }
  const { data: images } = await query;

  return <>{images && <MasonryGridWrapper images={images} />}</>;
}
