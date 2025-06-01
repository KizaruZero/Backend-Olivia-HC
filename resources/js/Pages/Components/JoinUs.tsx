import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function JoinUs() {
    return (
        <motion.section
            id="join"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white  "
        >
            <div className="container mx-auto px-6 text-center ">
                <motion.section className="relative overflow-hidden py-20 bg-blue-600 text-white ">
                    {/* Background elements */}
                    <motion.div
                        className="absolute -top-20 -right-20 w-64 h-64 bg-pink-400 rounded-full opacity-20"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 8 }}
                    />

                    <div className="relative max-w-4xl mx-auto px-4 text-center">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Mulai Perjalanan Nifas{" "}
                            <span className="text-pink-200">
                                Tanpa Khawatir
                            </span>
                        </motion.h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {[
                                "📝 Catatan Harian",
                                "📅 Kalender Medis",
                                "🛡️ Peringatan Dini",
                                "👩‍⚕️ Materi Edukasi",
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <p className="text-sm">{item}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 rounded-full text-lg font-medium mx-auto shadow-xl sm:w-auto transition-colors duration-300"
                            onClick={() => router.visit(route("register"))}
                        >
                            Gabung Sekarang - Gratis!
                        </motion.button>

                        <motion.p
                            className="mt-6 text-blue-100 text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            🎉 Jadi Bagian dari Komunitas Kami
                        </motion.p>
                    </div>
                </motion.section>
            </div>
        </motion.section>
    );
}
