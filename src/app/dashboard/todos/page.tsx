import { getTodos } from "@/app/actions/todos";
import { TodoList } from "@/components/TodoList";

export default async function TodosPage() {
    const todos = await getTodos();

    return (
        <div className="max-w-4xl mx-auto">
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
                    My Todos
                </h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
                    Manage your tasks with elegance
                </p>
            </div>

            <TodoList initialTodos={todos} />
        </div>
    );
}
