'use server'

import { createSupabaseClient } from "../supabase";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions") // ✅ string table name, no `relation:` or colon
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create a companion");
  }

  return data[0];
};
