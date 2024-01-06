import { create } from "zustand";

interface CreateSpaceModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateSpaceModal = create<CreateSpaceModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useCreateSpaceModal;