'use client'
import { SafeSpace, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../_components/Container";
import Heading from "../_components/modalContent/Heading";
import SpaceCard from "../_components/spaces/SpaceCard";

interface PropertiesHelperProps {
    spaces: SafeSpace[],
    currentUser?: SafeUser | null,
}


const PropertiesHelper: React.FC<PropertiesHelperProps> = ({
    spaces,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/spaces/${id}`)
            .then(() => {
                toast.success('Your Storage Space has been deleted!');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);
    return (
        <Container>
            <Heading
                title="Spaces"
                subtitle="List of spaces you have created."
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {spaces.map((space) => (
                    <SpaceCard
                        key={space.id}
                        data={space}
                        actionId={space.id}
                        onAction={onCancel}
                        disabled={deletingId === space.id}
                        actionLabel="Manage space"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default PropertiesHelper;