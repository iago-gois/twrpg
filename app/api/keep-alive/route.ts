import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";
const TABLE_NAME = "classes";

export async function GET() {
  const supabase = createClient(getSupabaseUrl(), getSupabasePublicKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase.from(TABLE_NAME).select("id").limit(1);

  if (error) {
    console.warn("keep-alive query failed", {
      table: TABLE_NAME,
      message: error.message,
    });
    return NextResponse.json(
      { ok: false, table: TABLE_NAME, error: error.message },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      table: TABLE_NAME,
      row: data?.[0] ?? null,
      ts: new Date().toISOString(),
    },
    { status: 200 },
  );
}
