import { createClient } from "@supabase/supabase-js";

/**
 * Admin client using the service role key.
 * Only use server-side for admin operations (e.g., creating user accounts).
 * NEVER expose this on the client.
 */
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        },
    );
}
