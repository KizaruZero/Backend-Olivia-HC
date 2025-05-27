import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    AlertTriangle,
    Shield,
    Users,
    Phone,
    Brain,
    Moon,
    Frown,
    Clock,
    CheckCircle,
    UserCheck,
    Home,
    MessageCircle,
    Stethoscope,
    Pill,
    Baby,
    Sparkles,
    Quote,
} from "lucide-react";

const PostpartumMentalHealth = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [currentTip, setCurrentTip] = useState(0);

    const awarenessMessages = [
        "💙 Anda tidak sendirian dalam perjalanan ini",
        "🌸 Perasaan ini normal dan bisa diatasi",
        "✨ Meminta bantuan adalah tanda kekuatan",
        "🤗 Setiap ibu berhak mendapat dukungan",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % awarenessMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const mentalHealthConditions = [
        {
            id: "baby-blues",
            title: "Baby Blues",
            subtitle: "Kondisi Normal Pasca Melahirkan",
            timeline: "Terjadi setelah melahirkan sampai 2 minggu",
            severity: "ringan",
            icon: <Baby className="w-8 h-8" />,
            color: "from-blue-400 to-blue-600",
            symptoms: [
                {
                    icon: <Moon className="w-5 h-5" />,
                    text: "Perasaan tidak stabil",
                },
                { icon: <Frown className="w-5 h-5" />, text: "Mudah menangis" },
                { icon: <Clock className="w-5 h-5" />, text: "Sulit tidur" },
                {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    text: "Mudah cemas",
                },
                {
                    icon: <Heart className="w-5 h-5" />,
                    text: "Mudah tersinggung",
                },
            ],
        },
        {
            id: "depression",
            title: "Depresi Pasca Melahirkan",
            subtitle: "Kondisi Serius yang Perlu Penanganan",
            timeline:
                "Terjadi sekitar 4 minggu setelah melahirkan, berlangsung 2 minggu berturut-turut",
            severity: "serius",
            icon: <Brain className="w-8 h-8" />,
            color: "from-red-500 to-red-600",
            symptoms: [
                {
                    icon: <Frown className="w-5 h-5" />,
                    text: "Merasa sangat sedih dan tertekan",
                },
                {
                    icon: <Brain className="w-5 h-5" />,
                    text: "Sulit konsentrasi",
                },
                { icon: <Moon className="w-5 h-5" />, text: "Gangguan tidur" },
                {
                    icon: <Heart className="w-5 h-5" />,
                    text: "Tidak selera makan / banyak makan",
                },
                {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    text: "Mudah tersinggung dan marah",
                },
                {
                    icon: <Clock className="w-5 h-5" />,
                    text: "Merasa lelah dan tidak bergairah",
                },
                {
                    icon: <Frown className="w-5 h-5" />,
                    text: "Perasaan bersalah dan khawatir",
                },
                {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    text: "Pikiran melukai diri sendiri",
                },
            ],
        },
    ];

    const preventionSteps = [
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Kenali Gejala",
            description:
                "Kenali tanda gejala masalah kesehatan jiwa sejak dini",
            color: "from-blue-400 to-blue-600",
        },
        {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Kontrol Rutin",
            description:
                "Saat hamil, kontrol dengan teratur ke bidan atau dokter secara rutin",
            color: "from-blue-500 to-blue-700",
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Nutrisi Sehat",
            description:
                "Konsumsi makanan sehat dan bergizi untuk kesehatan mental",
            color: "from-blue-600 to-blue-800",
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Deteksi Dini",
            description:
                "Deteksi dini faktor risiko ibu hamil dan pasca melahirkan",
            color: "from-blue-400 to-blue-600",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Dukungan Sosial",
            description:
                "Dukungan dan perhatian dari suami, keluarga, dan teman",
            color: "from-blue-500 to-blue-700",
        },
    ];

    const treatmentSteps = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Dukungan Keluarga",
            description: "Dukungan keluarga terutama suami kepada ibu dan bayi",
            urgency: "tinggi",
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Bantuan Mengasuh",
            description:
                "Ada yang membantu mengasuh bayi agar ibu tidak terbebani",
            urgency: "tinggi",
        },
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Komunikasi Terbuka",
            description:
                "Mengajak bicara ibu mengenai perasaannya dengan empati",
            urgency: "sedang",
        },
        {
            icon: <Home className="w-6 h-6" />,
            title: "Kunjungan Rumah",
            description: "Program kunjungan rumah oleh tenaga puskesmas",
            urgency: "sedang",
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Konseling Profesional",
            description: "Konseling dengan tenaga kesehatan yang berpengalaman",
            urgency: "tinggi",
        },
        {
            icon: <Pill className="w-6 h-6" />,
            title: "Terapi Medis",
            description:
                "Terapi dengan obat-obatan jika diperlukan oleh dokter",
            urgency: "serius",
        },
    ];

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header dengan Awareness Message */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="relative">
                        <div className="inline-flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-2xl">
                            <Brain className="w-8 h-8 text-white" />
                            <h1 className="text-white text-2xl ">
                                Kesehatan Mental Pasca Melahirkan
                            </h1>
                        </div>
                    </div>

                    {/* Emergency Alert */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 mb-8 shadow-2xl"
                    >
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <AlertTriangle className="w-8 h-8 animate-pulse" />
                            <h3 className="text-xl font-bold">
                                Penting untuk Diingat!
                            </h3>
                        </div>
                        <p className="text-lg">
                            Jika Anda atau orang terdekat mengalami pikiran
                            untuk melukai diri sendiri atau bayi,
                            <span className="font-bold underline">
                                {" "}
                                segera hubungi tenaga kesehatan!
                            </span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 mb-2 text-white rounded-2xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="p-2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <Quote className="mr-2" size={16} />
                                    Kesehatan Mental Pasca Melahirkan
                                </h3>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={awarenessMessages[currentTip]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="italic"
                                >
                                    <p className="text-lg mb-2">
                                        "{awarenessMessages[currentTip]}"
                                    </p>
                                    <p className="text-right text-blue-100 mr-2">
                                        - {awarenessMessages[currentTip]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[
                        {
                            id: "overview",
                            label: "Jenis Gangguan",
                            icon: <Brain className="w-5 h-5" />,
                        },
                        {
                            id: "prevention",
                            label: "Pencegahan",
                            icon: <Shield className="w-5 h-5" />,
                        },
                        {
                            id: "treatment",
                            label: "Penanganan",
                            icon: <Heart className="w-5 h-5" />,
                        },
                    ].map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${
                    activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-blue-50 shadow-md"
                }
              `}
                        >
                            {tab.icon}
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            {mentalHealthConditions.map((condition, index) => (
                                <motion.div
                                    key={condition.id}
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -50 : 50,
                                    }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.2,
                                    }}
                                    className={`
                    bg-white rounded-3xl shadow-2xl overflow-hidden
                    ${
                        condition.severity === "serius"
                            ? "border-l-8 border-red-500"
                            : "border-l-8 border-blue-500"
                    }
                  `}
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left Side - Header */}
                                        <div
                                            className={`lg:w-1/3 bg-gradient-to-br ${condition.color} p-8 text-white relative`}
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="p-4 bg-white/20 rounded-2xl">
                                                        {condition.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold">
                                                            {condition.title}
                                                        </h3>
                                                        <p className="text-white/90 text-lg">
                                                            {condition.subtitle}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-white/20 rounded-2xl p-4 mb-4">
                                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                        <Clock className="w-5 h-5" />
                                                        Waktu Terjadinya
                                                    </h4>
                                                    <p className="text-white/90 leading-relaxed">
                                                        {condition.timeline}
                                                    </p>
                                                </div>

                                                {condition.severity ===
                                                    "serius" && (
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 2,
                                                        }}
                                                        className="flex items-center gap-2 bg-red-600/40 rounded-full px-4 py-2 w-fit"
                                                    >
                                                        <AlertTriangle className="w-5 h-5" />
                                                        <span className="font-semibold">
                                                            Perlu Perhatian
                                                            Serius
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Side - Symptoms */}
                                        <div className="lg:w-2/3 p-8">
                                            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                                <AlertTriangle
                                                    className={`w-6 h-6 ${
                                                        condition.severity ===
                                                        "serius"
                                                            ? "text-red-500"
                                                            : "text-blue-500"
                                                    }`}
                                                />
                                                Gejala yang Dialami
                                            </h4>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                {condition.symptoms.map(
                                                    (symptom, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{
                                                                opacity: 0,
                                                                y: 20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    idx * 0.1,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.02,
                                                                x: 4,
                                                            }}
                                                            className={`
                              flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border-2
                              ${
                                  condition.severity === "serius"
                                      ? "bg-red-50 border-red-200 hover:bg-red-100"
                                      : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                              }
                            `}
                                                        >
                                                            <div
                                                                className={`
                              p-2 rounded-full flex-shrink-0
                              ${
                                  condition.severity === "serius"
                                      ? "bg-red-200 text-red-600"
                                      : "bg-blue-200 text-blue-600"
                              }
                            `}
                                                            >
                                                                {symptom.icon}
                                                            </div>
                                                            <span className="text-gray-700 font-medium">
                                                                {symptom.text}
                                                            </span>
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "prevention" && (
                        <motion.div
                            key="prevention"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                                    Langkah Pencegahan
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Pencegahan adalah kunci untuk menjaga
                                    kesehatan mental pasca melahirkan
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {preventionSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500"
                                    >
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}
                                        >
                                            <div className="text-white">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-center text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "treatment" && (
                        <motion.div
                            key="treatment"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                                    Penanganan dan Perawatan
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Langkah-langkah penanganan yang dapat
                                    dilakukan
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {treatmentSteps.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        className={`
                      bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden
                      ${
                          step.urgency === "serius"
                              ? "border-2 border-red-300"
                              : "border-2 border-blue-300"
                      }
                    `}
                                    >
                                        {/* Urgency Indicator */}
                                        <div
                                            className={`
                      absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs font-bold text-white
                      ${
                          step.urgency === "serius"
                              ? "bg-red-500"
                              : step.urgency === "tinggi"
                              ? "bg-blue-600"
                              : "bg-blue-400"
                      }
                    `}
                                        >
                                            {step.urgency.toUpperCase()}
                                        </div>

                                        <div
                                            className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto
                      ${
                          step.urgency === "serius"
                              ? "bg-gradient-to-r from-red-500 to-red-600"
                              : "bg-gradient-to-r from-blue-500 to-blue-700"
                      }
                    `}
                                        >
                                            <div className="text-white">
                                                {step.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-center leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Emergency Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white text-center shadow-2xl"
                            >
                                <Phone className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-4">
                                    Butuh Bantuan Segera?
                                </h3>
                                <p className="text-lg mb-4">
                                    Jangan ragu untuk menghubungi tenaga
                                    kesehatan atau hotline kesehatan mental
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <div className="bg-white/20 rounded-lg px-4 py-2">
                                        <span className="font-semibold">
                                            Puskesmas Terdekat
                                        </span>
                                    </div>
                                    <div className="bg-white/20 rounded-lg px-4 py-2">
                                        <span className="font-semibold">
                                            119 (Halo Kemkes)
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Support Message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-2xl cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Sparkles className="w-6 h-6" />
                </motion.div>
            </div>
        </div>
    );
};

export default PostpartumMentalHealth;
