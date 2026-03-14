import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET() {
	const supabase = createClient(getSupabaseUrl(), getSupabasePublicKey(), {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	const table = "classes";
	const { data, error } = await supabase
		.from(table)
		.select("id")
		.limit(1);

	if (error) {
		console.warn("keep-alive query failed", { table, message: error.message });
		return NextResponse.json(
			{ ok: false, table, error: error.message },
			{ status: 200 },
		);
	}

	return NextResponse.json(
		{ ok: true, table, row: data?.[0] ?? null, ts: new Date().toISOString() },
		{ status: 200 },
	);
}
