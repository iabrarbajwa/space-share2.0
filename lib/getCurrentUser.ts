import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getCurrentUser = async () => {

    try {
        const clerkUser = await currentUser();

        if (!clerkUser || !clerkUser.emailAddresses[0].emailAddress) {
            return null;
        }

        const user = await db.user.findUnique({
            where: { externalUserId: clerkUser.id },
        });

        if (!user) {
            throw new Error("Not Found!")
        }

        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    } catch (error: any) {
        return null;
    }
} 