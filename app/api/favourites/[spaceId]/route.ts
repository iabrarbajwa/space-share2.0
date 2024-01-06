import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "@/lib/db";

interface IParams {
    spaceId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { spaceId } = params;

    if (!spaceId || typeof spaceId !== 'string') {
        throw new Error("Invalid ID");
    }

    let favouritesIds = [...(currentUser.favoriteIds || [])];

    favouritesIds.push(spaceId);
    const user = await db.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favouritesIds
        }
    });

    return NextResponse.json(user);

}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const { spaceId } = params;
    if (!spaceId || typeof spaceId !== 'string') {
        throw new Error("Invalid ID");
    }

    let favouritesIds = [...(currentUser.favoriteIds || [])];
    favouritesIds = favouritesIds.filter((id) => id != spaceId);
    const user = await db.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favouritesIds
        }
    });
    return NextResponse.json(user);
}