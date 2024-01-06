'use client'

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import Heading from "../modalContent/Heading";
import Image from "next/image";
import LikeButton from "./LikeButton";

interface SpaceHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}

const SpaceHead: React.FC<SpaceHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                />
                <div className="absolute top-5 right-5">
                    <LikeButton spaceId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}

export default SpaceHead