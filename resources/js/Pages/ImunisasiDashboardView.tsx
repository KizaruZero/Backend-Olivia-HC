import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    CheckCircle,
    Clock,
    Edit3,
    Plus,
    Save,
    X,
    Award,
    Baby,
    Heart,
    Shield,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarAuth from "./Components/NavbarAuth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PDFImunisasiSection from "./Components/PDFImunisasiSection";

interface Imunisasi {
    id: number;
    user_id: number;
    start_date: string | null;
    is_active: boolean;
    is_completed: boolean;
    completed_at: string | null;
    fase_imunisasi: FaseImunisasi[];
}

interface FaseImunisasi {
    id: number;
    imunisasi_id: number;
    nama_fase: string;
    waktu_fase: string;
    deskripsi_fase: string;
    tugas_1?: string;
    deskripsi_tugas_1?: string;
    tugas_1_status: "belum" | "sudah" | "ditunda" | "dilewati";
    tugas_1_tanggal?: string;
    tugas_1_catatan?: string;
    tugas_2?: string;
    deskripsi_tugas_2?: string;
    tugas_2_status: "belum" | "sudah" | "ditunda" | "dilewati";
    tugas_2_tanggal?: string;
    tugas_2_catatan?: string;
    tugas_3?: string;
    deskripsi_tugas_3?: string;
    tugas_3_status: "belum" | "sudah" | "ditunda" | "dilewati";
    tugas_3_tanggal?: string;
    tugas_3_catatan?: string;
    tugas_4?: string;
    deskripsi_tugas_4?: string;
    tugas_4_status: "belum" | "sudah" | "ditunda" | "dilewati";
    tugas_4_tanggal?: string;
    tugas_4_catatan?: string;
    catatan_fase?: string;
    is_complete: boolean;
}

