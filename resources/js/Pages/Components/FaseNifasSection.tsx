import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import { CheckIcon } from "@heroicons/react/24/outline";
import { span } from 'framer-motion/client';
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
        videoLink: "https://www.youtube.com/watch?v=zZfp1uKpIE8",
        leaflet: "#",
        article:
            "Fase KF2 adalah periode pemulihan awal setelah melahirkan. Fokus utama pada fase ini adalah:\n\n1. Perawatan luka jahitan (episiotomi atau luka operasi)\n2. Manajemen nyeri pasca melahirkan\n3. Inisiasi menyusui dan teknik menyusui yang benar\n4. Mobilisasi dini untuk mencegah trombosis\n5. Edukasi perawatan bayi baru lahir\n\nIbu perlu istirahat cukup namun tetap melakukan aktivitas ringan untuk mempercepat pemulihan.",
    },
    {
        id: 3,
        title: "KF3 (3-7 Hari)",
        description:
            "Fase adaptasi dengan fokus pada perawatan bayi, pemulihan fisik, dan persiapan kembali ke rumah",
        videoLink: "https://www.youtube.com/watch?v=donDxq9Eg-s ",
        leaflet: "#",
        article:
            "Fase KF3 adalah periode adaptasi dan persiapan pulang ke rumah. Hal-hal yang perlu diperhatikan:\n\n1. Pemantauan tanda-tanda infeksi pada luka\n2. Konseling KB pasca melahirkan\n3. Edukasi perawatan bayi di rumah\n4. Persiapan mental dan fisik untuk kembali ke rumah\n5. Jadwal kontrol ulang ke dokter\n\nIbu perlu memahami tanda-tanda bahaya yang harus segera dilaporkan ke tenaga kesehatan.",
    },
];

type TabType = "video" | "leaflet" | "article";

