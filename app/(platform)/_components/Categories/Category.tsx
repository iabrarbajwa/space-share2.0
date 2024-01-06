'use client'
import { BiSolidCarGarage, BiHome } from "react-icons/bi";
import { FaTrailer, FaWarehouse } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BsBoxes } from "react-icons/bs";
import { LuSofa } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "./CategoryBox";

export const categories = [
    {
        label: 'Garage',
        icon: BiSolidCarGarage,
        description: "This is a garage!"
    },
    {
        label: 'Self',
        icon: BsBoxes,
        description: "This is self storage!"
    },
    {
        label: 'Basement',
        icon: BiHome,
        description: "This is a basement storage!"
    },
    {
        label: 'Sofa',
        icon: LuSofa,
        description: "This is a sofa storage!"
    },
    {
        label: 'Trailer',
        icon: FaTrailer,
        description: "This is a trailer storage!"
    },
    {
        label: 'Truck',
        icon: FiTruck,
        description: "This is a truck storage!"
    },
    {
        label: 'Warehouse',
        icon: FaWarehouse,
        description: "This is a warehouse storage!",
    },
    {
        label: 'Office',
        icon: HiOutlineOfficeBuilding,
        description: "This is an office storage!",
    }
]



const Category = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isHomePage = pathName === '/';

    if (!isHomePage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((categoryItem) => (
                    <CategoryBox key={categoryItem.label} label={categoryItem.label} selected={category === categoryItem.label} icon={categoryItem.icon} />
                ))}
            </div>
        </Container>
    )
}

export default Category;