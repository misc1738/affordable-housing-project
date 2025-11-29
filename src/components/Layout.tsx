import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Navbar />
            <main className="flex-grow pt-0">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
