'use client'
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import useCreateSpaceModal from "@/hooks/useCreateSpaceModal";

export default function CreateSpacePage() {
    // Get the user from the useUser hook
    const user = useUser();
    const createSpaceModal = useCreateSpaceModal();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="max-w-lg p-8 bg-white shadow-lg rounded-md">
                <h1 className="text-4xl font-bold underline text-zinc-800 text-center">
                    Create a space
                </h1>
                <p className="text-lg mt-4 text-zinc-600">
                    A space is a place where you can rent your spare storage space to
                    others and make money. You can customize your space with your own
                    name, description, location, price, and more. You can also manage your
                    bookings and reservations easily.
                </p>
                <Image
                    src="/images/createSpace.jpg"
                    alt="Create a space illustration"
                    width={500}
                    height={300}
                    objectFit="contain"
                    className="mt-4"
                />
                <button
                    className="bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
                    onClick={createSpaceModal.onOpen}
                    disabled={!user}
                >
                    Get started
                </button>
                {!user && (
                    <p className="text-sm mt-2 text-gray-500 text-center">
                        You need to sign in or sign up to create a space.
                    </p>
                )}
            </div>
        </div>
    );
}
