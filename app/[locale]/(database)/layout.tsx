import { Sidebar } from "@/components/layout/sidebar";

export default function DatabaseShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4 pt-16 md:p-6">{children}</div>
    </div>
  );
}
