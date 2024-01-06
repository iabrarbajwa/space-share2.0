import ToasterProvider from "../providers/ToastProvider";
import ClientComponents from "./_components/ClientComponents";
import Navbar from "./_components/Navbar/Navbar";
import CreateSpaceModal from "./_components/modals/CreateSpaceModal";
import FiltersModal from "./_components/modals/FiltersModal";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <ClientComponents>
                <ToasterProvider />
                <Navbar />
                <FiltersModal />
                <CreateSpaceModal />
            </ClientComponents>
            <div className='pb-20 pt-10'>
                {children}
            </div>
        </>
    );
};
export default DashboardLayout;