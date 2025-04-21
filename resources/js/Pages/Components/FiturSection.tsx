import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FiturSection() {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const featureCards = [
        {
            title: "Bunda Diary",
            desc: "Setiap detik berharga dalam perjalanan Bunda! Catat semua yang Bunda rasakan - dari tendangan pertama si kecil sampai konsultasi dengan bidan - dalam satu tempat. Nanti, Bunda bisa tunjukkan ke dokter dengan sekali klik. Jadi nggak ada lagi lupa jadwal kontrol atau lupa cerita gejala penting!",
            icon: "📖",
        },
        {
            title: "Bunda Cerdas",
            desc: "Pernah bingung baca catatan kesehatan Bunda sendiri? Sekarang ada asisten pribadi yang merangkum semua catatan Bunda tiap minggu. Dia akan kasih tahu pola penting, misalnya: 'Wah, tekanan darah Bunda mulai naik nih, lebih banyak istirahat ya!' Jadi Bunda lebih tenang dan siap untuk konsultasi berikutnya.",
            icon: "🧠",
        },
        {
            title: "Nifas Aman",
            desc: "Masa nifas itu penting tapi sering diabaikan. Dengan 'Nifas Aman', Bunda tinggal centang gejala harian - misalnya demam atau perdarahan. Kalau ada tanda bahaya, langsung bisa hubungi bidan via WA dengan laporan otomatis. Jadi Bunda nggak sendirian lagi di 40 hari kritis ini!",
            icon: " 🩺 ",
        },
    ];

    return (
        <section
            id="features"
            className="container mx-auto px-6 py-20 min-h-screen"
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
                className="text-center py-12"
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
                                ease: "backOut",
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
                                type: "spring",
                                stiffness: 100,
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
                                    y: [0, -10, 0],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    delay: 0.6 + i * 0.3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 3,
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-16 bg-blue-50 rounded-xl p-8 text-center"
            >
                <h3 className="text-xl font-medium text-gray-800 mb-4">
                    "Dulu, saya sering lupa kapan terakhir merasakan gerakan
                    janin atau apakah demam saya berbahaya. Sekarang..."
                </h3>

                <p className="text-gray-600 mb-6">
                    Dengan 3 fitur utama di atas, Bunda tidak perlu lagi:
                </p>

                <ul className="flex flex-wrap justify-center gap-3 mb-6">
                    {[
                        "✖️ Menebak-nebak gejala",
                        "✖️ Khawatir lupa jadwal kontrol",
                        "✖️ Bingung baca catatan medis",
                    ].map((item, i) => (
                        <motion.li
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white px-4 py-2 rounded-full shadow-sm text-black"
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>

                <p className="text-pink-600 font-medium">
                    Yang Bunda dapatkan adalah kehamilan lebih terkontrol dan
                    masa pemulihan yang aman.
                </p>
            </motion.div>
        </section>
    );
}
