'use client'
import Image from "next/image"

interface ProfilePictureProps {
    src: string | null | undefined;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src }) => {
    return (
        <Image
            className="rounded-full"
            height={30}
            width={30}
            alt="Profile Icon"
            src={src || "/images/profile.jpg"}
        />
    )
}

export default ProfilePicture;