const ImunisasiDashboardView = () => {
    const [imunisasiList, setImunisasiList] = useState<Imunisasi[]>([]);
    const [faseImunisasiList, setFaseImunisasiList] = useState<FaseImunisasi[]>(
        []
    );
    const [selectedImunisasi, setSelectedImunisasi] =
        useState<Imunisasi | null>(null);
    const [editingFase, setEditingFase] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [localNotes, setLocalNotes] = useState<{ [key: string]: string }>({});
    const [pendingUpdates, setPendingUpdates] = useState<{
        [key: string]: any;
    }>({});
    const [localStatus, setLocalStatus] = useState<{ [key: string]: string }>(
        {}
    );
    const [activeEducationCard, setActiveEducationCard] = useState(0);
    const [editingImunisasi, setEditingImunisasi] = useState<Imunisasi | null>(
        null
    );
    const [editForm, setEditForm] = useState({
        start_date: "",
        is_active: true,
        is_completed: false,
        completed_at: "",
    });

    const educationalCards = [
        {
            id: 1,
            title: "Pentingnya Imunisasi bagi anak anak",
            description:
                "Imunisasi melindungi ibu dan bayi dari penyakit berbahaya selama kehamilan dan setelah lahir.",
            icon: Shield,
            color: "from-blue-500 to-blue-600",
            tips: [
                "Melindungi dari tetanus dan difteri",
                "Mencegah komplikasi kehamilan",
                "Memberikan kekebalan pada bayi",
                "Mengurangi risiko kelahiran prematur",
            ],
        },
        {
            id: 2,
            title: "Jadwal Imunisasi Optimal",
            description:
                "Mengetahui waktu yang tepat untuk setiap jenis imunisasi selama kehamilan.",
            icon: Calendar,
            color: "from-indigo-500 to-indigo-600",
            tips: [
                "Tetanus: 16-28 minggu kehamilan",
                "Influenza: Setiap musim flu",
                "Hepatitis B: Jika berisiko tinggi",
                "Covid-19: Sesuai rekomendasi dokter",
            ],
        },
        {
            id: 3,
            title: "Manfaat untuk Bayi",
            description:
                "Imunisasi ibu memberikan perlindungan awal yang sangat penting bagi bayi baru lahir.",
            icon: Baby,
            color: "from-pink-500 to-pink-600",
            tips: [
                "Antibodi dari ibu ke bayi",
                "Perlindungan 6 bulan pertama",
                "Mencegah penyakit serius",
                "Membangun sistem imun bayi",
            ],
        },
        {
            id: 4,
            title: "Keamanan Imunisasi",
            description:
                "Imunisasi yang direkomendasikan untuk ibu hamil telah terbukti aman dan efektif.",
            icon: Award,
            color: "from-green-500 to-green-600",
            tips: [
                "Telah melalui uji klinis",
                "Direkomendasikan WHO",
                "Efek samping minimal",
                "Manfaat lebih besar dari risiko",
            ],
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveEducationCard(
                (prev) => (prev + 1) % educationalCards.length
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch Imunisasi data with eagerloaded fase_imunisasi
            const imunisasiResponse = await axios.get("/api/imunisasi/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                withCredentials: true,
            });

            console.log("Imunisasi Response:", imunisasiResponse.data); // Debug log

            if (imunisasiResponse.data && imunisasiResponse.data.data) {
                const imunisasiData = imunisasiResponse.data.data;
                setImunisasiList(imunisasiData);

                if (imunisasiData.length > 0) {
                    setSelectedImunisasi(imunisasiData[0]);
                    // Set fase imunisasi from the eagerloaded data
                    setFaseImunisasiList(imunisasiData[0].fase_imunisasi || []);
                }
            }
        } catch (err) {
            console.error("Error fetching imunisasi data:", err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (faseId: number, field: string, value: any) => {
        // Handle status changes
        if (field.includes("status")) {
            setLocalStatus((prev) => ({
                ...prev,
                [`${faseId}_${field}`]: value,
            }));

            // If status is not 'sudah', clear the date
            if (value !== "sudah") {
                const tanggalKey = field.replace("status", "tanggal");
                setLocalNotes((prev) => ({
                    ...prev,
                    [`${faseId}_${tanggalKey}`]: "",
                }));
                setPendingUpdates((prev) => ({
                    ...prev,
                    [`${faseId}_${tanggalKey}`]: "",
                }));
            }
        }

        // Handle date fields
        if (field.includes("tanggal")) {
            // Only allow date input if status is 'sudah'
            const statusKey = field.replace("tanggal", "status");
            const currentStatus =
                localStatus[`${faseId}_${statusKey}`] ||
                (faseImunisasiList.find((fase) => fase.id === faseId)?.[
                    statusKey as keyof FaseImunisasi
                ] as string);

            if (currentStatus === "sudah") {
                // Convert date to YYYY-MM-DD format if it's a valid date
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    value = date.toISOString().split("T")[0];
                }
                // Update localNotes for dates
                setLocalNotes((prev) => ({
                    ...prev,
                    [`${faseId}_${field}`]: value,
                }));
            } else {
                return; // Don't update if status is not 'sudah'
            }
        } else if (field.includes("catatan")) {
            // Update localNotes for notes
            setLocalNotes((prev) => ({
                ...prev,
                [`${faseId}_${field}`]: value,
            }));
        }

        // Store the pending update
        setPendingUpdates((prev) => ({
            ...prev,
            [`${faseId}_${field}`]: value,
        }));
    };

    const handleUpdateFase = async (faseId: number) => {
        try {
            const faseToUpdate = faseImunisasiList.find(
                (fase) => fase.id === faseId
            );
            if (!faseToUpdate) return;

            // Collect all pending updates for this fase
            const updates = Object.entries(pendingUpdates)
                .filter(([key]) => key.startsWith(`${faseId}_`))
                .reduce((acc, [key, value]) => {
                    const field = key.split("_").slice(1).join("_");
                    // Handle date fields
                    if (field.includes("tanggal") && value) {
                        // Format date to YYYY-MM-DD for MySQL
                        const date = new Date(value);
                        if (!isNaN(date.getTime())) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                                2,
                                "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            acc[field] = `${year}-${month}-${day}`;
                        }
                    } else {
                        acc[field] = value;
                    }
                    return acc;
                }, {} as any);

            // Add status updates
            Object.entries(localStatus)
                .filter(([key]) => key.startsWith(`${faseId}_`))
                .forEach(([key, value]) => {
                    const field = key.split("_").slice(1).join("_");
                    updates[field] = value;
                });

            // Create the final update object
            const updatedFase = {
                ...faseToUpdate,
                ...updates,
            };

            // Remove unnecessary fields that might cause issues
            delete updatedFase.created_at;
            delete updatedFase.updated_at;

            console.log("Sending update:", updatedFase); // Debug log

            const response = await axios.put(
                `/api/faseimunisasi/user/${faseId}`,
                updatedFase,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                // Clear pending updates for this fase
                setPendingUpdates((prev) => {
                    const newPending = { ...prev };
                    Object.keys(newPending).forEach((key) => {
                        if (key.startsWith(`${faseId}_`)) {
                            delete newPending[key];
                        }
                    });
                    return newPending;
                });

                // Clear local status for this fase
                setLocalStatus((prev) => {
                    const newStatus = { ...prev };
                    Object.keys(newStatus).forEach((key) => {
                        if (key.startsWith(`${faseId}_`)) {
                            delete newStatus[key];
                        }
                    });
                    return newStatus;
                });

                // Update the UI with the new data
                setFaseImunisasiList((prev) =>
                    prev.map((fase) =>
                        fase.id === faseId ? { ...fase, ...updates } : fase
                    )
                );

                if (selectedImunisasi) {
                    setSelectedImunisasi((prev) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            fase_imunisasi: prev.fase_imunisasi.map((fase) =>
                                fase.id === faseId
                                    ? { ...fase, ...updates }
                                    : fase
                            ),
                        };
                    });
                }

                // Show success message
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data fase berhasil diperbarui",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                console.error("Failed to update fase:", response.data.message);
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Gagal memperbarui data fase",
                });
            }
        } catch (err: any) {
            console.error("Error updating fase:", err);
            if (err.response) {
                console.error("Error details:", err.response.data);
            }
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Terjadi kesalahan saat memperbarui data",
            });
        }
    };

    const handleCompleteFase = async (faseId: number) => {
        try {
            const faseToUpdate = faseImunisasiList.find(
                (fase) => fase.id === faseId
            );
            if (!faseToUpdate) return;

            const updatedFase = {
                ...faseToUpdate,
                is_complete: true,
            };

            const response = await axios.put(
                `/api/faseimunisasi/user/${faseId}`,
                updatedFase,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                // Update both fase list and the fase in the selected imunisasi
                setFaseImunisasiList((prev) =>
                    prev.map((fase) =>
                        fase.id === faseId
                            ? { ...fase, is_complete: true }
                            : fase
                    )
                );

                // Update the fase in the selected imunisasi
                if (selectedImunisasi) {
                    setSelectedImunisasi((prev) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            fase_imunisasi: prev.fase_imunisasi.map((fase) =>
                                fase.id === faseId
                                    ? { ...fase, is_complete: true }
                                    : fase
                            ),
                        };
                    });
                }
            } else {
                console.error(
                    "Failed to complete fase:",
                    response.data.message
                );
                // You might want to show an error message to the user here
            }
        } catch (err: any) {
            console.error("Error completing fase:", err);
            if (err.response) {
                console.error("Error details:", err.response.data);
            }
            // You might want to show an error message to the user here
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "sudah":
                return "bg-green-100 text-green-800 border-green-200";
            case "ditunda":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "dilewati":
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-blue-100 text-blue-800 border-blue-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sudah":
                return <CheckCircle className="w-4 h-4" />;
            case "ditunda":
                return <Clock className="w-4 h-4" />;
            case "dilewati":
                return <X className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getCurrentFases = () => {
        return selectedImunisasi?.fase_imunisasi || [];
    };

    const completedFasesCount = getCurrentFases().filter(
        (fase) => fase.is_complete
    ).length;
    const totalFases = getCurrentFases().length;
    const progressPercentage =
        totalFases > 0 ? (completedFasesCount / totalFases) * 100 : 0;

    const handleEditImunisasi = (imunisasi: Imunisasi) => {
        setEditingImunisasi(imunisasi);
        setEditForm({
            start_date: imunisasi.start_date || "",
            is_active: imunisasi.is_active,
            is_completed: imunisasi.is_completed,
            completed_at: imunisasi.completed_at || "",
        });
    };

    const handleUpdateImunisasi = async () => {
        if (!editingImunisasi) return;

        try {
            const response = await axios.put(
                `/api/imunisasi/${editingImunisasi.id}`,
                editForm,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                // Update the imunisasi list
                setImunisasiList((prevList) =>
                    prevList.map((item) =>
                        item.id === editingImunisasi.id
                            ? { ...item, ...editForm }
                            : item
                    )
                );

                // Update selected imunisasi if it's the one being edited
                if (selectedImunisasi?.id === editingImunisasi.id) {
                    setSelectedImunisasi((prev) =>
                        prev ? { ...prev, ...editForm } : null
                    );
                }

                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Program imunisasi berhasil diperbarui",
                    timer: 1500,
                    showConfirmButton: false,
                });

                setEditingImunisasi(null);
            }
        } catch (error) {
            console.error("Error updating imunisasi:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Gagal memperbarui program imunisasi",
            });
        }
    };

    const handleImunisasiInputChange = (field: string, value: any) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">Error</div>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={fetchData}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <AuthenticatedLayout>
                <div className="container mx-auto px-6 p-8 min-h-screen">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 mb-8 rounded-2xl shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-white">
                                <motion.h1
                                    className="text-3xl font-bold mb-3"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Program Imunisasi Bayi
                                </motion.h1>
                                <motion.p
                                    className="text-blue-100 text-lg"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Lindungi si kecil dengan imunisasi lengkap
                                </motion.p>
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Shield className="w-16 h-16 text-white/80" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Educational Cards Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {educationalCards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${
                                        activeEducationCard === index
                                            ? "ring-4 ring-blue-300"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setActiveEducationCard(index)
                                    }
                                >
                                    <div
                                        className={`bg-gradient-to-br ${card.color} p-6 text-white`}
                                    >
                                        <card.icon className="w-8 h-8 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    <div className="bg-white p-6">
                                        <h4 className="font-semibold text-gray-800 mb-3">
                                            Poin Penting:
                                        </h4>
                                        <ul className="space-y-2">
                                            {card.tips.map((tip, tipIndex) => (
                                                <motion.li
                                                    key={tipIndex}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: tipIndex * 0.1,
                                                    }}
                                                    className="flex items-center gap-2 text-gray-600"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        {tip}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <PDFImunisasiSection />

                    {/* Progress Overview */}
                    {selectedImunisasi && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-8 text-white"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Progress Imunisasi
                                    </h3>
                                    <p className="text-blue-100">
                                        Lacak perkembangan imunisasi si kecil
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold">
                                        {completedFasesCount}/{totalFases}
                                    </div>
                                    <div className="text-sm text-blue-100">
                                        Fase Selesai
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-blue-700/50 rounded-full h-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${progressPercentage}%`,
                                    }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-white h-4 rounded-full"
                                />
                            </div>
                            <div className="text-center mt-2 text-sm text-blue-100">
                                {progressPercentage.toFixed(1)}% Complete
                            </div>
                        </motion.div>
                    )}

                    {/* Imunisasi List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3">
                                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                                    <span className="hidden sm:inline">
                                        Program Imunisasi Aktif
                                    </span>
                                    <span className="sm:hidden">
                                        Imunisasi Aktif
                                    </span>
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                    <span className="hidden md:inline">
                                        Kelola dan pantau program imunisasi si
                                        kecil
                                    </span>
                                    <span className="md:hidden">
                                        Pantau imunisasi si kecil
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:gap-6">
                            {imunisasiList && imunisasiList.length > 0 ? (
                                imunisasiList.map((imunisasi) => (
                                    <motion.div
                                        key={imunisasi.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.01 }}
                                        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                                            selectedImunisasi?.id ===
                                            imunisasi.id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 bg-white hover:border-blue-300"
                                        }`}
                                        onClick={() =>
                                            setSelectedImunisasi(imunisasi)
                                        }
                                    >
                                        <div className="p-4 md:p-6">
                                            {/* Mobile Layout */}
                                            <div className="sm:hidden space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`p-2 rounded-full ${
                                                                imunisasi.is_active
                                                                    ? "bg-green-100"
                                                                    : "bg-gray-100"
                                                            }`}
                                                        >
                                                            <Heart
                                                                className={`w-4 h-4 ${
                                                                    imunisasi.is_active
                                                                        ? "text-green-600"
                                                                        : "text-gray-400"
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-semibold text-gray-800">
                                                                Program
                                                                Imunisasi
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div
                                                                    className={`w-2 h-2 rounded-full ${
                                                                        imunisasi.is_active
                                                                            ? "bg-green-500"
                                                                            : "bg-gray-400"
                                                                    }`}
                                                                />
                                                                <span className="text-xs text-gray-600">
                                                                    {imunisasi.is_active
                                                                        ? "Berjalan"
                                                                        : "Selesai"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                imunisasi.is_completed
                                                                    ? "bg-green-100 text-green-800 border border-green-200"
                                                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                                            }`}
                                                        >
                                                            {imunisasi.is_completed
                                                                ? "Selesai"
                                                                : "Aktif"}
                                                        </span>
                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditImunisasi(
                                                                    imunisasi
                                                                );
                                                            }}
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-xs text-gray-600">
                                                        <span className="font-medium">
                                                            Mulai:
                                                        </span>{" "}
                                                        {imunisasi.start_date
                                                            ? new Date(
                                                                  imunisasi.start_date
                                                              ).toLocaleDateString(
                                                                  "id-ID",
                                                                  {
                                                                      day: "numeric",
                                                                      month: "short",
                                                                      year: "numeric",
                                                                  }
                                                              )
                                                            : "Belum ditentukan"}
                                                    </p>
                                                    {imunisasi.completed_at && (
                                                        <p className="text-xs text-gray-600">
                                                            <span className="font-medium">
                                                                Selesai:
                                                            </span>{" "}
                                                            {new Date(
                                                                imunisasi.completed_at
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Desktop Layout */}
                                            <div className="hidden sm:block">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-start gap-4">
                                                        <div
                                                            className={`p-3 rounded-full ${
                                                                imunisasi.is_active
                                                                    ? "bg-green-100"
                                                                    : "bg-gray-100"
                                                            }`}
                                                        >
                                                            <Heart
                                                                className={`w-6 h-6 ${
                                                                    imunisasi.is_active
                                                                        ? "text-green-600"
                                                                        : "text-gray-400"
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h3 className="text-lg font-semibold text-gray-800">
                                                                    Program
                                                                    Imunisasi
                                                                </h3>
                                                                <span
                                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                        imunisasi.is_completed
                                                                            ? "bg-green-100 text-green-800 border border-green-200"
                                                                            : "bg-blue-100 text-blue-800 border border-blue-200"
                                                                    }`}
                                                                >
                                                                    {imunisasi.is_completed
                                                                        ? "Selesai"
                                                                        : "Aktif"}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm text-gray-600">
                                                                    <span className="font-medium">
                                                                        Mulai:
                                                                    </span>{" "}
                                                                    {imunisasi.start_date
                                                                        ? new Date(
                                                                              imunisasi.start_date
                                                                          ).toLocaleDateString(
                                                                              "id-ID",
                                                                              {
                                                                                  day: "numeric",
                                                                                  month: "long",
                                                                                  year: "numeric",
                                                                              }
                                                                          )
                                                                        : "Belum ditentukan"}
                                                                </p>
                                                                {imunisasi.completed_at && (
                                                                    <p className="text-sm text-gray-600">
                                                                        <span className="font-medium">
                                                                            Selesai:
                                                                        </span>{" "}
                                                                        {new Date(
                                                                            imunisasi.completed_at
                                                                        ).toLocaleDateString(
                                                                            "id-ID",
                                                                            {
                                                                                day: "numeric",
                                                                                month: "long",
                                                                                year: "numeric",
                                                                            }
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className={`w-2 h-2 rounded-full ${
                                                                    imunisasi.is_active
                                                                        ? "bg-green-500"
                                                                        : "bg-gray-400"
                                                                }`}
                                                            />
                                                            <span className="text-sm text-gray-600">
                                                                {imunisasi.is_active
                                                                    ? "Sedang Berjalan"
                                                                    : "Selesai"}
                                                            </span>
                                                        </div>
                                                        <motion.div
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditImunisasi(
                                                                    imunisasi
                                                                );
                                                            }}
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Bar - Same for both layouts */}
                                            <div className="mt-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs md:text-sm font-medium text-gray-600">
                                                        Progress
                                                    </span>
                                                    <span className="text-xs md:text-sm text-gray-600">
                                                        {completedFasesCount}/
                                                        {totalFases} Fase
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${progressPercentage}%`,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                        }}
                                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Effect Border */}
                                        <div className="absolute inset-0 border-2 border-blue-500 opacity-0 transition-opacity duration-300 rounded-xl pointer-events-none" />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-8 md:py-12 bg-gray-50 rounded-xl"
                                >
                                    <div className="bg-gray-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Baby className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                                        Belum Ada Program Imunisasi
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
                                        <span className="hidden md:inline">
                                            Mulai program imunisasi untuk
                                            melindungi kesehatan si kecil
                                        </span>
                                        <span className="md:hidden">
                                            Mulai program imunisasi si kecil
                                        </span>
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 mx-auto text-sm md:text-base"
                                    >
                                        <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                        <span className="md:hidden">
                                            Tambah Program
                                        </span>
                                        <span className="hidden md:inline">
                                            Tambah Program Baru
                                        </span>
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Fase Imunisasi */}
                    {/* Fase Imunisasi */}
                    {selectedImunisasi && faseImunisasiList.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
                        >
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 sm:mb-8 gap-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
                                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                        Fase Imunisasi
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                                        Pantau dan kelola setiap fase imunisasi
                                        si kecil
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                                    <div className="bg-blue-50 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto">
                                        <span className="text-xs sm:text-sm font-medium text-blue-700">
                                            Total Fase: {totalFases}
                                        </span>
                                    </div>
                                    <div className="bg-green-50 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto">
                                        <span className="text-xs sm:text-sm font-medium text-green-700">
                                            Selesai: {completedFasesCount}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:gap-6">
                                {getCurrentFases().map((fase, index) => (
                                    <motion.div
                                        key={fase.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative overflow-hidden rounded-xl border-2 ${
                                            fase.is_complete
                                                ? "border-green-200 bg-green-50"
                                                : "border-blue-100 bg-white hover:border-blue-300"
                                        } transition-all duration-300`}
                                    >
                                        <div className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div
                                                            className={`p-2 rounded-full ${
                                                                fase.is_complete
                                                                    ? "bg-green-100"
                                                                    : "bg-blue-100"
                                                            }`}
                                                        >
                                                            <Clock
                                                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                                    fase.is_complete
                                                                        ? "text-green-600"
                                                                        : "text-blue-600"
                                                                }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                                {fase.nama_fase}
                                                            </h3>
                                                            <p className="text-xs sm:text-sm text-gray-600">
                                                                {
                                                                    fase.waktu_fase
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                                                        {fase.deskripsi_fase}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 justify-end">
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={() =>
                                                            setEditingFase(
                                                                editingFase ===
                                                                    fase.id
                                                                    ? null
                                                                    : fase.id
                                                            )
                                                        }
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </motion.button>
                                                    {!fase.is_complete && (
                                                        <motion.button
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                            onClick={() =>
                                                                handleCompleteFase(
                                                                    fase.id
                                                                )
                                                            }
                                                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2"
                                                        >
                                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            <span className="text-xs sm:text-sm">
                                                                Selesai
                                                            </span>
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tasks Grid */}
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
                                                {[1, 2, 3, 4].map(
                                                    (tugasNum) => {
                                                        const tugasKey =
                                                            `tugas_${tugasNum}` as keyof FaseImunisasi;
                                                        const statusKey =
                                                            `tugas_${tugasNum}_status` as keyof FaseImunisasi;
                                                        const deskripsiKey =
                                                            `deskripsi_tugas_${tugasNum}` as keyof FaseImunisasi;
                                                        const tanggalKey =
                                                            `tugas_${tugasNum}_tanggal` as keyof FaseImunisasi;

                                                        if (!fase[tugasKey])
                                                            return null;

                                                        return (
                                                            <div
                                                                key={tugasNum}
                                                                className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100"
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div
                                                                        className={`p-1.5 sm:p-2 rounded-full ${
                                                                            (fase[
                                                                                statusKey
                                                                            ] as string) ===
                                                                            "sudah"
                                                                                ? "bg-green-100"
                                                                                : "bg-gray-100"
                                                                        }`}
                                                                    >
                                                                        <CheckCircle
                                                                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                                                (fase[
                                                                                    statusKey
                                                                                ] as string) ===
                                                                                "sudah"
                                                                                    ? "text-green-600"
                                                                                    : "text-gray-400"
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1 break-words">
                                                                            {
                                                                                fase[
                                                                                    tugasKey
                                                                                ] as string
                                                                            }
                                                                        </h4>
                                                                        <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">
                                                                            {
                                                                                fase[
                                                                                    deskripsiKey
                                                                                ] as string
                                                                            }
                                                                        </p>
                                                                        {(fase[
                                                                            statusKey
                                                                        ] as string) ===
                                                                            "sudah" &&
                                                                            fase[
                                                                                tanggalKey
                                                                            ] && (
                                                                                <span className="text-xs text-gray-500">
                                                                                    Selesai:{" "}
                                                                                    {new Date(
                                                                                        fase[
                                                                                            tanggalKey
                                                                                        ] as string
                                                                                    ).toLocaleDateString(
                                                                                        "id-ID"
                                                                                    )}
                                                                                </span>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>

                                            {/* Edit Form */}
                                            <AnimatePresence>
                                                {editingFase === fase.id && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            height: "auto",
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            height: 0,
                                                        }}
                                                        className="mt-6 space-y-4 sm:space-y-6 bg-blue-50 rounded-xl p-4 sm:p-6"
                                                    >
                                                        {/* Tugas 1-4 */}
                                                        {[1, 2, 3, 4].map(
                                                            (tugasNum) => {
                                                                const tugasKey =
                                                                    `tugas_${tugasNum}` as keyof FaseImunisasi;
                                                                const deskripsiKey =
                                                                    `deskripsi_tugas_${tugasNum}` as keyof FaseImunisasi;
                                                                const statusKey =
                                                                    `tugas_${tugasNum}_status` as keyof FaseImunisasi;
                                                                const tanggalKey =
                                                                    `tugas_${tugasNum}_tanggal` as keyof FaseImunisasi;
                                                                const catatanKey =
                                                                    `tugas_${tugasNum}_catatan` as keyof FaseImunisasi;

                                                                if (
                                                                    !fase[
                                                                        tugasKey
                                                                    ]
                                                                )
                                                                    return null;

                                                                return (
                                                                    <div
                                                                        key={
                                                                            tugasNum
                                                                        }
                                                                        className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200"
                                                                    >
                                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                                                            <span className="font-semibold text-sm sm:text-base text-gray-800">
                                                                                Tugas{" "}
                                                                                {
                                                                                    tugasNum
                                                                                }

                                                                                :
                                                                            </span>
                                                                            <span className="text-sm sm:text-base text-gray-600 break-words">
                                                                                {
                                                                                    fase[
                                                                                        tugasKey
                                                                                    ] as string
                                                                                }
                                                                            </span>
                                                                        </div>

                                                                        <p className="text-xs sm:text-sm text-gray-600 mb-4 break-words">
                                                                            {
                                                                                fase[
                                                                                    deskripsiKey
                                                                                ] as string
                                                                            }
                                                                        </p>

                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                                            <div>
                                                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                                                    Status
                                                                                </label>
                                                                                <select
                                                                                    value={
                                                                                        localStatus[
                                                                                            `${fase.id}_${statusKey}`
                                                                                        ] !==
                                                                                        undefined
                                                                                            ? localStatus[
                                                                                                  `${fase.id}_${statusKey}`
                                                                                              ]
                                                                                            : (fase[
                                                                                                  statusKey
                                                                                              ] as string)
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleInputChange(
                                                                                            fase.id,
                                                                                            statusKey,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                >
                                                                                    <option value="belum">
                                                                                        Belum
                                                                                    </option>
                                                                                    <option value="sudah">
                                                                                        Sudah
                                                                                    </option>
                                                                                    <option value="ditunda">
                                                                                        Ditunda
                                                                                    </option>
                                                                                    <option value="dilewati">
                                                                                        Dilewati
                                                                                    </option>
                                                                                </select>
                                                                            </div>

                                                                            <div>
                                                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                                                    Tanggal
                                                                                </label>
                                                                                <input
                                                                                    type="date"
                                                                                    value={
                                                                                        localNotes[
                                                                                            `${fase.id}_${tanggalKey}`
                                                                                        ] !==
                                                                                        undefined
                                                                                            ? localNotes[
                                                                                                  `${fase.id}_${tanggalKey}`
                                                                                              ]
                                                                                            : (
                                                                                                  fase[
                                                                                                      tanggalKey
                                                                                                  ] as string
                                                                                              )?.split(
                                                                                                  "T"
                                                                                              )[0] ||
                                                                                              ""
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleInputChange(
                                                                                            fase.id,
                                                                                            tanggalKey,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    disabled={
                                                                                        localStatus[
                                                                                            `${fase.id}_${statusKey}`
                                                                                        ] !==
                                                                                            "sudah" &&
                                                                                        (fase[
                                                                                            statusKey
                                                                                        ] as string) !==
                                                                                            "sudah"
                                                                                    }
                                                                                    className={`w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                                                        localStatus[
                                                                                            `${fase.id}_${statusKey}`
                                                                                        ] !==
                                                                                            "sudah" &&
                                                                                        (fase[
                                                                                            statusKey
                                                                                        ] as string) !==
                                                                                            "sudah"
                                                                                            ? "bg-gray-100 cursor-not-allowed"
                                                                                            : ""
                                                                                    }`}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="mt-4">
                                                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                                                Catatan
                                                                            </label>
                                                                            <textarea
                                                                                value={
                                                                                    localNotes[
                                                                                        `${fase.id}_${catatanKey}`
                                                                                    ] !==
                                                                                    undefined
                                                                                        ? localNotes[
                                                                                              `${fase.id}_${catatanKey}`
                                                                                          ]
                                                                                        : (fase[
                                                                                              catatanKey
                                                                                          ] as string) ||
                                                                                          ""
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleInputChange(
                                                                                        fase.id,
                                                                                        catatanKey,
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                rows={
                                                                                    3
                                                                                }
                                                                                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                placeholder="Tambahkan catatan..."
                                                                            />
                                                                        </div>

                                                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                                                            <span
                                                                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border ${getStatusColor(
                                                                                    localStatus[
                                                                                        `${fase.id}_${statusKey}`
                                                                                    ] ||
                                                                                        (fase[
                                                                                            statusKey
                                                                                        ] as string)
                                                                                )}`}
                                                                            >
                                                                                {getStatusIcon(
                                                                                    localStatus[
                                                                                        `${fase.id}_${statusKey}`
                                                                                    ] ||
                                                                                        (fase[
                                                                                            statusKey
                                                                                        ] as string)
                                                                                )}
                                                                                <span className="ml-1 capitalize">
                                                                                    {localStatus[
                                                                                        `${fase.id}_${statusKey}`
                                                                                    ] ||
                                                                                        (fase[
                                                                                            statusKey
                                                                                        ] as string)}
                                                                                </span>
                                                                            </span>
                                                                            {(localStatus[
                                                                                `${fase.id}_${statusKey}`
                                                                            ] ===
                                                                                "sudah" ||
                                                                                (fase[
                                                                                    statusKey
                                                                                ] as string) ===
                                                                                    "sudah") &&
                                                                                (localNotes[
                                                                                    `${fase.id}_${tanggalKey}`
                                                                                ] ||
                                                                                    (fase[
                                                                                        tanggalKey
                                                                                    ] as string)) && (
                                                                                    <span className="text-xs sm:text-sm text-gray-600">
                                                                                        Tanggal:{" "}
                                                                                        {localNotes[
                                                                                            `${fase.id}_${tanggalKey}`
                                                                                        ] ||
                                                                                            (
                                                                                                fase[
                                                                                                    tanggalKey
                                                                                                ] as string
                                                                                            )?.split(
                                                                                                "T"
                                                                                            )[0]}
                                                                                    </span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                        {/* Catatan Fase */}
                                                        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200">
                                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                                                Catatan Fase
                                                            </label>
                                                            <textarea
                                                                value={
                                                                    localNotes[
                                                                        `${fase.id}_catatan_fase`
                                                                    ] !==
                                                                    undefined
                                                                        ? localNotes[
                                                                              `${fase.id}_catatan_fase`
                                                                          ]
                                                                        : fase.catatan_fase ||
                                                                          ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        fase.id,
                                                                        "catatan_fase",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                rows={3}
                                                                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                placeholder="Catatan umum untuk fase ini..."
                                                            />
                                                        </div>

                                                        <div className="mt-4 flex justify-end">
                                                            <motion.button
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                                onClick={() =>
                                                                    handleUpdateFase(
                                                                        fase.id
                                                                    )
                                                                }
                                                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
                                                            >
                                                                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                Simpan Perubahan
                                                            </motion.button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Status Badge */}
                                        {fase.is_complete && (
                                            <div className="absolute top-4 sm:top-7 right-4 sm:right-16">
                                                <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full border border-green-200">
                                                    Selesai
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Immunization Phases Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-blue-600" />
                            Fase Imunisasi Lengkap
                        </h2>
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                            {/* Timeline Items */}
                            <div className="space-y-8">
                                {[
                                    {
                                        title: "Fase 1: Hepatitis B",
                                        time: "0-7 hari",
                                        desc: "Mencegah infeksi virus hepatitis B yang dapat menyebabkan kerusakan hati",
                                        icon: <Shield className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 2: BCG & Polio 1",
                                        time: "1 bulan",
                                        desc: "BCG mencegah TBC, Polio mencegah kelumpuhan",
                                        icon: <Heart className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 3: DPT-HB-Hib 1 & Polio 2",
                                        time: "2 bulan",
                                        desc: "Kombinasi vaksin untuk mencegah difteri, pertusis, tetanus, hepatitis B, dan Hib",
                                        icon: <Shield className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 4: DPT-HB-Hib 2 & Polio 3",
                                        time: "3 bulan",
                                        desc: "Lanjutan vaksinasi untuk memperkuat kekebalan",
                                        icon: <Heart className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 5: DPT-HB-Hib 3 & Polio 4",
                                        time: "4 bulan",
                                        desc: "Dosis ketiga untuk memastikan kekebalan optimal",
                                        icon: <Shield className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 6: Campak",
                                        time: "9 bulan",
                                        desc: "Mencegah penyakit campak yang dapat menyebabkan komplikasi serius",
                                        icon: <Heart className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 7: DPT-HB-Hib & Campak",
                                        time: "18 bulan",
                                        desc: "Booster untuk memperkuat kekebalan yang sudah ada",
                                        icon: <Shield className="w-5 h-5" />,
                                    },
                                    {
                                        title: "Fase 8: DT & Campak",
                                        time: "5 tahun",
                                        desc: "Vaksinasi ulang untuk mempertahankan kekebalan",
                                        icon: <Heart className="w-5 h-5" />,
                                    },
                                ].map((phase, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-12"
                                    >
                                        <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                            {phase.icon}
                                        </div>
                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-gray-800">
                                                    {phase.title}
                                                </h3>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {phase.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {phase.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Edit Imunisasi Modal */}
                    <AnimatePresence>
                        {editingImunisasi && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                                onClick={() => setEditingImunisasi(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">
                                                Edit Program Imunisasi
                                            </h2>
                                            <button
                                                onClick={() =>
                                                    setEditingImunisasi(null)
                                                }
                                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tanggal Mulai
                                            </label>
                                            <input
                                                type="date"
                                                value={editForm.start_date}
                                                onChange={(e) =>
                                                    handleImunisasiInputChange(
                                                        "start_date",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_active"
                                                    checked={editForm.is_active}
                                                    onChange={(e) =>
                                                        handleImunisasiInputChange(
                                                            "is_active",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="is_active"
                                                    className="ml-2 block text-sm text-gray-700"
                                                >
                                                    Program Aktif
                                                </label>
                                            </div>

                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_completed"
                                                    checked={
                                                        editForm.is_completed
                                                    }
                                                    onChange={(e) =>
                                                        handleImunisasiInputChange(
                                                            "is_completed",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor="is_completed"
                                                    className="ml-2 block text-sm text-gray-700"
                                                >
                                                    Program Selesai
                                                </label>
                                            </div>
                                        </div>

                                        {editForm.is_completed && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tanggal Selesai
                                                </label>
                                                <input
                                                    type="date"
                                                    value={
                                                        editForm.completed_at
                                                    }
                                                    onChange={(e) =>
                                                        handleImunisasiInputChange(
                                                            "completed_at",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 p-4 flex justify-end gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setEditingImunisasi(null)
                                            }
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            Batal
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleUpdateImunisasi}
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Simpan Perubahan
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default ImunisasiDashboardView;