export default function NifasSection() {
    const [activePhase, setActivePhase] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<TabType>("video");
    const [isHovering, setIsHovering] = useState<number | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const progressRef = useRef(null);

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const timer = setTimeout(() => {
            if (activePhase < nifasPhases.length) {
                setActivePhase(prev => Math.min(prev + 1, nifasPhases.length));
            } else {
                setActivePhase(1);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [activePhase, nifasPhases.length, isAutoPlaying]);

    const handlePhaseClick = (phaseId: number) => {
        setIsAutoPlaying(false);
        setActivePhase(phaseId);
    };

    const handlePhaseHover = (phaseId: number) => {
        setIsAutoPlaying(false);
        setIsHovering(phaseId);
    };

    return (
        <section
        id="fase-nifas"
         className="bg-white pt-24 min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
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
                    Kenali
                    <span className="text-blue-500"> Fase Nifas</span>{" "}
                    : Panduan Pemulihan 
                    <span className="text-blue-500"> Pascapersalinan</span>
                </motion.h2>
                <motion.p
                className="mt-2 text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                Setiap fase nifas memiliki kebutuhan yang berbeda. Pelajari lebih dalam melalui video, leaflet, dan artikel informatif yang kami sediakan di setiap tahap.
                </motion.p> 

                    
                </div>
      
                {/* Animated Progress Bar */}
                <div className="relative h-3 bg-blue-100 rounded-full w-full mb-12 overflow-hidden shadow-inner">
                    <motion.div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                        width: `${(activePhase / nifasPhases.length) * 100}%`
                    }}
                    transition={{ 
                        duration: 0.8, 
                        ease: "easeInOut"
                    }}
                    />
                    
                    {/* Animated particles in progress bar */}
                    <motion.div
                    className="absolute top-0 h-full opacity-70"
                    style={{ 
                        width: "100%",
                        background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                        left: "-100%"
                    }}
                    animate={{
                        left: ["0%", "100%"]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear"
                    }}
                    />
                </div>
                
                {/* Interactive Bubble Timeline */}
                <div className="flex relative">
                    {nifasPhases.map((phase, index) => (
                    <div 
                        key={phase.id} 
                        className="flex-1 flex flex-col items-center relative"
                    >
                        {/* Connection Line */}
                        {index > 0 && (
                        <div className="absolute h-0.5 top-6 left-0 right-0 -z-10">
                            <motion.div
                            className="h-full"
                            style={{
                                background: "linear-gradient(90deg, #93c5fd, #6366f1)"
                            }}
                            initial={{ opacity: 0.3 }}
                            animate={{
                                opacity: activePhase > index ? 1 : 0.3,
                            }}
                            transition={{ duration: 0.4 }}
                            />
                        </div>
                        )}
                        
                        {/* Interactive Bubble */}
                        <motion.div
                        className="relative z-10 cursor-pointer"
                        onClick={() => handlePhaseClick(phase.id)}
                        onMouseEnter={() => handlePhaseHover(phase.id)}
                        onMouseLeave={() => setIsHovering(null)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        {/* Main Bubble */}
                        <motion.div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                            background: activePhase >= phase.id 
                                ? "linear-gradient(135deg, #4f46e5, #3b82f6)" 
                                : "#e0e7ff"
                            }}
                            animate={{
                            scale: activePhase === phase.id ? 1.1 : 1,
                            boxShadow: activePhase >= phase.id 
                                ? "0 0 15px rgba(79, 70, 229, 0.5)" 
                                : "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                            transition={{ 
                            duration: 0.3,
                            repeat: activePhase === phase.id ? Infinity : 0,
                            repeatType: "reverse",
                            ease: "easeInOut"
                            }}
                        >
                            {activePhase > phase.id ? (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Check icon */}
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </motion.div>
                            ) : (
                            <motion.span
                                className="text-lg font-bold"
                                animate={{ 
                                color: activePhase >= phase.id ? "#ffffff" : "#4f46e5"
                                }}
                            >
                                {phase.id}
                            </motion.span>
                            )}
                        </motion.div>
                        
                        {/* Animated Pulse Effect for Active Phase */}
                        {activePhase === phase.id && (
                            <>
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-indigo-400"
                                animate={{
                                scale: 1.8,
                                opacity: 0
                                }}
                                transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut"
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-indigo-400"
                                animate={{
                                scale: 1.4,
                                opacity: 0
                                }}
                                transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.4
                                }}
                            />
                            </>
                        )}
                        </motion.div>
                        
                        {/* Phase Label */}
                        <motion.div
                        className={`mt-3 text-center transition-all duration-300 ${
                            activePhase === phase.id ? "font-bold" : "font-medium"
                        }`}
                        animate={{
                            y: isHovering === phase.id || activePhase === phase.id ? -3 : 0,
                            color: activePhase >= phase.id ? "#4338ca" : "#6b7280"
                        }}
                        >
                        <span className="text-sm md:text-base whitespace-nowrap px-1">
                            {phase.title}
                        </span>
                        </motion.div>
                        
                        {/* Phase Description */}
                        <AnimatePresence>
                        {(isHovering === phase.id || activePhase === phase.id) && (
                            <motion.div
                            className="absolute top-24  transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-lg p-3 z-20 border-l-4 border-indigo-500"
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            >
                            <p className="text-gray-700 text-sm">{phase.description}</p>
                            {activePhase === phase.id && (
                                <motion.div 
                                className="flex items-center justify-center mt-2 text-xs text-indigo-600 font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                >
                                <span>Current phase</span>
                                {/* Arrow right icon */}
                                <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                                </motion.div>
                            )}
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    ))}
                </div>
                
                {/* Percentage Indicator */}
                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}    
                    transition={{ delay: 0.5 }}
                >
                    <motion.div 
                    className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white font-bold"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    >
                    <motion.span>
                        {Math.round((activePhase / nifasPhases.length) * 100)}% Complete
                    </motion.span>
                    </motion.div>
                </motion.div>

            {/* Content Area */}
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 rounded-xl p-6 md:p-8 shadow-sm mt-12 "
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
