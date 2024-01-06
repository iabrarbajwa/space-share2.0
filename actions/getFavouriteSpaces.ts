import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";


export default async function getFavouriteSpaces() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favourites = await db.space.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createdAt: favourite.createdAt.toString(),
        }));

        return safeFavourites;
    } catch (error: any) {
        throw new Error(error);
    }
}