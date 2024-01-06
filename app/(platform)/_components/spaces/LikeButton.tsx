'use client'
import useFavourites from "@/hooks/useFavourites"
import { SafeUser } from "@/types"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

interface LikeButtonProps {
    spaceId: string
    currentUser?: SafeUser | null
}

const LikeButton: React.FC<LikeButtonProps> = ({
    spaceId,
    currentUser
}) => {
    const { hasFavourited, toggleFavourites } = useFavourites({ spaceId, currentUser })
    return (
        <div
            onClick={toggleFavourites}
            className="
            relative
            hover:opacity-80
            transition
            cursor-pointer
          "
        >
            <AiOutlineHeart
                size={28}
                className="
              fill-white
              absolute
              -top-[2px]
              -right-[2px]
            "
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavourited ? 'fill-red-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    );
}

export default LikeButton;
