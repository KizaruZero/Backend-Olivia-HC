import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, type SetStateAction } from "react";
import Swal from "sweetalert2";

export default function NavbarAuth() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = usePage().props.auth.user;

    const navItems = [
        { name: "Home", id: "/" },
        { name: "Dashboard", id: "dashboard" },
        { name: "Profile", id: "profile" },
        { name: "Logout", id: "logout", method: "post" },
    ];

    const handleNavigation = (item: (typeof navItems)[0]) => {
        if (item.method) {
            Swal.fire({
                title: "Apakah anda yakin ingin logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Logout",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.post(item.id);
                    Swal.fire({
                        title: "Berhasil Logout",
                        icon: "success",
                    });
                }
            });
        } else {
            router.visit(item.id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-4 md:px-12">
            <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex items-center cursor-pointer"
                    onClick={() => router.visit("/")}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                        BS+
                    </div>
                    <span className="text-xl font-semibold text-blue-600 hidden md:block">
                        BundaSehat+
                    </span>
                </motion.div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-12 w-full mr-32">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleNavigation(item)}
                                    className={`px-3 py-2 rounded-md transition-colors ${
                                        activeSection === item.id
                                            ? "text-blue-500 font-medium"
                                            : "text-gray-600 hover:text-black"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                    }`}
                >
                    <nav className="px-4 py-2">
                        <ul className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavigation(item)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                            activeSection === item.id
                                                ? "text-blue-500 font-medium"
                                                : "text-gray-600 hover:text-black"
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="hidden md:block">
                    {user ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                            onClick={() => router.visit("/dashboard")}
                        >
                            Dashboard
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                            onClick={() => router.get("/login")}
                        >
                            Login
                        </motion.button>
                    )}
                </div>
            </div>
        </header>
    );
}
