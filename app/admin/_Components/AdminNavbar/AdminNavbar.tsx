import { getCurrentUser } from "@/lib/getCurrentUser";
import AdminNavbarHelper from "./AdminNavbarHelper";
import { checkRole } from "@/utils/roles";


const AdminNavbar = async () => {
    const currentUser = await getCurrentUser();
    const isAdmin = checkRole("admin"); // Fetch or determine if the user is an admin

    return <AdminNavbarHelper isAdmin={isAdmin} />;
};

export default AdminNavbar;