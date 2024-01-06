import EmptyState from "../_components/EmptyState";
import { getCurrentUser } from "@/lib/getCurrentUser";
import getReservations from "@/actions/reservation.action";
import ReservationHelper from "./ReservationHelper";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized Access"
                subtitle="Please Sign in to continue..."
            />
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found!"
                subtitle="Looks like no one made reservation on your spaces."
            />
        );
    }

    return (
        <ReservationHelper
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}

export default ReservationsPage;