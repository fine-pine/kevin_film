import { createClient } from "@/src/utils/supabase/server";
import { ImageRow } from "../constants";

export default async function Component() {
  const supabase = await createClient();
  const { data: images } = await supabase.from("images").select();

  return (
    <ul>
      {images?.map((image: ImageRow) => <li key={image.id}>{image.title}</li>)}
    </ul>
  );
}
