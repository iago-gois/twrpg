import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    // First, refresh the Supabase session
    const supabaseResponse = await updateSession(request);

    // Then, run the intl middleware for locale routing
    const intlResponse = intlMiddleware(request);

    // Merge Supabase cookies into the intl response
    supabaseResponse.cookies.getAll().forEach((cookie) => {
        intlResponse.cookies.set(cookie.name, cookie.value);
    });

    return intlResponse;
}

export const config = {
    matcher: [
        // Match all pathnames except for:
        // - API routes that don't need i18n
        // - _next (Next.js internals)
        // - Static files (images, fonts, etc.)
        "/((?!api|_next|.*\\..*).*)",
    ],
};
