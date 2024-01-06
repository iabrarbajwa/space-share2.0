'use client';
import { toast } from "react-hot-toast"
import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { SafeReservation, SafeUser } from "@/types"
import Heading from "../_components/modalContent/Heading";
import Container from "../_components/Container";
import SpaceCard from "../_components/spaces/SpaceCard";

interface ReservationHelperProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null,
}

const ReservationHelper: React.FC<ReservationHelperProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Renter Reservation has been cancelled successfully!');
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your spaces"
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
                        actionLabel="Cancel renter reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ReservationHelper;