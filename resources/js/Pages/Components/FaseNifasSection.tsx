import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import { CheckIcon } from "@heroicons/react/24/outline";
import { span } from "framer-motion/client";
import {
    Download,
    Eye,
    FileText,
    Calendar,
    Users,
    Shield,
    Heart,
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Loader,
} from "lucide-react";
import Swal from "sweetalert2";

interface FaseNifas {
    id: number;
    name: string;
    description: string;
    video_url: string;
    leaflet: string;
    article: string;
}

type TabType = "video" | "leaflet";

// Add PDF.js type declarations
declare global {
    interface Window {
        pdfjsLib: {
            getDocument: (url: string) => {
                promise: Promise<PDFDocumentProxy>;
            };
            GlobalWorkerOptions: { workerSrc: string };
        };
    }
}

interface PDFDocumentProxy {
    numPages: number;
    getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

interface PDFPageProxy {
    getViewport: (options: {
        scale: number;
        rotation: number;
    }) => PDFPageViewport;
    render: (options: {
        canvasContext: CanvasRenderingContext2D;
        viewport: PDFPageViewport;
    }) => { promise: Promise<void> };
}

interface PDFPageViewport {
    height: number;
    width: number;
}

export default function NifasSection() {
    const [activePhase, setActivePhase] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<TabType>("video");
    const [isHovering, setIsHovering] = useState<number | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const progressRef = useRef(null);
    const [nifasPhases, setNifasPhases] = useState<FaseNifas[]>([]);
    const [selectedPdf, setSelectedPdf] = useState<{
        url: string;
        title: string;
    } | null>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
    const [pageNum, setPageNum] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (activePhase < nifasPhases.length) {
                setActivePhase((prev) =>
                    Math.min(prev + 1, nifasPhases.length)
                );
            } else {
                setActivePhase(1);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [activePhase, nifasPhases.length, isAutoPlaying]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/fase-nifas")
            .then((response) => response.json())
            .then((data) => {
                setNifasPhases(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching fase nifas:", error);
                setIsLoading(false);
            });
    }, []);

    // Load PDF.js
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Render PDF page
    const renderPage = async (
        pdf: PDFDocumentProxy | null,
        pageNumber: number,
        scaleValue: number,
        rotationValue: number
    ) => {
        if (!pdf || !canvasRef.current) return;

        try {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({
                scale: scaleValue,
                rotation: rotationValue,
            });

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (!context) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            context.clearRect(0, 0, canvas.width, canvas.height);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
        } catch (error) {
            console.error("Error rendering page:", error);
        }
    };

    // Load PDF document
    const loadPdf = async (pdfUrl: string) => {
        if (!window.pdfjsLib) return;

        setIsLoading(true);
        try {
            const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
            setPdfDoc(pdf);
            setPageNum(1);
            setScale(1.0);
            setRotation(0);
            setTimeout(() => {
                renderPage(pdf, 1, 1.0, 0);
            }, 100);
        } catch (error) {
            console.error("Error loading PDF:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal memuat PDF",
                text: "Pastikan URL PDF valid dan dapat diakses.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle preview
    const handlePreview = (phaseNumber: number) => {
        const pdfUrl = `/storage/poster/leaflet_${phaseNumber}.pdf`;
        setSelectedPdf({ url: pdfUrl, title: `Leaflet KF ${phaseNumber}` });
        loadPdf(pdfUrl);
    };

    // Handle download
    const handleDownload = async (phaseNumber: number) => {
        try {
            const response = await fetch(
                `/storage/poster/leaflet_${phaseNumber}.pdf`
            );
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Leaflet_KF_${phaseNumber}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: `Leaflet KF ${phaseNumber} berhasil diunduh!`,
            });
        } catch (error) {
            console.error("Download error:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal mengunduh",
                text: "Terjadi kesalahan saat mengunduh file. Silakan coba lagi.",
            });
        }
    };

    // PDF viewer controls
    const goToPrevPage = () => {
        if (pageNum <= 1) return;
        const newPageNum = pageNum - 1;
        setPageNum(newPageNum);
        renderPage(pdfDoc, newPageNum, scale, rotation);
    };

    const goToNextPage = () => {
        if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
        const newPageNum = pageNum + 1;
        setPageNum(newPageNum);
        renderPage(pdfDoc, newPageNum, scale, rotation);
    };

    const zoomIn = () => {
        const newScale = scale + 0.25;
        setScale(newScale);
        renderPage(pdfDoc, pageNum, newScale, rotation);
    };

    const zoomOut = () => {
        if (scale <= 0.5) return;
        const newScale = scale - 0.25;
        setScale(newScale);
        renderPage(pdfDoc, pageNum, newScale, rotation);
    };

    const rotateDoc = () => {
        const newRotation = (rotation + 90) % 360;
        setRotation(newRotation);
        renderPage(pdfDoc, pageNum, scale, newRotation);
    };

    const closeModal = () => {
        setSelectedPdf(null);
        setPdfDoc(null);
        setPageNum(1);
        setScale(1.0);
        setRotation(0);
    };

    const handlePhaseClick = (phaseId: number) => {
        setIsAutoPlaying(false);
        setActivePhase(phaseId);
    };

    const handlePhaseHover = (phaseId: number) => {
        setIsAutoPlaying(false);
        setIsHovering(phaseId);
    };

    // Add intersection observer for video visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVideoVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, // Trigger when 50% of the video is visible
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Handle video download
    const handleVideoDownload = async (phaseNumber: number) => {
        try {
            const response = await fetch(`/storage/video_nifas/video_kf${phaseNumber}.mp4`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Video_KF_${phaseNumber}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: `Video KF ${phaseNumber} berhasil diunduh!`,
            });
        } catch (error) {
            console.error("Download error:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal mengunduh",
                text: "Terjadi kesalahan saat mengunduh video. Silakan coba lagi.",
            });
        }
    };

    return (
        <section
            id="fase-nifas"
            className="bg-white  pt-16 min-h-screen px-4 sm:px-6 lg:px-8"
        >
            <div className="container mx-auto px-6 py-8 min-h-screen">
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
                        <span className="text-blue-500"> Fase Nifas</span> :
                        Panduan Pemulihan
                        <span className="text-blue-500"> Pascapersalinan</span>
                    </motion.h2>
                    <motion.p
                        className="mt-2 text-gray-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Setiap fase nifas memiliki kebutuhan yang berbeda.
                        Pelajari lebih dalam melalui video, leaflet, dan artikel
                        informatif yang kami sediakan di setiap tahap.
                    </motion.p>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative h-3 bg-blue-100 rounded-full w-full mb-12 overflow-hidden shadow-inner">
                    <motion.div
                        ref={progressRef}
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${
                                (activePhase / nifasPhases.length) * 100
                            }%`,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Animated particles in progress bar */}
                    <motion.div
                        className="absolute top-0 h-full opacity-70"
                        style={{
                            width: "100%",
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                            left: "-100%",
                        }}
                        animate={{
                            left: ["0%", "100%"],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
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
                                            background:
                                                "linear-gradient(90deg, #93c5fd, #6366f1)",
                                        }}
                                        initial={{ opacity: 0.3 }}
                                        animate={{
                                            opacity:
                                                activePhase > index ? 1 : 0.3,
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
                                        background:
                                            activePhase >= phase.id
                                                ? "linear-gradient(135deg, #4f46e5, #3b82f6)"
                                                : "#e0e7ff",
                                    }}
                                    animate={{
                                        scale:
                                            activePhase === phase.id ? 1.1 : 1,
                                        boxShadow:
                                            activePhase >= phase.id
                                                ? "0 0 15px rgba(79, 70, 229, 0.5)"
                                                : "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        repeat:
                                            activePhase === phase.id
                                                ? Infinity
                                                : 0,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                    }}
                                >
                                    {activePhase > phase.id ? (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Check icon */}
                                            <svg
                                                className="w-6 h-6 text-white"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </motion.div>
                                    ) : (
                                        <motion.span
                                            className="text-lg font-bold"
                                            animate={{
                                                color:
                                                    activePhase >= phase.id
                                                        ? "#ffffff"
                                                        : "#4f46e5",
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
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                            }}
                                        />
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-indigo-400"
                                            animate={{
                                                scale: 1.4,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeOut",
                                                delay: 0.4,
                                            }}
                                        />
                                    </>
                                )}
                            </motion.div>

                            {/* Phase Label */}
                            <motion.div
                                className={`mt-3 text-center transition-all duration-300 ${
                                    activePhase === phase.id
                                        ? "font-bold"
                                        : "font-medium"
                                }`}
                                animate={{
                                    y:
                                        isHovering === phase.id ||
                                        activePhase === phase.id
                                            ? -3
                                            : 0,
                                    color:
                                        activePhase >= phase.id
                                            ? "#4338ca"
                                            : "#6b7280",
                                }}
                            >
                                <span className="text-sm md:text-base whitespace-nowrap px-1">
                                    {phase.name}
                                </span>
                            </motion.div>

                            {/* Phase Description */}
                            <AnimatePresence>
                                {(isHovering === phase.id ||
                                    activePhase === phase.id) && (
                                    <motion.div
                                        className="absolute top-24  transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-lg p-3 z-20 border-l-4 border-indigo-500"
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.9,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: -5,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-gray-700 text-sm">
                                            {phase.description}
                                        </p>
                                        {activePhase === phase.id && (
                                            <motion.div
                                                className="flex items-center justify-center mt-2 text-xs text-indigo-600 font-medium"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <span>Current phase</span>
                                                {/* Arrow right icon */}
                                                <svg
                                                    className="w-3 h-3 ml-1"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
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
                            ease: "easeInOut",
                        }}
                    >
                        <motion.span>
                            {Math.round(
                                (activePhase / nifasPhases.length) * 100
                            )}
                            % Complete
                        </motion.span>
                    </motion.div>
                </motion.div>

                {/* Content Area */}
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-200  p-6 md:p-8 shadow-sm mt-12 "
                >
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : nifasPhases.length > 0 ? (
                        <>
                            {/* Phase name */}
                            <motion.h3
                                className="text-2xl font-bold text-black mb-2 text-center"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                            >
                                {nifasPhases[activePhase - 1].name}
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
                                        {
                                            id: "leaflet",
                                            label: "Leaflet",
                                            icon: "📋",
                                        },
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
                                        <div ref={videoRef} className="w-full aspect-video rounded-xl overflow-hidden relative group">
                                            <ReactPlayer
                                                url={`/storage/video_nifas/video_kf${activePhase}.mp4`}
                                                controls
                                                width="100%"
                                                height="100%"
                                                className="rounded-xl"
                                                style={{
                                                    borderRadius: "0.75rem",
                                                }}
                                                playing={isVideoVisible}
                                                muted={false}
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            controlsList: "nodownload",
                                                        },
                                                    },
                                                }}
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleVideoDownload(activePhase)}
                                                className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span>Download Video</span>
                                            </motion.button>
                                        </div>
                                    )}

                                    {activeTab === "leaflet" && (
                                        <div className="border-2 border-blue-400 border-dashed rounded-lg p-4 sm:p-8 text-center">
                                            <div className="flex flex-col items-center space-y-4">
                                                <svg
                                                    className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400"
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
                                                <p className="text-blue-700 text-sm sm:text-base">
                                                    Leaflet{" "}
                                                    {
                                                        nifasPhases[
                                                            activePhase - 1
                                                        ].name
                                                    }
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={() =>
                                                            handlePreview(
                                                                activePhase
                                                            )
                                                        }
                                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-sm sm:text-base"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>Preview</span>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={() =>
                                                            handleDownload(
                                                                activePhase
                                                            )
                                                        }
                                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-sm sm:text-base"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        <span>Download</span>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <p className="text-gray-700">
                                Tidak ada data fase nifas.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* PDF Preview Modal */}
            <AnimatePresence>
                {selectedPdf && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <FileText className="h-8 w-8" />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {selectedPdf.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* PDF Controls */}
                                    {pdfDoc && (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={goToPrevPage}
                                                disabled={pageNum <= 1}
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={goToNextPage}
                                                disabled={
                                                    pageNum >= pdfDoc.numPages
                                                }
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                            <div className="w-px h-6 bg-white/20 mx-2"></div>
                                            <button
                                                onClick={zoomOut}
                                                disabled={scale <= 0.5}
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ZoomOut className="h-5 w-5" />
                                            </button>
                                            <span className="text-sm bg-white/20 px-2 py-1 rounded">
                                                {Math.round(scale * 100)}%
                                            </span>
                                            <button
                                                onClick={zoomIn}
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <ZoomIn className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={rotateDoc}
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <RotateCw className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 max-h-[calc(90vh-200px)] overflow-auto">
                                {isLoading ? (
                                    <div className="flex items-center justify-center h-96">
                                        <div className="text-center">
                                            <Loader className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
                                            <p className="text-slate-600">
                                                Memuat PDF...
                                            </p>
                                        </div>
                                    </div>
                                ) : pdfDoc ? (
                                    <div className="flex justify-center">
                                        <canvas
                                            ref={canvasRef}
                                            className="border border-slate-200 shadow-lg max-w-full h-auto"
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
                                        <div className="text-center">
                                            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                                            <p className="text-slate-600 mb-2">
                                                Gagal memuat PDF
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                Pastikan URL PDF valid dan dapat
                                                diakses
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="border-t border-slate-200 p-4 flex justify-between items-center">
                                <p className="text-sm text-slate-600">
                                    Leaflet {nifasPhases[activePhase - 1].name}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDownload(activePhase)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download PDF</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
