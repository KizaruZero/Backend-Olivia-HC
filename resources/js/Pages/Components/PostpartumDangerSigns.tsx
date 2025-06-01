import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertTriangle,
    Thermometer,
    Droplet,
    Frown,
    Heart,
    Brain,
    Activity,
    AlertCircle,
    CircleAlert,
    Utensils,
    Eye,
    X,
} from "lucide-react";

type Severity = "kritis" | "serius" | "normal";

const PostpartumDangerSigns = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const dangerSigns = [
        {
            id: 1,
            title: "Demam Berkepanjangan",
            description: "Demam lebih dari 2 hari",
            severity: "serius" as Severity,
            icon: <Thermometer className="w-6 h-6" />,
            details:
                "Demam yang berlangsung lebih dari 2 hari dapat menandakan infeksi serius yang memerlukan penanganan segera.",
        },
        {
            id: 2,
            title: "Perdarahan Abnormal",
            description: "Perdarahan lewat jalan lahir",
            severity: "kritis" as Severity,
            icon: <Droplet className="w-6 h-6" />,
            details:
                "Perdarahan yang berlebihan atau tidak normal setelah melahirkan dapat mengancam jiwa dan memerlukan penanganan darurat.",
        },
        {
            id: 3,
            title: "Depresi Pasca Melahirkan",
            description: "Ibu terlihat sedih, murung, dan menangis tanpa sebab",
            severity: "serius" as Severity,
            icon: <Frown className="w-6 h-6" />,
            details:
                "Perubahan mood yang ekstrem dan perasaan sedih yang berkepanjangan memerlukan bantuan profesional.",
        },
        {
            id: 4,
            title: "Gejala Preeklamsia",
            description:
                "Nyeri ulu hati, mual, muntah, sakit kepala, pandangan kabur, kejang dengan atau bengkak pada kaki, tangan dan wajah",
            severity: "kritis" as Severity,
            icon: <Brain className="w-6 h-6" />,
            details:
                "Gejala-gejala ini dapat menandakan preeklamsia yang dapat mengancam jiwa ibu dan bayi.",
        },
        {
            id: 5,
            title: "Mastitis",
            description: "Payudara bengkak, merah, disertai rasa sakit",
            severity: "serius" as Severity,
            icon: <Activity className="w-6 h-6" />,
            details:
                "Infeksi pada payudara yang dapat menyebabkan demam dan rasa sakit yang hebat.",
        },
        {
            id: 6,
            title: "Infeksi Jalan Lahir",
            description: "Keluar cairan berbau dari jalan lahir",
            severity: "serius" as Severity,
            icon: <AlertCircle className="w-6 h-6" />,
            details:
                "Cairan yang berbau tidak normal dapat menandakan infeksi yang memerlukan penanganan medis.",
        },
    ];

    const getSeverityColor = (severity: Severity) => {
        switch (severity) {
            case "kritis":
                return "from-red-600 to-red-800";
            case "serius":
                return "from-red-500 to-red-700";
            default:
                return "from-red-400 to-red-600";
        }
    };

    const getSeverityBorder = (severity: Severity) => {
        switch (severity) {
            case "kritis":
                return "border-red-500";
            case "serius":
                return "border-red-400";
            default:
                return "border-red-300";
        }
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            key="danger-signs"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center"
        >
            <motion.div
                className="inline-flex items-center text-center gap-3 mb-12"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <motion.div
                    className="p-3 bg-gradient-to-r from-red-500 to-red-800 rounded-2xl text-white shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <CircleAlert size={24} />
                </motion.div>
                <div className="k">
                    <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        Tanda Bahaya Pada Ibu Nifas
                    </h1>
                    <p className="text-lg mt-2 text-gray-600">
                        Kenali tanda-tanda bahaya yang memerlukan penanganan
                        segera
                    </p>
                </div>
                <motion.div
                    className="p-3 bg-gradient-to-r from-red-500 to-red-800 rounded-2xl text-white shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <CircleAlert size={24} />
                </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dangerSigns.map((sign, index) => (
                    <motion.div
                        key={sign.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`
              bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden
              border-2 ${getSeverityBorder(sign.severity)}
            `}
                    >
                        {/* Severity Indicator */}
                        <div
                            className={`
              absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs font-bold text-white
              ${sign.severity === "kritis" ? "bg-red-600" : "bg-red-500"}
            `}
                        >
                            {sign.severity.toUpperCase()}
                        </div>

                        <div
                            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto
              bg-gradient-to-r ${getSeverityColor(sign.severity)}
            `}
                        >
                            <div className="text-white">{sign.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                            {sign.title}
                        </h3>
                        <p className="text-gray-600 text-center leading-relaxed mb-4">
                            {sign.description}
                        </p>
                        <p className="text-sm text-gray-500 text-center italic">
                            {sign.details}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Poster Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12"
            >
                <div className="bg-white rounded-xl p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Poster Tanda Bahaya pada Ibu Nifas
                        </h3>
                        <p className="text-gray-600">
                            Download poster untuk panduan visual
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <div
                            className="relative group cursor-pointer"
                            onClick={() =>
                                setSelectedImage("/storage/poster/bahaya.png")
                            }
                        >
                            <img
                                src="/storage/poster/bahaya.png"
                                alt="Poster Tanda Bahaya pada Ibu Nifas"
                                className="w-full mx-auto h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 rounded-full p-2">
                                    <Eye className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <a
                                href="/storage/poster/bahaya.png"
                                download="Poster_Tanda_Bahaya_pada_Ibu_Nifas.png"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                </svg>
                                Download Poster
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl p-8 text-white text-center shadow-2xl"
            >
                <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                    Segera Hubungi Tenaga Kesehatan!
                </h3>
                <p className="text-lg mb-4">
                    Jika Anda mengalami salah satu tanda bahaya di atas, segera
                    hubungi tenaga kesehatan terdekat
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                        <span className="font-semibold">
                            Puskesmas Terdekat
                        </span>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                        <span className="font-semibold">119 (Halo Kemkes)</span>
                    </div>
                </div>
            </motion.div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Enlarged poster"
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PostpartumDangerSigns;
