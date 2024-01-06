'use client'
import dynamic from "next/dynamic";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import ProfilePicture from "../ProfilePicture";
import SpaceCategory from "./SpaceCategory";


const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface SpaceInfoProps {
    user: SafeUser,
    description: string;
    height: number;
    length: number;
    width: number;
    category: {
        icon: IconType,
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const SpaceInfo: React.FC<SpaceInfoProps> = ({
    user,
    description,
    height,
    length,
    width,
    category,
    locationValue,
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Owned by {user?.name}</div>
                    <ProfilePicture src={user?.imageUrl} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        Height: {height} ft
                    </div>
                    <div>
                        Length: {length} ft
                    </div>
                    <div>
                        Width: {width} ft
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <SpaceCategory
                    icon={category.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default SpaceInfo;