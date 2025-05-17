import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
    X,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    AlertCircle,
    Info,
} from "lucide-react";

interface AvoidanceItem {
    id: number;
    title: string;
    description: string;
    iconColor: string;
    icon: string;
}

export default function EducationSection() {
    return (
        <section className="bg-white pb-12 pt-16 min-h-screen px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                    Edukasi Masa Nifas
                </h2>
                <p className="text-center text-blue-600 max-w-2xl mx-auto mb-16 opacity-90">
                    Informasi penting untuk kesehatan dan keselamatan ibu selama
                    masa pemulihan pasca persalinan
                </p>
            </motion.div>

            <div className="container mx-auto space-y-20">
                <AvoidanceSection />
                <DangerSignsSection />
            </div>
        </section>
    );
}

// Things to avoid during postpartum section
function AvoidanceSection() {
    const avoidanceItems = [
        {
            id: 1,
            title: "Membuang ASI Pertama (Kolostrum)",
            description:
                "Kolostrum sangat berguna untuk kekebalan tubuh bayi dan mengandung nutrisi penting. Jangan membuangnya meskipun warnanya berbeda dari ASI biasa.",
            iconColor: "text-red-500",
            icon: "milk",
        },
        {
            id: 2,
            title: "Membersihkan Payudara dengan Bahan Kimia",
            description:
                "Jangan membersihkan payudara dengan alkohol, povidone, iodine, obat merah atau sabun karena residunya dapat terminum oleh bayi dan berbahaya.",
            iconColor: "text-red-500",
            icon: "chemical",
        },
        {
            id: 3,
            title: "Latihan Fisik dengan Posisi Telungkup",
            description:
                "Posisi telungkup dapat menekan area perut yang masih dalam proses pemulihan dan berbahaya untuk jahitan pasca persalinan.",
            iconColor: "text-red-500",
            icon: "exercise",
        },
        {
            id: 4,
            title: "Mengikat Perut Terlalu Kencang",
            description:
                "Mengikat perut terlalu kencang dapat menghambat proses pemulihan rahim dan sirkulasi darah, serta menyebabkan ketidaknyamanan.",
            iconColor: "text-red-500",
            icon: "belt",
        },
        {
            id: 5,
            title: "Menempelkan Daun-daunan pada Kemaluan",
            description:
                "Praktik ini dapat menyebabkan infeksi karena daun-daunan mengandung mikroorganisme yang dapat masuk ke dalam luka yang belum sembuh.",
            iconColor: "text-red-500",
            icon: "leaf",
        },
    ];

    // Staggered animation for cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-300 to-blue-100 rounded-full opacity-20 blur-3xl"></div>

            <div
                className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100"
                style={{
                    background:
                        "linear-gradient(135deg, white 0%, #f0f9ff 100%)",
                    boxShadow:
                        "0 20px 40px rgba(0, 114, 245, 0.1), 0 5px 10px rgba(0, 114, 245, 0.05)",
                }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                        Hal yang Harus Dihindari Selama Nifas
                    </h3>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-8" // Ganti grid dengan flex
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {avoidanceItems.map((item) => (
                        <div
                            key={item.id}
                            className="w-full md:w-[calc(25%-1.5rem)]"
                        >
                            {" "}
                            {/* Atur lebar per item */}
                            <AvoidanceCard item={item} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

function AvoidanceCard({ item }: { item: AvoidanceItem }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (isExpanded) {
            controls.start({ height: "auto", opacity: 1 });
        } else {
            controls.start({ height: 0, opacity: 0 });
        }
    }, [isExpanded, controls]);

    // Card animation
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        hover: {
            y: -8,
            boxShadow: "0 15px 30px rgba(0, 114, 245, 0.2)",
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    const getIconComponent = (iconType: string) => {
        switch (iconType) {
            case "milk":
                return (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M8 2H16V4C16 5.1 16.9 6 18 6H19V8L12 10L5 8V6H6C7.1 6 8 5.1 8 4V2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 8V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 10V22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "chemical":
                return (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M9 3H15V10L19 14V21H5V14L9 10V3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 21H18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 3V10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "exercise":
                return (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M8 7V17M16 7V17M5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "belt":
                return (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <rect
                            x="3"
                            y="10"
                            width="18"
                            height="4"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M7 14V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M17 14V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M7 7V10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M17 7V10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                );
            case "leaf":
                return (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                    >
                        <path
                            d="M6 21C6 17.7 4 13 4 10C4 6.7 7.6 4 12 4C19 4 20 9.6 20 14C20 21 12 22 10 22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 14C6 15 6 22 6 22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            default:
                return <X className="w-6 h-6" />;
        }
    };

    return (
        <motion.div
            className="rounded-xl overflow-hidden relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-50"></div>

            <div
                className="relative bg-white/80 backdrop-blur-sm h-full p-6 border border-blue-100 rounded-xl"
                style={{
                    boxShadow:
                        "0 10px 25px -5px rgba(0, 114, 245, 0.1), 0 10px 10px -5px rgba(0, 114, 245, 0.05)",
                }}
            >
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-full p-3 mr-4 shadow-lg shadow-blue-100">
                        <div className="text-white">
                            {getIconComponent(item.icon)}
                        </div>
                    </div>
                    <h4 className="font-bold text-lg text-blue-900">
                        {item.title}
                    </h4>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="text-gray-700 mb-4">
                                {item.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-2 group"
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-100 rounded-full p-1 mr-2 group-hover:bg-blue-200"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                    <span>{isExpanded ? "Tutup" : "Selengkapnya"}</span>
                </button>
            </div>
        </motion.div>
    );
}

// Danger signs section
function DangerSignsSection() {
    const dangerSigns = [
        {
            id: 1,
            sign: "Demam lebih dari 2 hari",
            description:
                "Demam yang berlangsung lebih dari 2 hari dapat mengindikasikan adanya infeksi yang memerlukan penanganan medis segera.",
        },
        {
            id: 2,
            sign: "Perdarahan lewat jalan lahir",
            description:
                "Perdarahan berlebihan atau perdarahan yang muncul kembali setelah sempat berhenti merupakan tanda bahaya dan perlu penanganan cepat.",
        },
        {
            id: 3,
            sign: "Ibu terlihat sedih, murung, dan menangis tanpa sebab (depresi)",
            description:
                "Gejala ini bisa mengindikasikan depresi pasca persalinan yang membutuhkan dukungan mental dan penanganan profesional.",
        },
        {
            id: 4,
            sign: "Nyeri ulu hati, mual, muntah, sakit kepala, pandangan kabur, kejang",
            description:
                "Gejala-gejala ini bisa mengindikasikan preeklampsia pasca persalinan yang sangat berbahaya dan memerlukan penanganan medis darurat.",
        },
        {
            id: 5,
            sign: "Payudara bengkak, merah, disertai rasa sakit",
            description:
                "Kondisi ini bisa mengindikasikan mastitis (infeksi payudara) yang memerlukan penanganan dokter.",
        },
        {
            id: 6,
            sign: "Keluar cairan berbau dari jalan lahir",
            description:
                "Cairan berbau tidak sedap dari jalan lahir bisa mengindikasikan infeksi yang memerlukan penanganan medis segera.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {/* Radial blur decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-200/10 blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-400/10 to-blue-100/20 blur-3xl opacity-60 -z-10"></div>

            <div
                className="rounded-2xl overflow-hidden p-8 border border-blue-100"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.95) 100%)",
                    boxShadow:
                        "0 20px 40px rgba(0, 114, 245, 0.12), 0 10px 20px rgba(0, 114, 245, 0.05)",
                }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative mb-10"
                >
                    <div className="absolute mt-4 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                            <AlertTriangle className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <div className="text-center pt-16">
                        <h3 className="text-3xl font-bold text-blue-900 mb-3">
                            Waspada! Kenali Tanda Darurat
                        </h3>
                        <p className="text-blue-700 max-w-2xl mx-auto">
                            Jika mengalami salah satu dari tanda-tanda berikut,
                            segera hubungi tenaga medis untuk mendapatkan
                            pertolongan
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {dangerSigns.map((item) => (
                        <DangerSignCard key={item.id} item={item} />
                    ))}
                </motion.div>

                <EmergencyCallToAction />
            </div>
        </motion.div>
    );
}

interface DangerSignItem {
    id: number;
    sign: string;
    description: string;
}

function DangerSignCard({ item }: { item: DangerSignItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className="bg-white rounded-lg p-4 shadow-sm"
            whileHover={{ scale: 1.01 }}
        >
            <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-lg text-orange-800">
                        {item.sign}
                    </h4>

                    <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: isExpanded ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-gray-700 mt-2">{item.description}</p>
                    </motion.div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 flex items-center"
                    >
                        {isExpanded ? (
                            <>
                                <span>Sembunyikan</span>
                                <ChevronUp className="w-3 h-3 ml-1" />
                            </>
                        ) : (
                            <>
                                <span>Detail</span>
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function EmergencyCallToAction() {
    return (
        <motion.div
            className="bg-red-100 rounded-lg p-4 mt-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <h4 className="text-lg font-bold text-red-800 mb-2">
                Segera Hubungi Bidan Jika Mengalami Ini!
            </h4>
            <p className="text-red-700 mb-3">
                Jangan abaikan tanda bahaya di atas. Penanganan cepat dapat
                mencegah komplikasi serius.
            </p>
            <button className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold">
                <ExternalLink className="w-5 h-5 mr-2" />
                Hubungi Bidan Sekarang
            </button>
        </motion.div>
    );
}
