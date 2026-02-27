"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { BookmarkType } from "@prisma/client";

async function getUserId() {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Not authenticated");
    return session.user.id;
}

export async function getBookmarks(type?: BookmarkType) {
    const userId = await getUserId();
    return prisma.bookmark.findMany({
        where: { userId, ...(type ? { type } : {}) },
        orderBy: { createdAt: "desc" },
    });
}

export async function createBookmark(formData: FormData) {
    const userId = await getUserId();
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const type = (formData.get("type") as BookmarkType) || "GENERIC";
    const description = (formData.get("description") as string) || null;

    await prisma.bookmark.create({
        data: { title, url, type, description, userId },
    });
    revalidatePath("/dashboard/bookmarks");
}

export async function deleteBookmark(id: string) {
    const userId = await getUserId();
    await prisma.bookmark.deleteMany({ where: { id, userId } });
    revalidatePath("/dashboard/bookmarks");
}
