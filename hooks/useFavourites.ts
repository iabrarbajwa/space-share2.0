import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { SafeUser } from "@/types"

interface IUseFavourites {
    spaceId: string;
    currentUser?: SafeUser | null;
}

const useFavourites = ({
    spaceId,
    currentUser
}: IUseFavourites) => {
    const router = useRouter();


    const hasFavourited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(spaceId);
    }, [currentUser, spaceId]);

    const toggleFavourites = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation;
        if (!currentUser) {
            router.push("/sign-in")
            return;
        }

        try {
            let request;

            if (hasFavourited) {
                request = () => axios.delete(`/api/favourites/${spaceId}`);
            } else {
                request = () => axios.post(`/api/favourites/${spaceId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }, [currentUser, hasFavourited, spaceId, router]);

    return { hasFavourited, toggleFavourites };
}

export default useFavourites;