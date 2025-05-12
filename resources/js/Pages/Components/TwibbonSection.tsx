import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
const TwibbonSystem = ({
    faseNifas, // Array fase nifas dari API
    currentFaseId, // ID fase dari main komponen
    userImage, // Gambar pengguna yang diupload
    onSaveImage, // Callback ketika gambar disimpan
}: {
    faseNifas: Array<{ id: number; [key: string]: any }>;
    currentFaseId: number;
    userImage: string | null;
    onSaveImage: (image: string) => void;
}) => {
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const baseUrl = "http://127.0.0.1:8000";

    // Cari twibbon sesuai dengan currentFaseId
    const selectedFase = faseNifas.find((fase) => fase.id === currentFaseId);

    // Generate twibbon ketika userImage dan selectedFase tersedia
    useEffect(() => {
        if (userImage && selectedFase) {
            generateTwibbon();
        }
    }, [userImage, selectedFase]);

    const generateTwibbon = () => {
        if (!userImage || !selectedFase) {
            return;
        }

        setIsProcessing(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const userImg = new Image();
        const twibbonImg = new Image();

        // Handle CORS for the twibbon image
        twibbonImg.crossOrigin = "Anonymous";

        userImg.onload = () => {
            // Set canvas size
            canvas.width = 800;
            canvas.height = 800;

            // Draw user image (centered and scaled)
            const scale = Math.min(
                canvas.width / userImg.width,
                canvas.height / userImg.height
            );

            const x = canvas.width / 2 - (userImg.width / 2) * scale;
            const y = canvas.height / 2 - (userImg.height / 2) * scale;

            ctx.drawImage(
                userImg,
                x,
                y,
                userImg.width * scale,
                userImg.height * scale
            );

            // Draw twibbon on top
            twibbonImg.onload = () => {
                ctx.drawImage(twibbonImg, 0, 0, canvas.width, canvas.height);

                // Generate result
                setResultImage(canvas.toDataURL("image/png"));
                setIsProcessing(false);
            };

            // Set source for twibbon image
            twibbonImg.src = `${baseUrl}/storage/${selectedFase.twibbon_image}`;
        };

        // Handle if userImage is already a URL or a File
        if (typeof userImage === "string") {
            userImg.src = userImage;
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    userImg.src = reader.result;
                }
            };
            reader.readAsDataURL(userImage);
        }
    };

    const downloadImage = () => {
        if (!resultImage || !selectedFase) return;

        const link = document.createElement("a");
        link.download = `twibbon-fase-${selectedFase.id}.png`;
        link.href = resultImage;
        link.click();

        // Call callback if provided
        if (onSaveImage) {
            onSaveImage(resultImage);
        }
    };

    // Jika tidak ada fase yang dipilih, tampilkan pesan
    if (!selectedFase) {
        return (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">Fase tidak ditemukan!</p>
            </div>
        );
    }

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">
                Twibbon Fase {selectedFase.name}
            </h3>

            {/* Canvas untuk processing (hidden) */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            {isProcessing ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                </div>
            ) : resultImage ? (
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <img
                            src={resultImage}
                            alt="Hasil Twibbon"
                            className="rounded-lg shadow-md max-w-full max-h-64"
                        />
                        <motion.div
                            initial={{ scale: 0, rotate: -5 }}
                            animate={{ scale: 1, rotate: -5 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className={`absolute -top-3 -right-3 ${selectedFase.border_style} bg-white px-3 py-1 rounded-full shadow-lg`}
                        >
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                    Fase {selectedFase.name}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <button
                        onClick={downloadImage}
                        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Unduh Twibbon
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-medium mb-4">
                            Upload Foto
                        </h4>
                        <div className="mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            if (
                                                typeof reader.result ===
                                                "string"
                                            ) {
                                                onSaveImage(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full p-2 border rounded-lg bg-white"
                            />
                        </div>
                        {userImage && (
                            <div className="mt-4">
                                <h5 className="text-sm font-medium mb-2">
                                    Preview Foto:
                                </h5>
                                <img
                                    src={userImage}
                                    alt="Preview"
                                    className="max-h-48 rounded-lg shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {/* Twibbon Preview Section */}
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-medium mb-4">
                            Preview Twibbon
                        </h4>
                        <div className="relative">
                            <img
                                src={`${baseUrl}/storage/${selectedFase.twibbon_image}`}
                                alt="Twibbon Frame"
                                className="w-full rounded-lg shadow-sm"
                            />
                            {userImage && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src={userImage}
                                        alt="User Image"
                                        className="max-h-32 max-w-32 object-cover rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                            )}
                        </div>
                        {userImage && (
                            <button
                                onClick={generateTwibbon}
                                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Generate Twibbon
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TwibbonSystem;
