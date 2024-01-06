import { SafeSpace, SafeUser } from "@/types";
import Container from "../_components/Container";
import Heading from "../_components/modalContent/Heading";
import SpaceCard from "../_components/spaces/SpaceCard";

interface FavouritesHelperProps {
    spaces: SafeSpace[],
    currentUser?: SafeUser | null,
}

const FavouritesHelper: React.FC<FavouritesHelperProps> = ({
    spaces,
    currentUser
}) => {
    return (
        <Container>
            <Heading title="Favourites" subtitle="List of spaces you favourited!" />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {spaces.map((space: any) => (
                    <SpaceCard
                        currentUser={currentUser}
                        key={space.id}
                        data={space}
                    />
                ))}
            </div>
        </Container>
    );
}

export default FavouritesHelper;