'use client'
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../_components/Container";
import Heading from "../_components/modalContent/Heading";
import SpaceCard from "../_components/spaces/SpaceCard";

interface BookingHelperProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}


const BookingHelper: React.FC<BookingHelperProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Booking has been cancelled successfully!');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);
    return (
        <Container>
            <Heading
                title="Bookings"
                subtitle="Spaces you have booked for storage"
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <SpaceCard
                        key={reservation.id}
                        data={reservation.space}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel booking"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default BookingHelper;