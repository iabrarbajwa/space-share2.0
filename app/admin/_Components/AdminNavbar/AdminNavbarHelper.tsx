'use client'
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiOutlineHome, HiOutlineUsers, HiOutlineSwitchVertical } from "react-icons/hi";
import { UserButton } from "@clerk/nextjs";

interface AdminNavbarHelperProps {
    isAdmin?: boolean;
}

const AdminNavbarHelper: React.FC<AdminNavbarHelperProps> = ({ isAdmin }) => {
    const currentPath = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            {/* Logo */}
                            <Logo />
                        </div>
                        {isAdmin && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {/* Desktop menu */}
                                <div
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPath === "/"
                                        ? "border-indigo-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    <Link href="/admin/dashboard">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl"><HiOutlineHome /></span>
                                            <span>Home</span>
                                        </div>
                                    </Link>
                                </div>
                                <div
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPath === "/all-users"
                                        ? "border-indigo-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        }`}
                                >
                                    <Link href="/admin/all-users">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xl"><HiOutlineUsers /></span>
                                            <span>All Users</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {/* User button */}
                        <div className="flex space-x-4">
                            <UserButton afterSignOutUrl="/" />
                            {isAdmin && (
                                <Link className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" href={"/"} onClick={() => setMobileMenuOpen(false)}>
                                    <span className="ml-3 flex items-center space-x-2 text-base font-medium text-gray-900">
                                        <span className="text-xl"><HiOutlineSwitchVertical /></span>
                                        <span>User Dashboard</span>
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <Transition
                show={mobileMenuOpen}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="absolute top-0 inset-x-0 p-2 position: sticky z-index: 1 transition transform origin-top-right sm:hidden">
                        <div
                            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
                            ref={ref}
                        >
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        {/* Logo */}
                                        <Logo />
                                    </div>
                                    <div className="-mr-2">
                                        {/* Close button */}
                                        <button
                                            type="button"
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {/* Mobile menu */}
                                    {isAdmin && (
                                        <nav className="grid gap-y-8">
                                            <Link
                                                href="/admin/dashboard"
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="ml-3 flex items-center space-x-2 text-base font-medium text-gray-900">
                                                    <span className="text-xl"><HiOutlineHome /></span>
                                                    <span>Home</span>
                                                </span>
                                            </Link>
                                            <Link
                                                href="/admin/all-users"
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="ml-3 flex items-center space-x-2 text-base font-medium text-gray-900">
                                                    <span className="text-xl"><HiOutlineUsers /></span>
                                                    <span>All Users</span>
                                                </span>
                                            </Link>
                                        </nav>
                                    )}
                                </div>
                            </div>
                            {/* User button */}
                            {isAdmin && (
                                <div className="py-6 px-5 space-y-6">
                                    <div className="flex space-x-4">
                                        <UserButton afterSignOutUrl="/" />
                                        <Link className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50" href={"/"} onClick={() => setMobileMenuOpen(false)}>
                                            <span className="ml-3 flex items-center space-x-2 text-base font-medium text-gray-900">
                                                <span className="text-xl"><HiOutlineSwitchVertical /></span>
                                                <span>User Dashboard</span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
};

export default AdminNavbarHelper;
