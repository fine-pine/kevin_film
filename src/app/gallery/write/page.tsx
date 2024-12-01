"use server";

import FormWithDialog from "@/components/custom/FormWithDialog";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // check login status
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <section>
      <FormWithDialog />
    </section>
  );
}
