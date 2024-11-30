import MasonryGridWrapper from "@/src/components/custom/MasonryGridWithDialog";
import { createClient } from "@/src/utils/supabase/server";

export default async function Component() {
  const supabase = await createClient();
  const { data: images } = await supabase.from("images").select();

  return <>{images && <MasonryGridWrapper images={images} />}</>;
}
