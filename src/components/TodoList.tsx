"use client";

import { useState } from "react";
import { createTodo, toggleTodo, deleteTodo } from "@/app/actions/todos";
import { AddTodoModal } from "@/components/AddTodoModal";

interface Todo {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: string;
    dueDate: Date | null;
    createdAt: Date;
}

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const filtered = initialTodos.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const stats = {
        total: initialTodos.length,
        active: initialTodos.filter((t) => !t.completed).length,
        completed: initialTodos.filter((t) => t.completed).length,
    };

    return (
        <>
            {/* Stats chips */}
            <div className="flex gap-3 mb-6 flex-wrap">
                <div className="chip chip-blue">
                    <span style={{ fontSize: "14px" }}>📋</span>
                    {stats.total} Total
                </div>
                <div className="chip chip-yellow">
                    <span style={{ fontSize: "14px" }}>⏳</span>
                    {stats.active} Active
                </div>
                <div className="chip chip-green">
                    <span style={{ fontSize: "14px" }}>✅</span>
                    {stats.completed} Done
                </div>
            </div>

            {/* Filters + Add button */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    {(["all", "active", "completed"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`chip cursor-pointer ${filter === f ? "chip-blue" : "chip-muted"}`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
                <button onClick={() => setShowModal(true)} className="glow-button cursor-pointer flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Todo
                </button>
            </div>

            {/* Todo list */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <p className="text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                            {filter === "all" ? "No todos yet" : `No ${filter} todos`}
                        </p>
                        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                            Click &ldquo;Add Todo&rdquo; to get started
                        </p>
                    </div>
                ) : (
                    filtered.map((todo) => (
                        <div
                            key={todo.id}
                            className="glass-panel glass-panel-hover p-5 flex items-start gap-4 transition-all duration-200"
                            style={{
                                opacity: todo.completed ? 0.6 : 1,
                            }}
                        >
                            {/* Checkbox */}
                            <form action={() => toggleTodo(todo.id)}>
                                <button
                                    type="submit"
                                    className="mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shrink-0"
                                    style={{
                                        borderColor: todo.completed ? "var(--color-success)" : "var(--color-navy-600)",
                                        background: todo.completed ? "var(--color-success)" : "transparent",
                                    }}
                                >
                                    {todo.completed && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            </form>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3
                                    className="font-medium text-[15px] mb-1"
                                    style={{
                                        color: "var(--color-text-primary)",
                                        textDecoration: todo.completed ? "line-through" : "none",
                                    }}
                                >
                                    {todo.title}
                                </h3>
                                {todo.description && (
                                    <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
                                        {todo.description}
                                    </p>
                                )}

                                {/* Chips row */}
                                <div className="flex gap-2 flex-wrap">
                                    {/* Priority chip */}
                                    <span
                                        className={`chip ${todo.priority === "high"
                                                ? "chip-red"
                                                : todo.priority === "medium"
                                                    ? "chip-yellow"
                                                    : "chip-muted"
                                            }`}
                                    >
                                        {todo.priority === "high" ? "🔴" : todo.priority === "medium" ? "🟡" : "🟢"}{" "}
                                        {todo.priority}
                                    </span>

                                    {/* Due date chip */}
                                    {todo.dueDate && (
                                        <span className="chip chip-blue">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {new Date(todo.dueDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    )}

                                    {/* Time chip */}
                                    {todo.dueDate && (
                                        <span className="chip chip-blue">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {new Date(todo.dueDate).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    )}

                                    {/* Created chip */}
                                    <span className="chip chip-muted">
                                        {new Date(todo.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* Delete */}
                            <form action={() => deleteTodo(todo.id)}>
                                <button
                                    type="submit"
                                    className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10"
                                    style={{ color: "var(--color-text-muted)" }}
                                    title="Delete"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <AddTodoModal
                    onClose={() => setShowModal(false)}
                    onSubmit={async (formData) => {
                        await createTodo(formData);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
}
