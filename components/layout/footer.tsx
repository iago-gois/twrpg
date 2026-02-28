import { SITE_NAME } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground">
                <p>
                    &copy; {new Date().getFullYear()} {SITE_NAME}. All rights
                    reserved.
                </p>
                <p>
                    TWRPG is a Warcraft III custom map. This is a fan-made
                    database.
                </p>
            </div>
        </footer>
    );
}
