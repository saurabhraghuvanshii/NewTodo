"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

const navItems = [
    {
        label: "Todos",
        href: "/dashboard/todos",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        label: "Bookmarks",
        href: "/dashboard/bookmarks",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
        ),
    },
];

const bookmarkFilters = [
    { label: "All", type: "ALL", emoji: "" },
    { label: "YouTube", type: "YOUTUBE", emoji: "" },
    { label: "Tweets", type: "TWEET", emoji: "" },
    { label: "PDFs", type: "PDF", emoji: "" },
    { label: "Notion", type: "NOTION", emoji: "" },
    { label: "Other", type: "GENERIC", emoji: "" },
];

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const isBookmarks = pathname.startsWith("/dashboard/bookmarks");

    return (
        <aside
            className="fixed left-0 top-0 bottom-0 w-[280px] flex flex-col"
            style={{
                background: "var(--color-navy-900)",
                borderRight: "1px solid var(--color-glass-border)",
            }}
        >
            {/* Logo */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, var(--color-liquid-500), var(--color-liquid-400))",
                            boxShadow: "0 4px 12px rgba(30, 144, 255, 0.3)",
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg" style={{ color: "var(--color-text-primary)" }}>
                        Liquid Todo
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: "var(--color-text-muted)" }}>
                    Menu
                </p>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`sidebar-link ${pathname === item.href || (item.href === "/dashboard/bookmarks" && isBookmarks) ? "active" : ""}`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}

                {/* Bookmark Filters */}
                {isBookmarks && (
                    <div className="mt-6">
                        <p className="text-[11px] font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: "var(--color-text-muted)" }}>
                            Filter Bookmarks
                        </p>
                        {bookmarkFilters.map((filter) => {
                            const href = filter.type === "ALL"
                                ? "/dashboard/bookmarks"
                                : `/dashboard/bookmarks?type=${filter.type}`;
                            const isActive = filter.type === "ALL"
                                ? pathname === "/dashboard/bookmarks" && !new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("type")
                                : false;

                            return (
                                <Link
                                    key={filter.type}
                                    href={href}
                                    className={`sidebar-link ${isActive ? "active" : ""}`}
                                >
                                    <span className="text-base">{filter.emoji}</span>
                                    {filter.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* User profile */}
            <div
                className="p-4 mx-4 mb-4 rounded-2xl flex items-center gap-3"
                style={{
                    background: "var(--color-navy-800)",
                    border: "1px solid var(--color-glass-border)",
                }}
            >
                {user.image ? (
                    <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-9 h-9 rounded-full"
                        style={{ border: "2px solid var(--color-liquid-400)" }}
                    />
                ) : (
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{ background: "var(--color-liquid-500)" }}
                    >
                        {user.name?.charAt(0) || "U"}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-primary)" }}>
                        {user.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: "var(--color-text-muted)" }}>
                        {user.email}
                    </p>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="p-2 rounded-lg transition-colors cursor-pointer"
                    style={{ color: "var(--color-text-muted)" }}
                    title="Sign out"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}
