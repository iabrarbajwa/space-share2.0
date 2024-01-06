import EmptyState from "../_components/EmptyState";
import { getCurrentUser } from "@/lib/getCurrentUser";
import getReservations from "@/actions/reservation.action";
import BookingHelper from "./BookingHelper";


const BookingsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized Access"
                subtitle="Please Sign in to continue..."
            />
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No Bookings found!"
                subtitle="Looks like you have not reserved any space yet."
            />
        );
    }

    return (
        <BookingHelper
            reservations={reservations}
            currentUser={currentUser}
        />
    );
}

export default BookingsPage;