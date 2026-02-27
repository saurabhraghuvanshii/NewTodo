"use client";

import { useState } from "react";

interface AddBookmarkModalProps {
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

const types = [
    { value: "YOUTUBE", label: "YouTube", emoji: "🎬" },
    { value: "TWEET", label: "Tweet", emoji: "🐦" },
    { value: "PDF", label: "PDF", emoji: "📄" },
    { value: "NOTION", label: "Notion", emoji: "📝" },
    { value: "GENERIC", label: "Other", emoji: "🔗" },
];

export function AddBookmarkModal({ onClose, onSubmit }: AddBookmarkModalProps) {
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState("GENERIC");

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                        New Bookmark
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors cursor-pointer"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        const formData = new FormData(e.currentTarget);
                        await onSubmit(formData);
                        setLoading(false);
                    }}
                    className="space-y-4"
                >
                    {/* Type selector chips */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: "var(--color-text-secondary)" }}>
                            Type
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {types.map((t) => (
                                <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => setSelectedType(t.value)}
                                    className={`chip cursor-pointer transition-all ${selectedType === t.value ? "chip-blue" : "chip-muted"
                                        }`}
                                >
                                    {t.emoji} {t.label}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="type" value={selectedType} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                            Title *
                        </label>
                        <input
                            name="title"
                            required
                            placeholder="Give your bookmark a name"
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                            URL *
                        </label>
                        <input
                            name="url"
                            required
                            type="url"
                            placeholder={
                                selectedType === "YOUTUBE"
                                    ? "https://youtube.com/watch?v=..."
                                    : selectedType === "TWEET"
                                        ? "https://x.com/user/status/..."
                                        : selectedType === "NOTION"
                                            ? "https://notion.so/page-id"
                                            : "https://example.com"
                            }
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Optional notes about this bookmark..."
                            rows={3}
                            className="input-field resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="glow-button-secondary flex-1 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="glow-button flex-1 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Bookmark"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
