import { Space, Reservation, User } from "@prisma/client";

export type SafeSpace = Omit<Space, "createdAt"> & {
    createdAt: string;
};

export type SafeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "space"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    space: SafeSpace;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};