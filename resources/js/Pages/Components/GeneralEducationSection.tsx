import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Users,
    Calendar,
    Info,
    Eye,
    X,
    Baby,
    Shield,
    Pill,
} from "lucide-react";

const GeneralEducationSection = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const educationCards = [
        {
            id: "konseling",
            title: "Konseling Kesehatan Ibu Nifas",
            icon: <Users className="w-8 h-8" />,
            description:
                "Informasi tentang pelayanan kesehatan dan kunjungan ibu nifas ke fasilitas kesehatan",
            poster: "/storage/poster/layanan.jpg",
            items: [
                {
                    icon: <Calendar className="w-6 h-6" />,
                    title: "Jadwal Kunjungan",
                    content:
                        "Kunjungan ibu nifas ke fasilitas kesehatan dilakukan pada hari ke-1, ke-3, dan ke-7 setelah melahirkan",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Layanan yang Diberikan",
                    content:
                        "Pemeriksaan kesehatan ibu dan bayi, konseling menyusui, dan edukasi perawatan bayi",
                },
                {
                    icon: <Info className="w-6 h-6" />,
                    title: "Pentingnya Konseling",
                    content:
                        "Membantu ibu nifas memahami kondisi kesehatannya dan cara merawat bayi dengan benar",
                },
            ],
        },
        {
            id: "imunisasi",
            title: "Fase Imunisasi",
            icon: <Shield className="w-8 h-8" />,
            description:
                "Panduan lengkap tentang jadwal dan jenis imunisasi yang diperlukan bayi",
            poster: "/storage/poster/imunisasi.jpg",
            items: [
                {
                    icon: <Baby className="w-6 h-6" />,
                    title: "Imunisasi Dasar",
                    content:
                        "BCG, Polio, DPT, Hepatitis B, dan Campak diberikan sesuai jadwal yang ditentukan",
                },
                {
                    icon: <Calendar className="w-6 h-6" />,
                    title: "Jadwal Imunisasi",
                    content:
                        "Imunisasi dimulai sejak lahir dan dilanjutkan sesuai jadwal yang ditentukan oleh tenaga kesehatan",
                },
                {
                    icon: <Info className="w-6 h-6" />,
                    title: "Manfaat Imunisasi",
                    content:
                        "Melindungi bayi dari berbagai penyakit berbahaya dan meningkatkan sistem kekebalan tubuh",
                },
            ],
        },
        {
            id: "kb",
            title: "Keluarga Berencana",
            icon: <Heart className="w-8 h-8" />,
            description:
                "Informasi tentang pengertian dan manfaat program Keluarga Berencana",
            poster: "/storage/poster/kontrasepsi.jpg",
            items: [
                {
                    icon: <Info className="w-6 h-6" />,
                    title: "Pengertian KB",
                    content:
                        "Program yang membantu pasangan suami istri untuk merencanakan jumlah dan jarak kelahiran anak",
                },
                {
                    icon: <Pill className="w-6 h-6" />,
                    title: "Metode KB",
                    content:
                        "Berbagai metode kontrasepsi tersedia seperti pil KB, IUD, implan, dan kondom",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Manfaat KB",
                    content:
                        "Meningkatkan kesehatan ibu dan anak, mengatur jarak kelahiran, dan meningkatkan kesejahteraan keluarga",
                },
            ],
        },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
            <div className="container mx-auto px-6 py-8 ">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                            Edukasi Umum
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Informasi penting tentang kesehatan ibu nifas,
                        imunisasi, dan keluarga berencana
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {educationCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full">
                                        <div className="text-blue-600">
                                            {card.icon}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {card.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    {card.description}
                                </p>
                            </div>

                            {/* Poster Section */}
                            <div className="p-6 bg-gray-50">
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Poster {card.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        Download poster untuk panduan visual
                                    </p>
                                </div>
                                <div className="max-w-2xl mx-auto">
                                    <div
                                        className="relative group cursor-pointer"
                                        onClick={() =>
                                            setSelectedImage(card.poster)
                                        }
                                    >
                                        <img
                                            src={card.poster}
                                            alt={`Poster ${card.title}`}
                                            className="w-full mx-auto h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl"></div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 rounded-full p-2">
                                                <Eye className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <a
                                            href={card.poster}
                                            download={`Poster_${card.title.replace(
                                                /\s+/g,
                                                "_"
                                            )}.jpg`}
                                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                    ))}
                </div>

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
            </div>
        </div>
    );
};

export default GeneralEducationSection;
