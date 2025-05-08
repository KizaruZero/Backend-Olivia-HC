import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";

// Dummy data
const nifasPhases = [
    {
        id: 1,
        title: "KF1 (0-6 Jam)",
        description:
            "Periode kritis pasca-melahirkan yang memerlukan pemantauan ketat terhadap perdarahan, tekanan darah, dan kontraksi rahim",
        videoLink: "https://www.youtube.com/watch?v=UJ76qKD12LU",
        leaflet: "#",
        article:
            "Fase KF1 adalah periode paling kritis dalam masa nifas. Pada fase ini, ibu perlu dipantau ketat untuk mencegah perdarahan postpartum. Hal-hal yang perlu diperhatikan:\n\n1. Pemantauan tekanan darah setiap 15 menit\n2. Observasi perdarahan dan kontraksi rahim\n3. Pemberian oksitosin untuk membantu kontraksi rahim\n4. Pemeriksaan plasenta lengkap\n5. Pemberian ASI dini untuk merangsang kontraksi rahim\n\nRisiko utama pada fase ini adalah perdarahan postpartum yang dapat mengancam jiwa jika tidak ditangani dengan cepat.",
    },
    {
        id: 2,
        title: "KF2 (6-48 Jam)",
        description:
            "Fase pemulihan awal dengan fokus pada perawatan luka, manajemen nyeri, dan inisiasi menyusui",
        videoLink: "https://youtu.be/qwWfBoteiy8",
        leaflet: "#",
        article:
            "Fase KF2 adalah periode pemulihan awal setelah melahirkan. Fokus utama pada fase ini adalah:\n\n1. Perawatan luka jahitan (episiotomi atau luka operasi)\n2. Manajemen nyeri pasca melahirkan\n3. Inisiasi menyusui dan teknik menyusui yang benar\n4. Mobilisasi dini untuk mencegah trombosis\n5. Edukasi perawatan bayi baru lahir\n\nIbu perlu istirahat cukup namun tetap melakukan aktivitas ringan untuk mempercepat pemulihan.",
    },
    {
        id: 3,
        title: "KF3 (3-7 Hari)",
        description:
            "Fase adaptasi dengan fokus pada perawatan bayi, pemulihan fisik, dan persiapan kembali ke rumah",
        videoLink: "https://youtu.be/qwWfBoteiy8",
        leaflet: "#",
        article:
            "Fase KF3 adalah periode adaptasi dan persiapan pulang ke rumah. Hal-hal yang perlu diperhatikan:\n\n1. Pemantauan tanda-tanda infeksi pada luka\n2. Konseling KB pasca melahirkan\n3. Edukasi perawatan bayi di rumah\n4. Persiapan mental dan fisik untuk kembali ke rumah\n5. Jadwal kontrol ulang ke dokter\n\nIbu perlu memahami tanda-tanda bahaya yang harus segera dilaporkan ke tenaga kesehatan.",
    },
];

type TabType = "video" | "leaflet" | "article";

export default function NifasSection() {
    const [activePhase, setActivePhase] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<TabType>("video");

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">
                        Fase Penting Masa Nifas
                    </h2>
                    <p className="text-blue-600 max-w-2xl mx-auto">
                        Ketahui tahapan perawatan kesehatan pasca-melahirkan
                        untuk ibu dan bayi
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                        {nifasPhases.map((phase) => (
                            <motion.button
                                key={phase.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActivePhase(phase.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all ${
                                    activePhase === phase.id
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                }`}
                            >
                                {phase.title}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-xl p-6 md:p-8 shadow-sm"
                >
                    {/* Phase Title */}
                    <motion.h3
                        className="text-2xl font-bold text-black mb-2 text-center"
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                    >
                        {nifasPhases[activePhase - 1].title}
                    </motion.h3>
                    <p className="text-blue-700 mb-6 text-center">
                        {nifasPhases[activePhase - 1].description}
                    </p>

                    {/* Tabs */}
                    <div className="relative mb-8">
                        {/* Animated Background Bar */}
                        <motion.div
                            className="absolute bottom-0 h-1 bg-blue-100 w-full rounded-full"
                            initial={{ scaleX: 0.9, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                        />

                        <div className="flex relative z-10">
                            {[
                                {
                                    id: "video",
                                    label: "Video Edukasi",
                                    icon: "🎬",
                                },
                                { id: "leaflet", label: "Leaflet", icon: "📋" },
                                { id: "article", label: "Artikel", icon: "📖" },
                            ].map((tab, index) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() =>
                                        setActiveTab(tab.id as TabType)
                                    }
                                    whileHover={{
                                        y: -3,
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                        },
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 py-4 px-2 font-medium relative group transition-colors ${
                                        activeTab === tab.id
                                            ? "text-blue-600"
                                            : "text-blue-400 hover:text-blue-500"
                                    }`}
                                >
                                    {/* Animated Label */}
                                    <motion.span
                                        className="flex flex-col items-center gap-1"
                                        animate={{
                                            color:
                                                activeTab === tab.id
                                                    ? "#2563eb"
                                                    : "#60a5fa",
                                            fontWeight:
                                                activeTab === tab.id
                                                    ? 600
                                                    : 500,
                                        }}
                                    >
                                        <span className="text-xl">
                                            {tab.icon}
                                        </span>
                                        <span>{tab.label}</span>
                                    </motion.span>
                                    {/* Interactive Progress Indicator */}
                                    {activeTab === tab.id ? (
                                        <motion.div
                                            layoutId="tabIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t"
                                            transition={{
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 20,
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="absolute bottom-0 left-1/2 w-0 h-1 bg-blue-300 rounded-full 
                                            group-hover:w-[60%] group-hover:left-[20%] 
                                            transition-all duration-300"
                                        />
                                    )}
                                    {/* Phase Completion Glow (for last phase) */}
                                    {index === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity:
                                                    activeTab === tab.id
                                                        ? 0.8
                                                        : 0,
                                                scale:
                                                    activeTab === tab.id
                                                        ? 1
                                                        : 0.5,
                                            }}
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-blue-600/20"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Floating Progress Bar (Context-aware) */}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                            }}
                            className="min-h-[300px]"
                        >
                            {activeTab === "video" && (
                                <div className="w-full aspect-video rounded-xl overflow-hidden">
                                    <ReactPlayer
                                        url={
                                            nifasPhases[activePhase - 1]
                                                .videoLink
                                        }
                                        controls
                                        width="100%"
                                        height="100%"
                                        className="rounded-xl"
                                        style={{ borderRadius: "0.75rem" }}
                                    />
                                </div>
                            )}

                            {activeTab === "leaflet" && (
                                <div className="border-2 border-blue-200 border-dashed rounded-lg p-8 text-center">
                                    <svg
                                        className="w-12 h-12 text-blue-400 mx-auto mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <p className="text-blue-700">
                                        Download leaflet{" "}
                                        {nifasPhases[activePhase - 1].title}
                                    </p>
                                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                                        Unduh PDF
                                    </button>
                                </div>
                            )}

                            {activeTab === "article" && (
                                <div className="prose prose-blue max-w-none">
                                    <h4 className="text-blue-800">
                                        Artikel Lengkap Tentang{" "}
                                        {nifasPhases[activePhase - 1].title}
                                    </h4>
                                    <p className="text-blue-700">
                                        {nifasPhases[activePhase - 1].article}
                                    </p>
                                    <p className="text-blue-600 mt-4">
                                        Ditinjau oleh: Dr. Sarah Budianti, Sp.OG
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
