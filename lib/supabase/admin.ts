import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "./config";

/**
 * Admin client using the service role key.
 * Only use server-side for admin operations (e.g., creating user accounts).
 * NEVER expose this on the client.
 */
export function createAdminClient() {
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceRoleKey) {
		throw new Error(
			"Missing SUPABASE_SERVICE_ROLE_KEY. Admin actions are disabled until this key is configured.",
		);
	}

	return createClient(getSupabaseUrl(), serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
