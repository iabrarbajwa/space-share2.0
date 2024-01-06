import { db } from "@/lib/db";


interface IParams {
    spaceId?: string
}

export async function getSpaceById(params: IParams) {
    try {
        const { spaceId } = params;

        const space = await db.space.findUnique({
            where: {
                id: spaceId,
            },
            include: {
                user: true,
            }
        });

        if (!space) {
            return null;
        }

        return {
            ...space,
            createdAt: space.createdAt.toString(),
            user: {
                ...space.user,
                createdAt: space.user.createdAt.toString(),
                updatedAt: space.user.updatedAt.toString(),
            }
        };
    } catch (error: any) {
        throw new Error(error);
    }
}