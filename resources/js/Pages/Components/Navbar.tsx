import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, type SetStateAction } from "react";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const user = usePage().props.auth.user;

    const navItems = [
        { name: "Beranda", id: "hero" },
        { name: "Masalah", id: "problem" },
        { name: "Fase Nifas", id: "fase-nifas" },
        { name: "Fitur", id: "features" },
        { name: "Bergabung", id: "join" },
    ];

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm px-12">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center ">
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
                <nav className="hidden md:block">
                    <ul className="flex space-x-12 w-full mr-32">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleScroll(item.id)}
                                    className={`px-3 py-2  rounded-md transition-colors ${
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
                <div>
                    {user ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors"
                            onClick={() => router.visit("/maternal")}
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
