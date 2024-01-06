import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        height,
        width,
        length,
        category,
        location,
        price

    } = body;

    const space = await db.space.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            height,
            width,
            length,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(space);

}