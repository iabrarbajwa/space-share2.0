import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";


interface IParams {
    spaceId?: string;
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
        throw new Error('Invalid ID');
    }

    const space = await db.space.deleteMany({
        where: {
            id: spaceId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(space);
}