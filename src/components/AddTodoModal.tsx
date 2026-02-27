"use client";

import { useState } from "react";

interface AddTodoModalProps {
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

export function AddTodoModal({ onClose, onSubmit }: AddTodoModalProps) {
    const [loading, setLoading] = useState(false);

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                        New Todo
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
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                            Title *
                        </label>
                        <input
                            name="title"
                            required
                            placeholder="What needs to be done?"
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Add some details..."
                            rows={3}
                            className="input-field resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                                Priority
                            </label>
                            <select name="priority" className="input-field" defaultValue="medium">
                                <option value="low">🟢 Low</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="high">🔴 High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                                Due Date
                            </label>
                            <input
                                name="dueDate"
                                type="datetime-local"
                                className="input-field"
                            />
                        </div>
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
                            {loading ? "Creating..." : "Create Todo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
