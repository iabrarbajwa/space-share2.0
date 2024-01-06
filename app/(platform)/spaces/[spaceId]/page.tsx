import { getSpaceById } from "@/actions/getSpaceById";
import { getCurrentUser } from "@/lib/getCurrentUser";
import EmptyState from "../../_components/EmptyState";
import getReservations from "@/actions/reservation.action";
import SpaceHelper from "./SpaceHelper";

interface IParams {
    spaceId?: string;
}

const SpacePage = async ({ params }: { params: IParams }) => {
    const space = await getSpaceById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!space) {
        return (
            <EmptyState />
        )
    }
    return (
        <SpaceHelper
            space={space}
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default SpacePage;