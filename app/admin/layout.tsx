import ClientComponents from "../(platform)/_components/ClientComponents";
import ToasterProvider from "../providers/ToastProvider";
import AdminNavbar from "./_Components/AdminNavbar/AdminNavbar";


const AdminDashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <ClientComponents>
                <ToasterProvider />
                <AdminNavbar />
            </ClientComponents>
            <div className='pb-20 pt-10'>
                {children}
            </div>
        </>
    );
};
export default AdminDashboardLayout;