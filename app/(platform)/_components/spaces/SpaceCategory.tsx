'use client';

import { IconType } from "react-icons";

interface SpaceCategoryProps {
    icon: IconType,
    label: string,
    description: string
}

const SpaceCategory: React.FC<SpaceCategoryProps> = ({
    icon: Icon,
    label,
    description
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <div className="text-zinc-600">
                    <Icon size={40} />
                </div>
                <div className="flex flex-col">
                    <div className="text-lg font-semibold">
                        {label}
                    </div>
                    <div className="text-zinc-500 font-light">
                        {description}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SpaceCategory;