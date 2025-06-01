import { motion } from "framer-motion";
import { router } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 border-t border-blue-100">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-300 rounded-full opacity-15"></div>
            </div>

            <div className="relative container mx-auto px-4 md:px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <motion.div
                            className="flex items-center cursor-pointer mb-4"
                            onClick={() => router.visit("/")}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 overflow-hidden shadow-md">
                                <img
                                    src="/storage/video_nifas/logo.png"
                                    alt="Rumah Nifas Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                Rumah Nifas
                            </span>
                        </motion.div>
                        <p className="text-gray-600 text-center md:text-left max-w-sm leading-relaxed">
                            Mendampingi perjalanan masa nifas Anda dengan
                            panduan yang tepat dan dukungan penuh untuk
                            kesehatan ibu dan bayi.
                        </p>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Hubungi Kami
                        </h3>
                        <div className="space-y-3">
                            <motion.a
                                href="tel:+622112345678"
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <span className="font-medium">
                                    021-1234-5678
                                </span>
                            </motion.a>

                            <motion.a
                                href="mailto:info@rumahnifas.com"
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blue-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <span className="font-medium">
                                    info@rumahnifas.com
                                </span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Emergency Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-center md:items-end"
                    >
                        <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                            Kontak Darurat
                        </h3>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <p className="text-sm font-medium mb-2 mx-auto text-center">
                                Layanan 24 Jam
                            </p>
                            <motion.a
                                href="tel:+622112345678"
                                className="text-xl font-bold flex items-center hover:underline"
                                whileHover={{ x: 5 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                119 - Layanan Darurat
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-8"></div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                >
                    <div className="flex items-center space-x-6">
                        <p className="text-gray-500 text-sm">
                            © 2024 Rumah Nifas. All rights reserved.
                        </p>
                        <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
                            <motion.a
                                href="#"
                                whileHover={{ color: "#2563eb" }}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Privacy Policy
                            </motion.a>
                            <span>•</span>
                            <motion.a
                                href="#"
                                whileHover={{ color: "#2563eb" }}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Terms of Service
                            </motion.a>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center space-x-4">
                        <p className="text-gray-600 text-sm mr-2">Follow us:</p>
                        {[
                            {
                                name: "Facebook",
                                icon: (
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                ),
                            },
                            {
                                name: "Instagram",
                                icon: (
                                    <>
                                        <rect
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="5"
                                            ry="5"
                                        />
                                        <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line
                                            x1="17.5"
                                            y1="6.5"
                                            x2="17.51"
                                            y2="6.5"
                                        />
                                    </>
                                ),
                            },
                            {
                                name: "Twitter",
                                icon: (
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                ),
                            },
                        ].map((social, index) => (
                            <motion.a
                                key={social.name}
                                href="#"
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 bg-blue-100 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors group"
                                title={social.name}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    {social.icon}
                                </svg>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
