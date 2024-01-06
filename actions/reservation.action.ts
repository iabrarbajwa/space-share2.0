import { db } from "@/lib/db";


interface IParams {
    spaceId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {
        const { spaceId, userId, authorId } = params;

        const query: any = {};

        if (spaceId) {
            query.spaceId = spaceId;
        };

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.space = { userId: authorId };
        }

        const reservations = await db.reservation.findMany({
            where: query,
            include: {
                space: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            space: {
                ...reservation.space,
                createdAt: reservation.space.createdAt.toISOString(),
            },
        }));

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}