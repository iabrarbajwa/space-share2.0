import { getCurrentUser } from "@/lib/getCurrentUser";
import NavbarHelper from "./NavbarHelper";
import { HiOutlineHome, HiOutlineClipboardList, HiOutlineHeart, HiOutlineUser, HiOutlineOfficeBuilding, HiOutlinePlusCircle } from "react-icons/hi";
import { checkRole } from "@/utils/roles";


const NavbarPage = async () => {
    const routes = [
        { path: "/", label: "Home", icon: <HiOutlineHome /> },
        { path: "/bookings", label: "Bookings", icon: <HiOutlineClipboardList /> },
        { path: "/reservations", label: "Renter Reservations", icon: <HiOutlineUser /> },
        { path: "/properties", label: "My Spaces", icon: <HiOutlineOfficeBuilding /> },
        { path: "/favourites", label: "Wishlist", icon: <HiOutlineHeart /> },
        { path: "/create-space", label: "Create a space", icon: <HiOutlinePlusCircle /> },
    ];

    const currentUser = await getCurrentUser();
    const isAdmin = checkRole("admin"); // Fetch or determine if the user is an admin

    return <NavbarHelper currentUser={currentUser} routes={routes} isAdmin={isAdmin} />;
};

export default NavbarPage;





// import { getCurrentUser } from "@/lib/getCurrentUser";
// import NavbarHelper from "./NavbarHelper";

// const NavbarPage = async () => {
//     const routes = [
//         { path: "/", label: "Home" },
//         { path: "/bookings", label: "My Bookings" },
//         { path: "/favourites", label: "My Favourites" },
//         { path: "/reservations", label: "Renter Reservations" },
//         { path: "/properties", label: "Personal Spaces" },
//         { path: "/create-space", label: "Create a space" },
//     ];
//     const currentUser = await getCurrentUser();

//     const isAdmin = true; // Fetch or determine if the user is an admin

//     return <NavbarHelper currentUser={currentUser} routes={routes} isAdmin={isAdmin} />;
// };

// export default NavbarPage;




// // Import React and Next.js dependencies
// 'use client'
// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// // Import Clerk dependencies
// import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
// import { Logo } from "./Logo";

// // Import Headless UI dependencies
// import { Menu, Transition } from "@headlessui/react";
// import { MenuIcon, XIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { HiOutlineSwitchVertical } from "react-icons/hi";
// import { checkRole } from "@/utils/roles";


// // Define the Navbar component
// const Navbar = () => {
//     // Get the Pathname object from useRouter hook
//     const currentPath = usePathname();

//     // Get the user and clerk data from useUser and useClerk hooks
//     const { isSignedIn, user } = useUser();

//     // Define the state for the mobile menu
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     // Define the array of routes for the navbar
//     const routes = [
//         { path: "/", label: "Home" },
//         { path: "/bookings", label: "My Bookings" },
//         { path: "/favourites", label: "My Favourites" },
//         { path: "/reservations", label: "Renter Reservations" },
//         { path: "/properties", label: "Personal Spaces" },
//         { path: "/create-space", label: "Create a space" },
//     ];

//     // Return the JSX element for the component
//     return (
//         <nav className="bg-white shadow-sm">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
//                 <div className="flex justify-between h-16">
//                     <div className="flex">
//                         <div className="flex-shrink-0 flex items-center">
//                             {/* Logo */}
//                             <Logo />
//                         </div>
//                         {user && (
//                             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                                 {/* Desktop menu */}
//                                 {routes.map((route) => (
//                                     <div className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${currentPath === route.path
//                                         ? "border-indigo-500 text-gray-900"
//                                         : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                                         }`}>
//                                         <Link key={route.path} href={route.path}>
//                                             {route.label}
//                                         </Link>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     {!user && (
//                         < div className="hidden sm:ml-6 sm:flex sm:items-center">
//                             {/* User button */}
//                             <div className="flex space-x-4">
//                                 <SignInButton>
//                                     <Button size="sm">
//                                         Sign in
//                                     </Button>
//                                 </SignInButton>
//                                 <SignUpButton>
//                                     <Button size="sm">
//                                         Sign up
//                                     </Button>
//                                 </SignUpButton>
//                             </div>

//                         </div>
//                     )}

//                     {user && (
//                         <div className="hidden sm:ml-6 sm:flex sm:items-center">
//                             <UserButton afterSignOutUrl="/" />
//                         </div>

//                     )}

//                     <div className="-mr-2 flex items-center sm:hidden">
//                         {/* Mobile menu button */}
//                         <button
//                             type="button"
//                             className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//                             aria-expanded="false"
//                             onClick={() => setMobileMenuOpen(true)}
//                         >
//                             <span className="sr-only">Open main menu</span>
//                             <MenuIcon className="block h-6 w-6" aria-hidden="true" />
//                         </button>
//                     </div>
//                 </div>
//             </div >

//             {/* Mobile menu */}
//             <Transition
//                 show={mobileMenuOpen}
//                 enter="duration-150 ease-out"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="duration-100 ease-in"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//             >
//                 {(ref) => (
//                     <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right sm:hidden">
//                         <div
//                             className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
//                             ref={ref}
//                         >
//                             <div className="pt-5 pb-6 px-5">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         {/* Logo */}
//                                         <Logo />
//                                     </div>
//                                     <div className="-mr-2">
//                                         {/* Close button */}
//                                         <button
//                                             type="button"
//                                             className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//                                             onClick={() => setMobileMenuOpen(false)}
//                                         >
//                                             <span className="sr-only">Close menu</span>
//                                             <XIcon className="h-6 w-6" aria-hidden="true" />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6">
//                                     {/* Mobile menu */}
//                                     {user && (
//                                         <nav className="grid gap-y-8">
//                                             {routes.map((route) => (
//                                                 <Link
//                                                     key={route.path}
//                                                     href={route.path}
//                                                     className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
//                                                     onClick={() => setMobileMenuOpen(false)}
//                                                 >
//                                                     <span className="ml-3 text-base font-medium text-gray-900">
//                                                         {route.label}
//                                                     </span>
//                                                 </Link>
//                                             ))}
//                                         </nav>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* User button */}
//                             {user && (
//                                 <div className="py-6 px-5 space-y-6">
//                                     <UserButton afterSignOutUrl="/" />
//                                 </div>
//                             )
//                             }
//                             {!user && (
//                                 <div className="py-6 px-5 space-y-6">
//                                     <div className="flex space-x-4">
//                                         <SignInButton>
//                                             <Button size="sm">
//                                                 Sign in
//                                             </Button>
//                                         </SignInButton>
//                                         <SignUpButton>
//                                             <Button size="sm">
//                                                 Sign up
//                                             </Button>
//                                         </SignUpButton>
//                                     </div>
//                                 </div>
//                             )}

//                         </div>
//                     </div>
//                 )}
//             </Transition>

//         </nav >
//     );
// }

// export default Navbar;



