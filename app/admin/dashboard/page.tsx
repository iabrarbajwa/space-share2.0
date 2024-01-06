import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";

export default function AdminDashboard() {
    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {
        redirect("/");
    }

    return (
        <div className="bg-gray-100 h-screen">
            <div className="flex flex-col h-full items-center">
                <div className="bg-white shadow-md py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Admin Dashboard</h1>
                    </div>
                </div>
                <div className="flex-grow container mx-auto sm:px-6 lg:px-8 py-12">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold leading-tight text-gray-900">Welcome to the Admin Dashboard!</h2>
                                <p className="mt-4 text-gray-500">This page is restricted to users with the 'admin' role.</p>
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Manage Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}