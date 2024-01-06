import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { db } from "@/lib/db";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { spaceId, startDate, endDate, totalPrice } = body;

    if (!spaceId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const spaceAndReservation = await db.space.update({
        where: {
            id: spaceId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    return NextResponse.json(spaceAndReservation);
}