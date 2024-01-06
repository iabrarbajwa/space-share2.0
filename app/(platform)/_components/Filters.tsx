'use client'
import useFiltersModal from "@/hooks/useFiltersModal";

import { IoFilter } from "react-icons/io5";

const Filters = () => {
    const filtersModal = useFiltersModal();

    return (
        <div className="flex flex-row items-center justify-between">
            <div onClick={filtersModal.onOpen} className="ml-4 text-sm text-gray-500 cursor-pointer">
                <IoFilter />
                Advanced Filters
            </div>
        </div>
    );
};

export default Filters;