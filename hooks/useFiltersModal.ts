import { create } from "zustand";

interface FiltersModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useFiltersModal = create<FiltersModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useFiltersModal;