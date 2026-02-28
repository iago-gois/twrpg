import { Sidebar } from "@/components/layout/sidebar";

export default function DatabaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
    );
}
