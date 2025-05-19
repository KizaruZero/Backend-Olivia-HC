import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FiturSection() {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const featureCards = [
        {
            title: "Pantau Perkembangan Nifasmu",
            desc: "Pantau fase nifas dengan timeline interaktif, dapatkan reward digital tiap tahap selesai! Progress bar visual menampilkan % penyelesaian fase, checklist tindakan (minum vitamin, kontrol ke bidan, dll.), twibbon/border profile khusus tiap fase terpenuhi, dan confetti effect saat menyelesaikan fase. Memotivasi ibu melalui gamifikasi dan membantu tracking perkembangan harian.",
            icon: "📈",
            gradient: "from-pink-500 to-purple-500",
            buttonText: "Lihat Demo",
            downloadText: "Download Panduan",
        },
        {
            title: "Pengingat Kontrol Kesehatan",
            desc: "Dapatkan notifikasi jadwal kontrol ke puskesmas dan tips harian via WhatsApp/email! Reminder otomatis berdasarkan tanggal mulai nifas, notifikasi untuk kontrol ke fasilitas kesehatan, minum obat/vitamin, cek gejala bahaya (demo perdarahan, demam), dan integrasi booking janji online (jika terhubung ke sistem puskesmas). Mengurangi risiko lupa kontrol dan memandu ibu langkah demi langkah.",
            icon: "⏰",
            gradient: "from-blue-500 to-cyan-500",
            buttonText: "Uji Coba",
            downloadText: "Unduh Jadwal Contoh",
        },
        {
            title: "Edukasi 3-in-1",
            desc: "Akses konten edukasi sesuai fase nifasmu: video singkat, leaflet praktis, dan artikel lengkap! Konten dikurasi oleh tenaga medis dengan video penjelasan dokter/bidan (1-2 menit), leaflet infografis download/print, artikel gejala yang perlu diwaspadai, dan personalized hanya tampilkan konten relevan dengan fase user. Informasi mudah dicerna dalam berbagai format dan menyesuaikan kebutuhan tiap tahap nifas.",
            icon: "📚",
            gradient: "from-amber-500 to-orange-500",
            buttonText: "Coba Fitur",
            downloadText: "Download Materi",
        },
    ];

    const painPoints = [
        "✖️ Bingung mengikuti tahapan nifas",
        "✖️ Lupa jadwal minum obat & kontrol",
        "✖️ Kesulitan memahami info medis",
        "✖️ Tidak tahu gejala berbahaya",
    ];

    return (
        <section
            id="features"
            className="container mx-auto px-6 p-8 min-h-screen"
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
                className="text-center py-16"
            >
                {/* Judul Utama */}

                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                ease: "easeOut",
                            },
                        },
                    }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                    <span className="text-blue-500">Teman Setia</span>{" "}
                    Perjalanan Bunda
                </motion.h2>

                {/* Subjudul */}
                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.2,
                                duration: 0.5,
                            },
                        },
                    }}
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    Dari{" "}
                    <span className="text-blue-400">hari pertama hamil</span>{" "}
                    sampai
                    <span className="text-blue-400">
                        {" "}
                        Bunda pulih sepenuhnya
                    </span>
                </motion.p>
                <motion.div
                    variants={{
                        hidden: { scale: 0 },
                        visible: {
                            scale: 1,
                            transition: {
                                delay: 0.4,
                                duration: 0.5,
                                ease: "easeOut",
                            },
                        },
                    }}
                    className="mt-8"
                >
                    <div className="inline-flex space-x-4">
                        {["👶", "❤️", "🛌"].map((emoji, i) => (
                            <motion.span
                                key={i}
                                animate={{
                                    y: -10,
                                    rotate: 10,
                                }}
                                transition={{
                                    delay: 0.6 + i * 0.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                                className="text-3xl"
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featureCards.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        onHoverStart={() => setIsHovered(index)}
                        onHoverEnd={() => setIsHovered(null)}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="p-6">
                            <motion.div
                                animate={{
                                    scale: isHovered === index ? 1.1 : 1,
                                    rotate:
                                        isHovered === index
                                            ? [0, 10, -10, 0]
                                            : 0,
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl mb-4 text-center"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 transition-all duration-500 ease-in-out">
                                {isHovered === index
                                    ? feature.desc
                                    : feature.desc
                                          .split(" ")
                                          .slice(0, 30)
                                          .join(" ") +
                                      (feature.desc.split(" ").length > 30
                                          ? "..."
                                          : "")}
                            </p>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out 
                    ${
                        isHovered === index
                            ? "max-h-40 mt-8 opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
                            >
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <button className="px-6 py-2 border border-pink-400 text-pink-600 rounded-full">
                                        Lihat Demo
                                    </button>
                                    <button className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full">
                                        Download Buku Panduan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-16 bg-gradient-to-r from-purple-white to-blue-50 rounded-xl p-8 text-center shadow-lg border border-blue-100"
            >
                {/* Quote Icon */}
                <motion.div
                    className="mx-auto mb-4 text-pink-400 opacity-30 w-16 h-16 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{
                        scale: 1,
                        rotate: 10,
                    }}
                    viewport={{ once: true }}
                    transition={{
                        delay: 0.2,
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full"
                    >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </motion.div>

                <motion.h3
                    className="text-xl md:text-2xl font-medium text-gray-800 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    "Dulu, saya tidak tahu apa yang normal selama masa nifas.
                    Pendarahan berlebih atau demam, saya bingung mana yang
                    berbahaya. Sekarang dengan aplikasi ini, saya merasa lebih
                    tenang dan terpandu."
                </motion.h3>

                <motion.p
                    className="text-gray-700 mb-6 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    Dengan 3 fitur utama di atas, Bunda tidak perlu lagi:
                </motion.p>

                <motion.ul
                    className="flex flex-wrap justify-center gap-3 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                >
                    {painPoints.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "#FDF2F8",
                            }}
                            className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 border border-pink-100"
                        >
                            {item}
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.button
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-lg"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 }}
                >
                    Mulai Pantau Masa Nifas Bunda
                </motion.button>
            </motion.div>
        </section>
    );
}
