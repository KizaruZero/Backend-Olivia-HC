import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    X,
    Utensils,
    Droplets,
    Apple,
    Fish,
    Wheat,
    LeafyGreen,
    Candy,
} from "lucide-react";

const nutritionData = [
    {
        id: 1,
        title: "Makanan Pokok",
        icon: Wheat,
        portion: "600 gr/hari",
        description: "Nasi, jagung, kentang, singkong, roti",
        details:
            "Karbohidrat sebagai sumber energi utama untuk mendukung proses menyusui dan pemulihan pasca melahirkan. Variasikan sumber karbohidrat untuk nutrisi yang lebih beragam.",
        examples: [
            "Nasi putih/merah",
            "Kentang rebus",
            "Singkong kukus",
            "Jagung manis",
            "Roti gandum",
        ],
        color: "from-amber-400 to-orange-500",
        bgGradient: "from-amber-50 to-orange-50",
    },
    {
        id: 2,
        title: "Protein Hewani",
        icon: Fish,
        portion: "4 porsi/hari",
        description: "200 gr/hari aneka protein",
        details:
            "Protein berkualitas tinggi untuk membantu pemulihan jaringan dan produksi ASI. Pilih sumber protein yang beragam untuk mendapatkan asam amino lengkap.",
        examples: [
            "Ikan salmon/tuna",
            "Telur ayam",
            "Daging ayam",
            "Daging sapi",
            "Tahu tempe",
        ],
        color: "from-red-400 to-pink-500",
        bgGradient: "from-red-50 to-pink-50",
    },
    {
        id: 3,
        title: "Sayur-sayuran",
        icon: LeafyGreen,
        portion: "4 porsi/hari",
        description: "400 gr/hari aneka sayuran",
        details:
            "Sumber vitamin, mineral, dan serat yang penting untuk kesehatan pencernaan dan meningkatkan kualitas ASI. Konsumsi sayuran berwarna-warni untuk nutrisi optimal.",
        examples: ["Bayam", "Kangkung", "Brokoli", "Wortel", "Tomat"],
        color: "from-green-400 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50",
    },
    {
        id: 4,
        title: "Buah-buahan",
        icon: Apple,
        portion: "4 porsi/hari",
        description: "400 gr/hari aneka buah",
        details:
            "Sumber vitamin C, antioksidan, dan serat alami. Buah segar membantu meningkatkan sistem imun dan memberikan energi alami untuk ibu menyusui.",
        examples: ["Jeruk", "Pisang", "Apel", "Pepaya", "Alpukat"],
        color: "from-purple-400 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
    },
    {
        id: 5,
        title: "Minyak/Lemak",
        icon: Droplets,
        portion: "6 sendok teh/hari",
        description: "10 gr/hari dari bahan makanan olahan",
        details:
            "Lemak sehat diperlukan untuk penyerapan vitamin larut lemak dan produksi hormon. Pilih sumber lemak yang baik seperti minyak zaitun atau alpukat.",
        examples: [
            "Minyak zaitun",
            "Minyak kelapa",
            "Alpukat",
            "Kacang-kacangan",
            "Biji-bijian",
        ],
        color: "from-yellow-400 to-amber-500",
        bgGradient: "from-yellow-50 to-amber-50",
    },
    {
        id: 6,
        title: "Gula",
        icon: Candy,
        portion: "2 sendok teh/hari",
        description: "20 gr/hari dari bahan makanan",
        details:
            "Konsumsi gula sebaiknya dibatasi dan lebih baik dari sumber alami. Gula memberikan energi cepat namun harus dikonsumsi dalam jumlah terbatas.",
        examples: [
            "Madu alami",
            "Gula aren",
            "Buah-buahan manis",
            "Kurma",
            "Gula tebu",
        ],
        color: "from-pink-400 to-rose-500",
        bgGradient: "from-pink-50 to-rose-50",
    },
    {
        id: 7,
        title: "Air Putih",
        icon: Droplets,
        portion: "14 gelas/hari",
        description: "6 bulan pertama, 12 gelas untuk 6 bulan berikutnya",
        details:
            "Hidrasi yang cukup sangat penting untuk produksi ASI dan mencegah dehidrasi. Jumlah air per gelas disesuaikan dengan kondisi tubuh ibu.",
        examples: [
            "Air putih hangat",
            "Air mineral",
            "Air kelapa muda",
            "Infused water",
            "Teh herbal",
        ],
        color: "from-blue-400 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
    },
];

