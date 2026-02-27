"use client";

import { useState } from "react";
import { createBookmark, deleteBookmark } from "@/app/actions/bookmarks";
import { AddBookmarkModal } from "@/components/AddBookmarkModal";
import { BookmarkCard } from "@/components/BookmarkCard";
import Link from "next/link";

interface Bookmark {
    id: string;
    title: string;
    url: string;
    type: string;
    description: string | null;
    createdAt: Date;
}

const typeFilters = [
    { label: "All", type: null, emoji: "" },
    { label: "YouTube", type: "YOUTUBE", emoji: "" },
    { label: "Tweets", type: "TWEET", emoji: "" },
    { label: "PDFs", type: "PDF", emoji: "" },
    { label: "Notion", type: "NOTION", emoji: "" },
    { label: "Other", type: "GENERIC", emoji: "" },
];

export function BookmarkList({
    initialBookmarks,
    activeType,
}: {
    initialBookmarks: Bookmark[];
    activeType: string | null;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Top bar with filter chips and add button */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 flex-wrap">
                    {typeFilters.map((f) => (
                        <Link
                            key={f.label}
                            href={f.type ? `/dashboard/bookmarks?type=${f.type}` : "/dashboard/bookmarks"}
                            className={`chip cursor-pointer no-underline ${activeType === f.type || (!activeType && !f.type) ? "chip-blue" : "chip-muted"
                                }`}
                        >
                            {f.emoji} {f.label}
                        </Link>
                    ))}
                </div>
                <button onClick={() => setShowModal(true)} className="glow-button cursor-pointer flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Bookmark
                </button>
            </div>

            {/* Bookmark grid */}
            {initialBookmarks.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                    <div className="text-4xl mb-4">🔖</div>
                    <p className="text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                        No bookmarks yet
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                        Save tweets, videos, PDFs, and more
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {initialBookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            onDelete={async () => {
                                await deleteBookmark(bookmark.id);
                            }}
                        />
                    ))}
                </div>
            )}

            {showModal && (
                <AddBookmarkModal
                    onClose={() => setShowModal(false)}
                    onSubmit={async (formData) => {
                        await createBookmark(formData);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
}
