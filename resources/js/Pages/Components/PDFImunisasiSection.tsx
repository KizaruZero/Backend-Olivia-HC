import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface PDFData {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    preview: string;
    size: string;
    pages: number;
    pdfUrl: string;
    downloadUrl: string;
}

const EducationDashboard = () => {
    const [selectedPdf, setSelectedPdf] = useState<PDFData | null>(null);
    const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
    const [pageNum, setPageNum] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [rotation, setRotation] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Sample PDF URLs - ganti dengan URL PDF asli Anda
    const educationPdfs = [
        {
            id: 1,
            title: "POSTER IMUNISASI HB0",
            description:
                "Berisi tentang edukasi pentingnya imunisasi Hepatitis B (HB0)",
            icon: Calendar,
            color: "from-blue-500 to-cyan-500",
            preview:
                "Berisi tentang edukasi pentingnya imunisasi Hepatitis B (HB0)",
            size: "2.3 MB",
            pages: 24,
            pdfUrl: "/storage/imunisasi/HB0.pdf",
            downloadUrl: "/storage/imunisasi/HB0.pdf",
        },
        {
            id: 2,
            title: "POSTER IMUNISASI IPV & BCG",
            description:
                "Berisi tentang edukasi pentingnya imunisasi IPV dan BCG",
            icon: Shield,
            color: "from-green-500 to-emerald-500",
            preview: "Berisi tentang edukasi pentingnya imunisasi IPV dan BCG",
            size: "1.8 MB",
            pages: 18,
            pdfUrl: "/storage/imunisasi/IPVBCG.pdf",
            downloadUrl: "/storage/imunisasi/IPVBCG.pdf",
        },
        {
            id: 3,
            title: "POSTER IMUNISASI MR & BCG",
            description:
                "Berisi tentang edukasi pentingnya imunisasi MR dan BCG",
            icon: Heart,
            color: "from-purple-500 to-pink-500",
            preview: "Berisi tentang edukasi pentingnya imunisasi MR dan BCG",
            size: "1.5 MB",
            pages: 14,
            pdfUrl: "/storage/imunisasi/MRBCG.pdf",
            downloadUrl: "/storage/imunisasi/MRBCG.pdf",
        },
        {
            id: 4,
            title: "POSTER IMUNISASI OPV",
            description:
                "Berisi tentang edukasi pentingnya imunisasi Polio (OPV)",
            icon: Users,
            color: "from-orange-500 to-red-500",
            preview: "Berisi tentang edukasi pentingnya imunisasi Polio (OPV)",
            size: "2.1 MB",
            pages: 20,
            pdfUrl: "/storage/imunisasi/OPV.pdf",
            downloadUrl: "/storage/imunisasi/OPV.pdf",
        },
        {
            id: 5,
            title: "POSTER IMUNISASI RV DAN OPV",
            description:
                "Berisi tentang edukasi pentingnya imunisasi ROTAVIRUS (RV) dan POLIO (OPV)",
            icon: Users,
            color: "from-orange-500 to-red-500",
            preview:
                "Berisi tentang edukasi pentingnya imunisasi ROTAVIRUS (RV) dan POLIO (OPV)",
            size: "2.1 MB",
            pages: 20,
            pdfUrl: "/storage/imunisasi/OPV.pdf",
            downloadUrl: "/storage/imunisasi/OPV.pdf",
        },
    ];

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

            // Set canvas dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            // Render the page
            await page.render(renderContext).promise;

            // Force a re-render after a short delay to ensure proper display
            setTimeout(() => {
                if (canvasRef.current) {
                    const currentContext = canvasRef.current.getContext("2d");
                    if (currentContext) {
                        currentContext.clearRect(
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );
                        page.render(renderContext);
                    }
                }
            }, 100);
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

            // Add a small delay before initial render
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
    const handlePreview = (pdf: PDFData) => {
        setSelectedPdf(pdf);
        if (pdf.pdfUrl) {
            loadPdf(pdf.pdfUrl);
        }
    };

    // Handle download
    const handleDownload = async (pdf: {
        downloadUrl: string;
        title: string;
    }) => {
        try {
            const response = await fetch(pdf.downloadUrl);
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${pdf.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Show success message with sweet alert
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: `${pdf.title} berhasil diunduh!`,
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

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 mb-12">
            <div className="">
                {/* PDF Cards Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 "
                >
                    {educationPdfs.map((pdf, index) => {
                        const IconComponent = pdf.icon;
                        return (
                            <motion.div
                                key={pdf.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1 * index,
                                }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 group"
                            >
                                {/* Card Header with Gradient */}
                                <div
                                    className={`h-32 bg-gradient-to-br ${pdf.color} p-6 relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="relative z-10 flex items-center justify-between h-full">
                                        <IconComponent className="h-12 w-12 text-white" />
                                        <div className="text-right">
                                            <p className="text-white/80 text-sm">
                                                KARTU EDUKASI
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                        {pdf.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                        {pdf.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handlePreview(pdf)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <Eye className="h-4 w-4" />
                                            <span>Preview</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleDownload(pdf)}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                                        >
                                            <Download className="h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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
                            <div
                                className={`bg-gradient-to-r ${selectedPdf.color} p-4 text-white relative`}
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <selectedPdf.icon className="h-8 w-8" />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {selectedPdf.title}
                                            </h2>
                                            <p className="text-white/80">
                                                {selectedPdf.pages} halaman •{" "}
                                                {selectedPdf.size}
                                            </p>
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
                                            <span className="text-sm bg-white/20 px-3 py-1 rounded">
                                                {pageNum} / {pdfDoc.numPages}
                                            </span>
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
                                    {selectedPdf.preview}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDownload(selectedPdf)}
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
        </div>
    );
};

export default EducationDashboard;
