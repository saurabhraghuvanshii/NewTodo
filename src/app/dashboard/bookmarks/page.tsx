import { getBookmarks } from "@/app/actions/bookmarks";
import { BookmarkList } from "@/components/BookmarkList";
import { BookmarkType } from "@prisma/client";

export default async function BookmarksPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const params = await searchParams;
    const type = params.type as BookmarkType | undefined;
    const bookmarks = await getBookmarks(type);

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{
                        background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-liquid-300) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {type ? `${type.charAt(0) + type.slice(1).toLowerCase()} Bookmarks` : "All Bookmarks"}
                </h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                    Save and organize your favorite content
                </p>
            </div>

            <BookmarkList initialBookmarks={bookmarks} activeType={type || null} />
        </div>
    );
}
