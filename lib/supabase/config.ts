export function getSupabaseUrl() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

	if (!url) {
		throw new Error(
			"Missing NEXT_PUBLIC_SUPABASE_URL in environment variables.",
		);
	}

	return url;
}

export function getSupabasePublicKey() {
	const key =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!key) {
		throw new Error(
			"Missing Supabase public key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY).",
		);
	}

	return key;
}
