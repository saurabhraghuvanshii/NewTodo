import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user) redirect("/");

    return (
        <div className="min-h-screen flex">
            <Sidebar user={session.user} />
            <main className="flex-1 p-8 ml-[280px]">{children}</main>
        </div>
    );
}
