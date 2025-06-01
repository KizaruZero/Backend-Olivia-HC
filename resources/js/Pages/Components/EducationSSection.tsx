import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Baby,
    Clock,
    Heart,
    Droplets,
    Target,
    User,
    Eye,
    Smile,
    Info,
    Shield,
    ArrowRight,
    CheckCircle,
    Pill,
    AlertTriangle,
    Utensils,
    Shirt,
    Sparkles,
    Quote,
    X,
} from "lucide-react";

const EducationSSection = () => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const mainCards = [
        {
            id: "cara-menyusui",
            title: "Cara Menyusui yang Benar",
            icon: <Baby className="w-8 h-8" />,
            description:
                "Panduan lengkap teknik menyusui yang tepat untuk ibu dan bayi",
            items: [
                {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Frekuensi Menyusui",
                    content:
                        "Menyusui sesering mungkin/semau bayi (8-12 x sehari atau lebih)",
                },
                {
                    icon: <Baby className="w-6 h-6" />,
                    title: "Membangunkan Bayi",
                    content:
                        "Bila bayi tidur lebih dari 3 jam, bangunkan, lalu susui",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Durasi Menyusui",
                    content:
                        "Susui sampai payudara terasa kosong, lalu pindah ke payudara sisi yang lain",
                },
                {
                    icon: <Droplets className="w-6 h-6" />,
                    title: "Mencegah Mastitis",
                    content:
                        "Apabila bayi sudah kenyang tetapi payudara masih penuh/kencang, payudara perlu diperah dan ASI disimpan untuk mencegah mastitis",
                },
            ],
        },
        {
            id: "posisi-perlekatan",
            title: "Posisi dan Perlekatan Menyusui",
            icon: <Target className="w-8 h-8" />,
            description:
                "Teknik posisi dan perlekatan yang benar untuk kenyamanan optimal",
            items: [
                {
                    icon: <User className="w-6 h-6" />,
                    title: "Posisi Kepala dan Badan",
                    content: "Kepala dan badan bayi membentuk garis lurus",
                },
                {
                    icon: <Eye className="w-6 h-6" />,
                    title: "Arah Wajah Bayi",
                    content:
                        "Wajah bayi menghadap payudara, hidung berhadapan dengan puting susu",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Kedekatan Badan",
                    content:
                        "Badan bayi dekat ke tubuh ibu, ibu menggendong/mendekap badan bayi secara utuh",
                },
                {
                    icon: <Smile className="w-6 h-6" />,
                    title: "Perlekatan Mulut",
                    content:
                        "Bayi dekat dengan payudara dengan mulut terbuka lebar, dagu menyentuh payudara, areola atas lebih terlihat, bibir bawah memutar keluar",
                },
            ],
        },
        {
            id: "cara-menyimpan-asi",
            title: "Cara Menyimpan ASI",
            icon: <Droplets className="w-8 h-8" />,
            description:
                "Panduan lengkap menyimpan ASI dengan aman berdasarkan suhu dan durasi",
            items: [
                {
                    icon: <Clock className="w-6 h-6" />,
                    title: "ASI dalam Cooler Bag (15°C)",
                    content:
                        "ASI dapat disimpan dalam cooler bag pada suhu 15°C selama 4-6 jam",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "ASI dalam Ruangan (27°C-32°C)",
                    content:
                        "Pada suhu ruangan 27°C-32°C: 4 jam. Pada suhu <25°C: 6-8 jam",
                },
                {
                    icon: <Target className="w-6 h-6" />,
                    title: "ASI dalam Kulkas (<4°C)",
                    content:
                        "Dapat disimpan dalam kulkas biasa selama 48-72 jam",
                },
                {
                    icon: <Droplets className="w-6 h-6" />,
                    title: "ASI dalam Freezer",
                    content:
                        "Lemari es 1 pintu (-15°C s/d 0°C): 2 minggu. Lemari es 2 pintu (-20°C s/d -18°C): 3-6 bulan. CATATAN: Sebelum diberikan, rendam dalam air hangat menggunakan wadah kaca/keramik, jangan gunakan plastik",
                },
            ],
        },
        {
            id: "komposisi-asi",
            title: "Komposisi ASI",
            icon: <Droplets className="w-8 h-8" />,
            description:
                "Pemahaman tentang tahapan dan komposisi ASI dari waktu ke waktu",
            poster: "/storage/poster/komposisiasi.jpg",
            items: [
                {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Kolostrum (Hari ke-1/3)",
                    content:
                        "Cairan pertama, berwarna kekuningan, mengandung antibodi, kadar protein tinggi, akan menggumpal jika dipanaskan.",
                },
                {
                    icon: <ArrowRight className="w-6 h-6" />,
                    title: "Susu Peralihan (Hari ke-4/10)",
                    content:
                        "Kadar protein rendah, karbohidrat dan lemak meningkat.",
                },
                {
                    icon: <CheckCircle className="w-6 h-6" />,
                    title: "Susu Matur (Hari ke-10 dst)",
                    content:
                        "Berwarna putih kekuningan, jika dipanaskan tidak menggumpal.",
                },
            ],
        },
        {
            id: "asi-eksklusif",
            title: "ASI Eksklusif",
            icon: <Heart className="w-8 h-8" />,
            description:
                "Pentingnya ASI eksklusif dan manfaatnya bagi bayi dalam masa pertumbuhan",
            poster: "/storage/poster/manfaatasi.jpg",
            items: [
                {
                    icon: <Info className="w-6 h-6" />,
                    title: "Pengertian",
                    content:
                        "ASI eksklusif adalah bayi yang hanya diberi ASI saja tanpa tambahan cairan/makanan sampai usia 6 bulan.",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Manfaat ASI",
                    content:
                        "ASI sebagai nutrisi, ASI sebagai daya tahan tubuh, ASI meningkatkan kecerdasan, ASI meningkatkan jalinan kasih sayang.",
                },
                {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Zat Kekebalan Dalam",
                    content:
                        "a. Faktor bifidus, mencegah pertumbuhan bakteri merugikan\nb. Laktoferin, mengikat zat besi dalam ASI\nc. Anti alergi\nd. Zat anti virus polio",
                },
            ],
        },
        {
            id: "breast-care",
            title: "Breast Care",
            icon: <Heart className="w-8 h-8" />,
            description:
                "Panduan lengkap perawatan payudara untuk ibu menyusui",
            poster: "/storage/poster/breastcare.jpg",
            items: [
                {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Persiapan Awal",
                    content:
                        "Cuci tangan dengan sabun dan air mengalir, lalu keringkan",
                },
                {
                    icon: <Droplets className="w-6 h-6" />,
                    title: "Perawatan Puting",
                    content:
                        "Kompres kedua puting sampai areola dengan kapas yang dibasahi baby oil, diamkan 3 menit, lalu bersihkan",
                },
                {
                    icon: <Heart className="w-6 h-6" />,
                    title: "Pemijatan",
                    content:
                        "Licinkan kedua tangan dengan baby oil/minyak kelapa/zaitun, sokong payudara dan lakukan gerakan memijat dari pangkal ke puting",
                },
                {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Kompres Bergantian",
                    content:
                        "Kompres payudara dengan air hangat dan dingin bergantian selama 5 menit",
                },
                {
                    icon: <Shirt className="w-6 h-6" />,
                    title: "Pakaian Dalam",
                    content:
                        "Gunakan BH yang menopang payudara, tanpa kawat, lakukan breast care tiap mau mandi",
                },
            ],
        },
        {
            id: "tablet-tambah-darah",
            title: "Tablet Tambah Darah",
            icon: <Pill className="w-8 h-8" />,
            description:
                "Informasi penting tentang konsumsi tablet tambah darah untuk ibu nifas",
            poster: "/storage/poster/tablet.jpg",
            items: [
                {
                    icon: <Info className="w-6 h-6" />,
                    title: "Pengertian",
                    content:
                        "Zat besi adalah suplemen tambah darah untuk mencegah anemia",
                },
                {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Dosis dan Durasi",
                    content:
                        "Dosis perhari untuk ibu nifas yaitu 1x/hari selama 40 hari",
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "Cara Konsumsi",
                    content:
                        "Diminum saat malam hari menjelang tidur, tidak boleh diminum bersama kopi, teh, susu",
                },
                {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    title: "Efek Samping",
                    content:
                        "Efek samping tablet ini yaitu rasa mual, dan susah BAB",
                },
                {
                    icon: <Utensils className="w-6 h-6" />,
                    title: "Makanan Kaya Zat Besi",
                    content:
                        "Bahan makanan yang mengandung zat besi, seperti: bayam, kangkung, daun singkong, dan pete",
                },
            ],
        },
    ];

    const toggleCard = (cardId: string) => {
        setExpandedCard(expandedCard === cardId ? null : cardId);
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6  px-4">
            <div className=" mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                            <Baby className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                            Tips Menyusui
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Panduan lengkap untuk ibu nifas dalam memberikan ASI
                        dengan teknik yang benar dan aman
                    </p>
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

                {/* Main Cards Grid */}
                <div className="flex flex-wrap gap-8 justify-center">
                    {mainCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Main Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                  relative p-6 rounded-2xl cursor-pointer transition-all duration-300 
                                  ${
                                      expandedCard === card.id
                                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl"
                                          : "bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white shadow-lg hover:shadow-xl"
                                  }
                                `}
                                onClick={() => toggleCard(card.id)}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <motion.div
                                        animate={{
                                            rotate:
                                                expandedCard === card.id
                                                    ? 360
                                                    : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`
                                        p-3 rounded-full
                                        ${
                                            expandedCard === card.id
                                                ? "bg-white/20 text-white"
                                                : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600"
                                        }
                                        `}
                                    >
                                        {card.icon}
                                    </motion.div>
                                    <h2
                                        className={`text-xl font-bold ${
                                            expandedCard === card.id
                                                ? "text-white"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {card.title}
                                    </h2>
                                </div>

                                <p
                                    className={`mb-4 ${
                                        expandedCard === card.id
                                            ? "text-blue-100"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {card.description}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold flex items-center">
                                        <Quote className="mr-2" size={16} />
                                        {card.title}
                                    </h3>
                                </div>
                            </motion.div>

                            {/* Poster Section - Now outside of expanded content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-xl p-6 shadow-lg mt-4"
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {card.id === "cara-menyusui" &&
                                            "Poster Cara Menyusui"}
                                        {card.id === "posisi-perlekatan" &&
                                            "Poster Posisi Menyusui"}
                                        {card.id === "cara-menyimpan-asi" &&
                                            "Poster Cara Menyimpan ASI"}
                                        {card.id === "komposisi-asi" &&
                                            "Poster Komposisi ASI"}
                                        {card.id === "asi-eksklusif" &&
                                            "Poster ASI Eksklusif"}
                                        {card.id === "breast-care" &&
                                            "Poster Breast Care"}
                                        {card.id === "tablet-tambah-darah" &&
                                            "Poster Tablet Tambah Darah"}
                                    </h3>
                                    <p className="text-gray-600">
                                        Download poster untuk panduan visual
                                    </p>
                                </div>
                                <div className="max-w-2xl mx-auto">
                                    <div
                                        className="relative group cursor-pointer"
                                        onClick={() =>
                                            setSelectedImage(
                                                `/storage/poster/${
                                                    card.id === "cara-menyusui"
                                                        ? "caramenyusui.png"
                                                        : card.id ===
                                                          "posisi-perlekatan"
                                                        ? "posisimenyusui.png"
                                                        : card.id ===
                                                          "cara-menyimpan-asi"
                                                        ? "menyimpan.png"
                                                        : card.id ===
                                                          "komposisi-asi"
                                                        ? "komposisiasi.jpg"
                                                        : card.id ===
                                                          "asi-eksklusif"
                                                        ? "manfaatasi.jpg"
                                                        : card.id ===
                                                          "breast-care"
                                                        ? "breastcare.jpg"
                                                        : "tablet.jpg"
                                                }`
                                            )
                                        }
                                    >
                                        <img
                                            src={`/storage/poster/${
                                                card.id === "cara-menyusui"
                                                    ? "caramenyusui.png"
                                                    : card.id ===
                                                      "posisi-perlekatan"
                                                    ? "posisimenyusui.png"
                                                    : card.id ===
                                                      "cara-menyimpan-asi"
                                                    ? "menyimpan.png"
                                                    : card.id ===
                                                      "komposisi-asi"
                                                    ? "komposisiasi.jpg"
                                                    : card.id ===
                                                      "asi-eksklusif"
                                                    ? "manfaatasi.jpg"
                                                    : card.id === "breast-care"
                                                    ? "breastcare.jpg"
                                                    : "tablet.jpg"
                                            }`}
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
                                            href={`/storage/poster/${
                                                card.id === "cara-menyusui"
                                                    ? "caramenyusui.png"
                                                    : card.id ===
                                                      "posisi-perlekatan"
                                                    ? "posisimenyusui.png"
                                                    : card.id ===
                                                      "cara-menyimpan-asi"
                                                    ? "menyimpan.png"
                                                    : card.id ===
                                                      "komposisi-asi"
                                                    ? "komposisiasi.jpg"
                                                    : card.id ===
                                                      "asi-eksklusif"
                                                    ? "manfaatasi.jpg"
                                                    : card.id === "breast-care"
                                                    ? "breastcare.jpg"
                                                    : "tablet.jpg"
                                            }`}
                                            download={`Poster_${
                                                card.id === "cara-menyusui"
                                                    ? "Cara_Menyusui"
                                                    : card.id ===
                                                      "posisi-perlekatan"
                                                    ? "Posisi_Menyusui"
                                                    : card.id ===
                                                      "cara-menyimpan-asi"
                                                    ? "Cara_Menyimpan_ASI"
                                                    : card.id ===
                                                      "komposisi-asi"
                                                    ? "Komposisi_ASI"
                                                    : card.id ===
                                                      "asi-eksklusif"
                                                    ? "ASI_Eksklusif"
                                                    : card.id === "breast-care"
                                                    ? "Breast_Care"
                                                    : "Tablet_Tambah_Darah"
                                            }.${
                                                card.id === "komposisi-asi" ||
                                                card.id === "asi-eksklusif" ||
                                                card.id === "breast-care"
                                                    ? "jpg"
                                                    : "png"
                                            }`}
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
                            </motion.div>

                            {/* Expanded Detail Cards */}
                            <AnimatePresence>
                                {expandedCard === card.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                        className="mt-4 space-y-3 overflow-hidden"
                                    >
                                        {card.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: itemIndex * 0.1,
                                                }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    x: 4,
                                                }}
                                                className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-400"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex-shrink-0">
                                                        <div className="text-blue-600">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            <span className="text-gray-700 font-medium">
                                Tips Penting
                            </span>
                        </div>
                        <p className="text-gray-600">
                            Konsultasikan dengan tenaga kesehatan jika mengalami
                            kesulitan dalam menyusui atau tanda-tanda mastitis
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EducationSSection;
