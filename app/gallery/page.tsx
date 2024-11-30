import { createClient } from "@/utils/supabase/server";
import { ImageRow } from "../constants";

export default async function Component() {
  const supabase = await createClient();
  const { data } = await supabase.from("images").select();
  const images: ImageRow[] = JSON.parse(JSON.stringify(data, null, 2));
  return (
    <pre>
      {images.map((image) => (
        <p key={image.id}>{image.title}</p>
      ))}
    </pre>
  );
}
