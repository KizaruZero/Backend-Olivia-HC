import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import Footer from "../Pages/Components/Footer";
import Navbar from "../Pages/Components/Navbar";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
            <Navbar />
            <div className="flex-grow">
                <div className="mx-auto">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
