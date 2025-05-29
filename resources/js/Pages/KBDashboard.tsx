import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    Heart,
    Shield,
    Users,
    Clock,
    CheckCircle,
    Info,
    Baby,
    Stethoscope,
} from "lucide-react";
import NavbarAuth from "./Components/NavbarAuth";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

interface KBRecord {
    id: number;
    user_id: number;
    start_date: string;
    end_date: string | null;
    tipe_kb: string;
    catatan: string | null;
    status_kb: "aktif" | "tidak_aktif";
    created_at: string;
    updated_at: string;
}

const KBDashboard = () => {
    const [kbRecords, setKbRecords] = useState<KBRecord[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState<KBRecord | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        tipe_kb: "",
        catatan: "",
        status_kb: "aktif" as "aktif" | "tidak_aktif",
    });

    const kbTypes = [
        "Metode operasi wanita (MOW)/tubektomi, metode operasi pria (MOP)/ vasektomi",
        "Implan",
        "IUD",
        "Kontrasepsi suntik 3 bulan atau 1 bulan",
        "Pil KB",
        "Kondom",
    ];

    const kbTypeCategories = {
        "Jangka Panjang": [
            "Metode operasi wanita (MOW)/tubektomi, metode operasi pria (MOP)/ vasektomi",
            "Implan",
            "IUD",
        ],
        "Jangka Pendek": [
            "Kontrasepsi suntik 3 bulan atau 1 bulan",
            "Pil KB",
            "Kondom",
        ],
    };

    // Fetch KB records
    const fetchKBRecords = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get("/api/kb");
            setKbRecords(response.data.data);

            // Set default status based on existing records
            const hasActiveRecord = response.data.data.some(
                (record: KBRecord) => record.status_kb.toLowerCase() === "aktif"
            );
            if (!hasActiveRecord && !editingRecord) {
                setFormData((prev) => ({ ...prev, status_kb: "aktif" }));
            }
        } catch (err) {
            setError("Gagal mengambil data KB");
            console.error("Error fetching KB records:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchKBRecords();
    }, []);

    const handleSubmit = async () => {
        if (!formData.start_date || !formData.tipe_kb) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Harap isi tanggal mulai dan tipe KB",
            });
            return;
        }

        try {
            // Format dates to YYYY-MM-DD and ensure all required fields are present
            const formattedData = {
                start_date: formData.start_date.split("T")[0],
                end_date: formData.end_date
                    ? formData.end_date.split("T")[0]
                    : null,
                tipe_kb: formData.tipe_kb.trim(),
                catatan: formData.catatan || null,
                status_kb: formData.status_kb.toLowerCase(),
            };

            console.log("Submitting data:", formattedData);

            if (editingRecord) {
                // Update existing record
                const response = await axios.put(
                    `/api/kb/${editingRecord.id}`,
                    formattedData
                );
                await fetchKBRecords();
                console.log("Update response:", response.data);
            } else {
                // Create new record
                const response = await axios.post("/api/kb", formattedData);
                await fetchKBRecords();
                console.log("Create response:", response.data);
            }
            resetForm();

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: editingRecord
                    ? "Data KB berhasil diupdate!"
                    : "Data KB berhasil ditambahkan!",
            });
        } catch (err: any) {
            console.error("Error saving KB record:", err);
            if (err.response?.data?.errors) {
                console.log("Validation errors:", err.response.data.errors);
                const errorMessages = Object.entries(err.response.data.errors)
                    .map(
                        ([field, messages]) =>
                            `${field}: ${(messages as string[]).join(", ")}`
                    )
                    .join("\n");
                Swal.fire({
                    icon: "error",
                    title: "Gagal menyimpan data KB",
                    text: errorMessages,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Gagal menyimpan data KB",
                    text: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
                });
            }
        }
    };

    const handleEdit = (record: KBRecord) => {
        setEditingRecord(record);
        setFormData({
            start_date: record.start_date.split("T")[0],
            end_date: record.end_date ? record.end_date.split("T")[0] : "",
            tipe_kb: record.tipe_kb.trim(),
            catatan: record.catatan || "",
            status_kb: record.status_kb.toLowerCase() as
                | "aktif"
                | "tidak_aktif",
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Konfirmasi Hapus",
            text: "Apakah Anda yakin ingin menghapus data KB ini?",
            showCancelButton: true,
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#EF4444",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await axios.delete(`/api/kb/${id}`);
            setKbRecords((prev) => prev.filter((record) => record.id !== id));
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Data KB berhasil dihapus!",
            });
        } catch (err) {
            console.error("Error deleting KB record:", err);
            Swal.fire({
                icon: "error",
                title: "Gagal menghapus data KB",
                text: "Terjadi kesalahan saat menghapus data. Silakan coba lagi.",
            });
        }
    };

    const resetForm = () => {
        // Check if there's any active record before resetting
        const hasActiveRecord = kbRecords.some(
            (record) => record.status_kb.toLowerCase() === "aktif"
        );

        setFormData({
            start_date: "",
            end_date: "",
            tipe_kb: "",
            catatan: "",
            status_kb: hasActiveRecord ? "tidak_aktif" : "aktif",
        });
        setEditingRecord(null);
        setShowForm(false);
    };

    const getKBTypeCategory = (type: string) => {
        for (const [category, types] of Object.entries(kbTypeCategories)) {
            if (types.includes(type)) {
                return category;
            }
        }
        return "Lainnya";
    };

    const getStatusColor = (status: string) => {
        return status === "aktif"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200";
    };

    const activeRecord = kbRecords.find(
        (record) => record.status_kb === "aktif"
    );

    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Header */}
            <AuthenticatedLayout>
                <div className="container mx-auto px-6 p-8 min-h-screen">
                    {/* Educational Cards */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 mb-6 rounded-lg">
                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="text-white">
                                <motion.h2
                                    className="text-2xl font-bold"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Selamat Datang, Bunda {user?.name}
                                </motion.h2>
                                <motion.div
                                    className="flex items-center mt-2"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-blue-100">
                                        Selamat! Anda telah menyelesaikan masa
                                        nifas 42 hari. Mari kita mulai
                                        perencanaan keluarga yang sehat.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Educational Welcome Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 mb-6 rounded-lg border border-purple-100"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-600 p-3 rounded-full">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    Selamat Memasuki Fase KB!
                                </h3>
                                <div className="space-y-3 text-white">
                                    <p className="text-sm leading-relaxed">
                                        Setelah menyelesaikan masa nifas 42
                                        hari, ini adalah waktu yang tepat untuk
                                        memulai program Keluarga Berencana (KB).
                                        Program KB akan membantu Anda:
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                            <span>
                                                Mengatur jarak kehamilan yang
                                                sehat
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                            <span>
                                                Memberikan waktu pemulihan yang
                                                cukup untuk tubuh
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                            <span>
                                                Fokus merawat dan membesarkan
                                                bayi dengan optimal
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="bg-white/60 rounded-lg p-3 mt-3">
                                        <p className="text-xs text-purple-700">
                                            💡 Konsultasikan dengan tenaga
                                            kesehatan untuk memilih metode KB
                                            yang paling sesuai dengan kondisi
                                            Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-6 mb-8"
                    >
                        {/* Main KB Info Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-600 p-3 rounded-full">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        Tentang Keluarga Berencana
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        <strong>KELUARGA BERENCANA (KB)</strong>{" "}
                                        atau program keluarga berencana
                                        merupakan program yang biasanya
                                        diberikan kepada ibu pasca bersalin
                                        sampai 6 minggu / 42 hari sesudah
                                        melahirkan, pemilihan KB disesuaikan
                                        dengan kondisi ibu.
                                    </p>
                                    <div className="bg-white/60 rounded-lg p-3">
                                        <p className="text-xs text-gray-600">
                                            💡 Konsultasikan dengan tenaga
                                            kesehatan untuk memilih metode KB
                                            yang tepat sesuai kondisi Anda
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Card */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-600 p-3 rounded-full">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                                        Manfaat KB
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Mengatur jarak kehamilan minimal
                                                2 tahun
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Mengatur jumlah anak yang
                                                dilahirkan
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Mencegah dan meningkatkan
                                                kesehatan ibu dan bayi
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span>
                                                Memberi ibu waktu khusus untuk
                                                merawat bayinya
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Methods Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid md:grid-cols-2 gap-6 mb-8"
                    >
                        {/* Long-term Methods */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-purple-600 p-2 rounded-full">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Metode Kontrasepsi Jangka Panjang
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {kbTypeCategories["Jangka Panjang"].map(
                                    (method, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                                            <span>{method}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Short-term Methods */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-orange-600 p-2 rounded-full">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Metode Kontrasepsi Jangka Pendek
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {kbTypeCategories["Jangka Pendek"].map(
                                    (method, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                                            <span>{method}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Current Active KB Status */}
                    {activeRecord && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-600 p-2 rounded-full">
                                    <Stethoscope className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    KB Aktif Saat Ini
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Metode KB
                                    </label>
                                    <p className="text-gray-800 font-semibold">
                                        {activeRecord.tipe_kb}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Tanggal Mulai
                                    </label>
                                    <p className="text-gray-800 font-semibold">
                                        {new Date(
                                            activeRecord.start_date
                                        ).toLocaleDateString("id-ID")}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Kategori
                                    </label>
                                    <p className="text-gray-800 font-semibold">
                                        {getKBTypeCategory(
                                            activeRecord.tipe_kb
                                        )}
                                    </p>
                                </div>
                            </div>
                            {activeRecord.catatan && (
                                <div className="mt-4 p-3 bg-white/60 rounded-lg">
                                    <label className="text-sm font-medium text-gray-600">
                                        Catatan
                                    </label>
                                    <p className="text-gray-700 text-sm">
                                        {activeRecord.catatan}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* KB Records Management */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <Baby className="w-6 h-6 text-blue-600" />
                                Riwayat Program KB
                            </h2>
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah KB Baru
                            </button>
                        </div>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Memuat data...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-2 text-red-600">
                                    <Info className="w-5 h-5" />
                                    <p>{error}</p>
                                </div>
                                <button
                                    onClick={fetchKBRecords}
                                    className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                                >
                                    Coba lagi
                                </button>
                            </div>
                        )}

                        {/* Records List */}
                        {!isLoading && !error && (
                            <div className="space-y-8">
                                {/* Active KB Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Program KB Aktif
                                    </h3>
                                    <div className="space-y-4">
                                        {kbRecords.filter(
                                            (record) =>
                                                record.status_kb.toLowerCase() ===
                                                "aktif"
                                        ).length === 0 ? (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl">
                                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Info className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500">
                                                    Tidak ada program KB yang
                                                    aktif
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Tambahkan program KB baru
                                                </p>
                                            </div>
                                        ) : (
                                            kbRecords
                                                .filter(
                                                    (record) =>
                                                        record.status_kb.toLowerCase() ===
                                                        "aktif"
                                                )
                                                .map((record) => (
                                                    <motion.div
                                                        key={record.id}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        className="border border-green-200 bg-green-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="font-semibold text-gray-800">
                                                                        {
                                                                            record.tipe_kb
                                                                        }
                                                                    </h3>
                                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                                        Aktif
                                                                    </span>
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                        {getKBTypeCategory(
                                                                            record.tipe_kb
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                                    <div>
                                                                        <span className="font-medium">
                                                                            Mulai:
                                                                        </span>{" "}
                                                                        {new Date(
                                                                            record.start_date
                                                                        ).toLocaleDateString(
                                                                            "id-ID"
                                                                        )}
                                                                    </div>
                                                                    {record.end_date && (
                                                                        <div>
                                                                            <span className="font-medium">
                                                                                Selesai:
                                                                            </span>{" "}
                                                                            {new Date(
                                                                                record.end_date
                                                                            ).toLocaleDateString(
                                                                                "id-ID"
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {record.catatan && (
                                                                    <div className="bg-white/60 rounded-lg p-3 text-sm text-gray-700">
                                                                        <span className="font-medium">
                                                                            Catatan:
                                                                        </span>{" "}
                                                                        {
                                                                            record.catatan
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex gap-2 ml-4">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            record
                                                                        )
                                                                    }
                                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            record.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                        )}
                                    </div>
                                </div>

                                {/* Inactive KB Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        Riwayat Program KB
                                    </h3>
                                    <div className="space-y-4">
                                        {kbRecords.filter(
                                            (record) =>
                                                record.status_kb.toLowerCase() ===
                                                "tidak_aktif"
                                        ).length === 0 ? (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl">
                                                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Calendar className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500">
                                                    Belum ada riwayat KB
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Tambahkan program KB pertama
                                                    Anda
                                                </p>
                                            </div>
                                        ) : (
                                            kbRecords
                                                .filter(
                                                    (record) =>
                                                        record.status_kb.toLowerCase() ===
                                                        "tidak_aktif"
                                                )
                                                .map((record) => (
                                                    <motion.div
                                                        key={record.id}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <h3 className="font-semibold text-gray-800">
                                                                        {
                                                                            record.tipe_kb
                                                                        }
                                                                    </h3>
                                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                                        Tidak
                                                                        Aktif
                                                                    </span>
                                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                                        {getKBTypeCategory(
                                                                            record.tipe_kb
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                                                    <div>
                                                                        <span className="font-medium">
                                                                            Mulai:
                                                                        </span>{" "}
                                                                        {new Date(
                                                                            record.start_date
                                                                        ).toLocaleDateString(
                                                                            "id-ID"
                                                                        )}
                                                                    </div>
                                                                    {record.end_date && (
                                                                        <div>
                                                                            <span className="font-medium">
                                                                                Selesai:
                                                                            </span>{" "}
                                                                            {new Date(
                                                                                record.end_date
                                                                            ).toLocaleDateString(
                                                                                "id-ID"
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {record.catatan && (
                                                                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                                                                        <span className="font-medium">
                                                                            Catatan:
                                                                        </span>{" "}
                                                                        {
                                                                            record.catatan
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex gap-2 ml-4">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            record
                                                                        )
                                                                    }
                                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            record.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Modal Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    {editingRecord
                                        ? "Edit Program KB"
                                        : "Tambah Program KB Baru"}
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Mulai *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.start_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    start_date: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Selesai
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.end_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    end_date: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipe KB *
                                        </label>
                                        <select
                                            value={formData.tipe_kb}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    tipe_kb: e.target.value,
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">
                                                Pilih tipe KB
                                            </option>
                                            {Object.entries(
                                                kbTypeCategories
                                            ).map(([category, types]) => (
                                                <optgroup
                                                    key={category}
                                                    label={category}
                                                >
                                                    {types.map((type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status KB *
                                        </label>
                                        <select
                                            value={formData.status_kb}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status_kb: e.target
                                                        .value as
                                                        | "aktif"
                                                        | "tidak_aktif",
                                                })
                                            }
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="tidak_aktif">
                                                Tidak Aktif
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan
                                        </label>
                                        <textarea
                                            value={formData.catatan}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    catatan: e.target.value,
                                                })
                                            }
                                            rows={3}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tambahkan catatan tentang program KB ini..."
                                        />
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            {editingRecord
                                                ? "Update"
                                                : "Simpan"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </AuthenticatedLayout>
        </div>
    );
};

export default KBDashboard;
