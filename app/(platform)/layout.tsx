import Navbar from "./_components/Navbar/Navbar";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};
export default DashboardLayout;