type NutritionItem = (typeof nutritionData)[0];

export default function PolaMakanNifas() {
    const [selectedCard, setSelectedCard] = useState<NutritionItem | null>(
        null
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotateX: -15,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            rotateX: 15,
            transition: {
                duration: 0.2,
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.div
                            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white shadow-lg"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Utensils size={24} />
                        </motion.div>
                        <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Pola Makan Ibu Nifas
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Panduan lengkap porsi makan harian untuk ibu pasca
                        melahirkan yang menyusui. Klik setiap kartu untuk
                        informasi detail dan contoh makanan yang
                        direkomendasikan.
                    </motion.p>

                    <motion.div
                        className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <span className="text-blue-700 font-semibold">
                            6 Porsi Setiap Hari
                        </span>
                    </motion.div>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 "
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {nutritionData.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                className={`relative bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 cursor-pointer shadow-lg border border-white/50 backdrop-blur-sm overflow-hidden group`}
                                variants={cardVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => setSelectedCard(item)}
                            >
                                {/* Decorative background element */}
                                <motion.div
                                    className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full"
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                    transition={{ duration: 0.6 }}
                                />

                                {/* Icon */}
                                <motion.div
                                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} text-white mb-4 shadow-lg`}
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <IconComponent size={28} />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                                    {item.title}
                                </h3>

                                <motion.div
                                    className="text-2xl font-bold text-blue-600 mb-2"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {item.portion}
                                </motion.div>

                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Click indicator */}
                                <motion.div
                                    className="flex items-center text-blue-500 text-sm font-medium"
                                    whileHover={{ x: 5 }}
                                >
                                    <span>Lihat detail</span>
                                    <ChevronRight size={16} className="ml-1" />
                                </motion.div>

                                {/* Hover effect overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedCard && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => setSelectedCard(null)}
                        >
                            <motion.div
                                className={`bg-gradient-to-br ${selectedCard.bgGradient} rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50`}
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className={`p-4 rounded-2xl bg-gradient-to-r ${selectedCard.color} text-white shadow-lg`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            <selectedCard.icon size={32} />
                                        </motion.div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-gray-800 mb-1">
                                                {selectedCard.title}
                                            </h2>
                                            <div className="text-2xl font-bold text-blue-600">
                                                {selectedCard.portion}
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                                        onClick={() => setSelectedCard(null)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <X
                                            size={24}
                                            className="text-gray-600"
                                        />
                                    </motion.button>
                                </div>

                                {/* Description */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {selectedCard.details}
                                    </p>
                                </motion.div>

                                {/* Examples */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        Contoh Makanan:
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedCard.examples.map(
                                            (example, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50"
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.4 + index * 0.1,
                                                    }}
                                                    whileHover={{
                                                        scale: 1.02,
                                                        backgroundColor:
                                                            "rgba(255,255,255,0.8)",
                                                    }}
                                                >
                                                    <span className="text-gray-700 font-medium">
                                                        {example}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </motion.div>

                                {/* Tips section for specific items */}
                                {selectedCard.id === 7 && (
                                    <motion.div
                                        className="mt-6 p-4 bg-blue-100/50 rounded-xl border border-blue-200/50"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h4 className="font-bold text-blue-800 mb-2">
                                            💡 Tips Hidrasi:
                                        </h4>
                                        <p className="text-blue-700 text-sm">
                                            Minum air sebelum merasa haus.
                                            Letakkan botol air di dekat tempat
                                            menyusui dan minum setiap kali
                                            selesai menyusui untuk menjaga
                                            hidrasi optimal.
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
