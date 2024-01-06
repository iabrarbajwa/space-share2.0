import { db } from "@/lib/db";

export interface ISpacesParams {
    userId?: string;
    height?: number;
    length?: number;
    width?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    price?: number
}


export default async function getSpaces(params: ISpacesParams) {
    try {
        const { userId, height, length, width, startDate, endDate, locationValue, category, price } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }
        if (price) {
            query.price = {
                gte: +price
            };
        }

        if (height) {
            query.height = {
                gte: +height
            }
        }

        if (length) {
            query.length = {
                gte: +length
            }
        }

        if (width) {
            query.width = {
                gte: +width
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const spaces = await db.space.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeSpaces = spaces.map((space) => ({
            ...space,
            createdAt: space.createdAt.toISOString(),
        }));

        return safeSpaces;

    } catch (error: any) {
        throw new Error(error);
    }
}
