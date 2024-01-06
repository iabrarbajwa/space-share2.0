import getFavouriteSpaces from "@/actions/getFavouriteSpaces";
import EmptyState from "../_components/EmptyState";
import { getCurrentUser } from "@/lib/getCurrentUser";
import FavouritesHelper from "./FavouritesHelper";

const Page = async () => {
    const spaces = await getFavouriteSpaces();
    const currentUser = await getCurrentUser();

    if (spaces.length === 0) {
        return (
            <EmptyState
                title="No favourites found"
                subtitle="Your wishList is empty."
            />
        );
    }

    return (
        <FavouritesHelper
            spaces={spaces}
            currentUser={currentUser}
        />
    );
}

export default Page;