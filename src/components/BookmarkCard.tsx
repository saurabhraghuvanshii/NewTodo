"use client";

interface BookmarkCardProps {
    bookmark: {
        id: string;
        title: string;
        url: string;
        type: string;
        description: string | null;
        createdAt: Date;
    };
    onDelete: () => Promise<void>;
}

const typeConfig: Record<string, { emoji: string; color: string; bg: string; border: string }> = {
    YOUTUBE: { emoji: "🎬", color: "#ff4444", bg: "rgba(255,68,68,0.1)", border: "rgba(255,68,68,0.2)" },
    TWEET: { emoji: "🐦", color: "#1da1f2", bg: "rgba(29,161,242,0.1)", border: "rgba(29,161,242,0.2)" },
    PDF: { emoji: "📄", color: "#ff6b35", bg: "rgba(255,107,53,0.1)", border: "rgba(255,107,53,0.2)" },
    NOTION: { emoji: "📝", color: "#fff", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)" },
    GENERIC: { emoji: "🔗", color: "#8b95b0", bg: "rgba(139,149,176,0.1)", border: "rgba(139,149,176,0.2)" },
};

function getYouTubeId(url: string) {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match?.[1] || null;
}

function getTweetId(url: string) {
    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
    return match?.[1] || null;
}

function getNotionId(url: string) {
    return url.includes("notion.so") || url.includes("notion.site");
}

export function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
    const config = typeConfig[bookmark.type] || typeConfig.GENERIC;
    const youtubeId = bookmark.type === "YOUTUBE" ? getYouTubeId(bookmark.url) : null;
    const tweetId = bookmark.type === "TWEET" ? getTweetId(bookmark.url) : null;
    const isNotion = bookmark.type === "NOTION" ? getNotionId(bookmark.url) : false;

    return (
        <div className="glass-panel glass-panel-hover overflow-hidden transition-all duration-200">
            {/* YouTube embed */}
            {youtubeId && (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={bookmark.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none" }}
                    />
                </div>
            )}

            {/* Tweet embed */}
            {tweetId && (
                <div className="p-4 pb-0">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ background: "var(--color-navy-800)", border: "1px solid var(--color-glass-border)" }}
                    >
                        <iframe
                            src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
                            className="w-full"
                            style={{ height: "300px", border: "none" }}
                            title={bookmark.title}
                        />
                    </div>
                </div>
            )}

            {/* Notion embed */}
            {isNotion && (
                <div className="p-4 pb-0">
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ background: "var(--color-navy-800)", border: "1px solid var(--color-glass-border)" }}
                    >
                        <iframe
                            src={bookmark.url.replace("notion.so", "notion.site")}
                            className="w-full"
                            style={{ height: "400px", border: "none" }}
                            title={bookmark.title}
                        />
                    </div>
                </div>
            )}

            {/* Card content */}
            <div className="p-5">
                <div className="flex items-start gap-3">
                    {/* Type icon */}
                    <div
                        className="bookmark-type-icon shrink-0"
                        style={{ background: config.bg, border: `1px solid ${config.border}` }}
                    >
                        <span className="text-lg">{config.emoji}</span>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className="font-semibold text-[15px] mb-1 truncate"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            {bookmark.title}
                        </h3>
                        {bookmark.description && (
                            <p
                                className="text-sm mb-2 line-clamp-2"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                {bookmark.description}
                            </p>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Type chip */}
                            <span
                                className="chip"
                                style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}
                            >
                                {config.emoji} {bookmark.type}
                            </span>

                            {/* Date chip */}
                            <span className="chip chip-muted">
                                {new Date(bookmark.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 shrink-0">
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: "var(--color-text-muted)" }}
                            title="Open URL"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                        <button
                            onClick={onDelete}
                            className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10"
                            style={{ color: "var(--color-text-muted)" }}
                            title="Delete"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
