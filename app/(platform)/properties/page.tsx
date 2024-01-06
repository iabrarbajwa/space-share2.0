import EmptyState from "../_components/EmptyState";
import { getCurrentUser } from "@/lib/getCurrentUser";
import PropertiesHelper from "./PropertiesHelper";
import getSpaces from "@/actions/space.action";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized Access"
                subtitle="Please Sign in to continue..."
            />
        );
    }

    const spaces = await getSpaces({ userId: currentUser.id });

    if (spaces.length === 0) {
        return (
            <EmptyState
                title="No Spaces found!"
                subtitle="Looks like you have not created any space yet."
            />
        );
    }

    return (
        <PropertiesHelper
            spaces={spaces}
            currentUser={currentUser}
        />
    );
}

export default PropertiesPage;