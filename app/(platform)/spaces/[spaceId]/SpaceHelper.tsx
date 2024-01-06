'use client';
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addMonths, differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { SafeSpace, SafeReservation, SafeUser } from "@/types";
import { Range } from "react-date-range";
import Container from "../../_components/Container";
import { categories } from "../../_components/Categories/Category";
import SpaceHead from "../../_components/spaces/SpaceHead";
import SpaceInfo from "../../_components/spaces/SpaceInfo";
import SpaceReservation from "../../_components/spaces/SpaceReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface SpaceHelperProps {
    reservations?: SafeReservation[];
    space: SafeSpace & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const SpaceHelper: React.FC<SpaceHelperProps> = ({
    space,
    reservations = [],
    currentUser
}) => {
    const router = useRouter();


    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === space.category);
    }, [space.category]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(space.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            router.push("/sign-in")
            return;
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            spaceId: space?.id
        })
            .then(() => {
                toast.success('Space reserved successfully!');
                setDateRange(initialDateRange);

                // Redirect to bookings page
                router.push('/bookings');
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [totalPrice, dateRange, space?.id, router, currentUser]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            // Calculate the number of days between start and end dates
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            // Calculate the daily rate from the monthly price
            const monthlyPrice = space.price || 0; // Replace 0 with a default value if needed
            const daysInMonth = differenceInCalendarDays(
                addMonths(dateRange.startDate, 1),
                dateRange.startDate
            );

            const dailyRate = monthlyPrice / daysInMonth;

            // Calculate the total price based on the daily rate
            const totalPrice = Math.round(dayCount * dailyRate);

            setTotalPrice(totalPrice);
        }
    }, [dateRange, space.price]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <SpaceHead
                        title={space.title}
                        imageSrc={space.imageSrc}
                        locationValue={space.locationValue}
                        id={space.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <SpaceInfo
                            user={space.user}
                            category={category}
                            description={space.description}
                            height={space.height}
                            length={space.length}
                            width={space.width}
                            locationValue={space.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <SpaceReservation
                                price={space.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SpaceHelper;