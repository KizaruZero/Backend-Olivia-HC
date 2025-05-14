import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import Footer from "../Pages/Components/Footer";
import NavbarAuth from "../Pages/Components/NavbarAuth";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <NavbarAuth />
            <div className="flex-grow">
                <div className="mx-auto">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
