"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getUserId() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated");
    return session.user.id;
}

export async function getTodos() {
    const userId = await getUserId();
    return prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createTodo(formData: FormData) {
    const userId = await getUserId();
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || null;
    const priority = (formData.get("priority") as string) || "medium";
    const dueDateStr = formData.get("dueDate") as string;
    const dueDate = dueDateStr ? new Date(dueDateStr) : null;

    await prisma.todo.create({
        data: { title, description, priority, dueDate, userId },
    });
    revalidatePath("/dashboard/todos");
}

export async function toggleTodo(id: string) {
    const userId = await getUserId();
    const todo = await prisma.todo.findFirst({ where: { id, userId } });
    if (!todo) throw new Error("Todo not found");

    await prisma.todo.update({
        where: { id },
        data: { completed: !todo.completed },
    });
    revalidatePath("/dashboard/todos");
}

export async function deleteTodo(id: string) {
    const userId = await getUserId();
    await prisma.todo.deleteMany({ where: { id, userId } });
    revalidatePath("/dashboard/todos");
}
