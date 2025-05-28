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
    Baby,
    Heart,
    Shield,
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarAuth from "./Components/NavbarAuth";

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

    useEffect(() => {
        fetchData();
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
            <NavbarAuth />

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Imunisasi Management */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-blue-600" />
                            Program Imunisasi
                        </h2>
                    </div>

                    {/* Progress Overview */}
                    {selectedImunisasi && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Progress Keseluruhan
                                    </h3>
                                    <p className="text-gray-600">
                                        Dimulai: {selectedImunisasi.start_date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {completedFasesCount}/{totalFases}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Fase Selesai
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${progressPercentage}%`,
                                    }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                                />
                            </div>
                            <div className="text-center mt-2 text-sm text-gray-600">
                                {progressPercentage.toFixed(1)}% Complete
                            </div>
                        </div>
                    )}

                    {/* Imunisasi List */}
                    <div className="grid gap-4">
                        {imunisasiList && imunisasiList.length > 0 ? (
                            imunisasiList.map((imunisasi) => (
                                <motion.div
                                    key={imunisasi.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                        selectedImunisasi?.id === imunisasi.id
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 bg-white hover:border-blue-300"
                                    }`}
                                    onClick={() =>
                                        setSelectedImunisasi(imunisasi)
                                    }
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-3 h-3 rounded-full ${
                                                    imunisasi.is_active
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                }`}
                                            />
                                            <div>
                                                <h3 className="font-semibold">
                                                    Program Imunisasi
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Mulai:{" "}
                                                    {imunisasi.start_date} |
                                                    Status:{" "}
                                                    {imunisasi.is_completed
                                                        ? "Selesai"
                                                        : "Aktif"}
                                                </p>
                                            </div>
                                        </div>
                                        <Heart className="w-5 h-5 text-pink-500" />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Tidak ada data Imunisasi yang tersedia
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Fase Imunisasi */}
                {selectedImunisasi && faseImunisasiList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            Fase Pemulihan
                        </h2>

                        <div className="grid gap-6">
                            {getCurrentFases().map((fase, index) => (
                                <motion.div
                                    key={fase.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                                        fase.is_complete
                                            ? "ring-2 ring-green-500"
                                            : ""
                                    }`}
                                >
                                    <div
                                        className={`p-6 ${
                                            fase.is_complete
                                                ? "bg-green-50"
                                                : "bg-gradient-to-r from-blue-50 to-indigo-50"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            fase.is_complete
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}
                                                    >
                                                        {fase.waktu_fase}
                                                    </span>
                                                    {fase.is_complete && (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    {fase.nama_fase}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {fase.deskripsi_fase}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
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
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                {!fase.is_complete && (
                                                    <button
                                                        onClick={() =>
                                                            handleCompleteFase(
                                                                fase.id
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                        Complete
                                                    </button>
                                                )}
                                            </div>
                                        </div>

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
                                                    className="mt-6 space-y-6"
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

                                                            return (
                                                                <div
                                                                    key={
                                                                        tugasNum
                                                                    }
                                                                    className="bg-white p-4 rounded-xl border border-gray-200"
                                                                >
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <span className="font-semibold text-gray-800">
                                                                            Tugas{" "}
                                                                            {
                                                                                tugasNum
                                                                            }
                                                                            :
                                                                        </span>
                                                                        <span className="text-gray-600">
                                                                            {
                                                                                fase[
                                                                                    tugasKey
                                                                                ] as string
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <p className="text-sm text-gray-600 mb-4">
                                                                        {
                                                                            fase[
                                                                                deskripsiKey
                                                                            ] as string
                                                                        }
                                                                    </p>

                                                                    <div className="grid md:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                                                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                                                                    ${
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
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                            placeholder="Tambahkan catatan..."
                                                                        />
                                                                    </div>

                                                                    <div className="mt-3 flex items-center gap-2">
                                                                        <span
                                                                            className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
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
                                                                                <span className="text-sm text-gray-600">
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
                                                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Catatan Fase
                                                        </label>
                                                        <textarea
                                                            value={
                                                                localNotes[
                                                                    `${fase.id}_catatan_fase`
                                                                ] !== undefined
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
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="Catatan umum untuk fase ini..."
                                                        />
                                                    </div>

                                                    <div className="mt-4 flex justify-end">
                                                        <button
                                                            onClick={() =>
                                                                handleUpdateFase(
                                                                    fase.id
                                                                )
                                                            }
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                            Update
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ImunisasiDashboardView;
