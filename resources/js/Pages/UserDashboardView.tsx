import { useEffect, useState } from "react";
import {
    Calendar,
    Bell,
    CheckCircle,
    Edit,
    User,
    Home,
    ChevronRight,
    Award,
    ClipboardList,
    Check,
    MapPin,
    FileText,
    X,
    Info,
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

interface FaseNifas {
    id: number;
    name: string;
    description: string;
    video_url: string;
    leaflet: string;
    article: string;
    progress: number;
}

interface Nifas {
    id: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

interface NifasProgress {
    nifas_id: number;
    fase_nifas_id: number;
    is_completed: boolean;
    completed_at: string;
    puskesmas: string;
    notes: string;
}

interface NifasTask {
    id: number;
    nifas_progress_id: number;
    nifas_progress: {
        puskesmas: string;
        notes: string;
    };
    nifas_task: {
        id: number;
        fase_nifas_id: number;
        name: string;
        description: string;
    };
    is_completed: boolean | number;
    completed_at: string;
}

export default function DashboardNifas() {
    const [activeKF, setActiveKF] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [completedKFs, setCompletedKFs] = useState<number[]>([]);
    const [nifas, setNifas] = useState<Nifas | null>(null);
    const [faseNifas, setFaseNifas] = useState<FaseNifas[]>([]);
    const [nifasTask, setNifasTask] = useState<NifasTask[]>([]);
    const [checkedTasks, setCheckedTasks] = useState<{
        [key: number]: boolean;
    }>({});
    const [selectedPuskesmas, setSelectedPuskesmas] = useState(
        "Puskesmas Sejahtera"
    );
    const [customPuskesmas, setCustomPuskesmas] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        fetch("/api/nifas/user", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setNifas(data[0]);
            });
    }, []);

    useEffect(() => {
        fetch("/api/nifastask/user")
            .then((response) => response.json())
            .then((data) => {
                setNifasTask(data);
            });
    }, []);

    // Fungsi untuk menampilkan modal

    const handleCheckboxChange = (taskId: number, checked: boolean) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [taskId]: checked,
        }));
    };

    // Fungsi untuk menyelesaikan KF
    const completeKF = async () => {
        try {
            const nifasProgressId = nifasTask.find(
                (task) => task.nifas_task.fase_nifas_id === activeKF
            )?.nifas_progress_id;

            if (!nifasProgressId) {
                throw new Error("Nifas Progress ID not found");
            }

            // Get CSRF token from meta tag
            const token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            // 1. Perbarui status KF (nifas_progress)
            const kfResponse = await fetch("/api/nifasprogress/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token || "",
                    Accept: "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    nifas_progress_id: nifasProgressId,
                    is_completed: 1,
                    puskesmas:
                        selectedPuskesmas === "other"
                            ? customPuskesmas
                            : selectedPuskesmas,
                    notes: notes,
                }),
            });

            if (!kfResponse.ok) {
                const errorData = await kfResponse.json();
                console.error("Server error response:", errorData);
                throw new Error("Gagal memperbarui status KF");
            }

            // 2. Perbarui status task yang dicentang
            const taskUpdates = Object.entries(checkedTasks)
                .filter(([_, checked]) => checked)
                .map(([taskId]) => parseInt(taskId));

            const tasksResponse = await fetch("/api/nifastasks/updatebatch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token || "",
                    Accept: "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    tasks: taskUpdates.map((taskId) => ({
                        id: taskId,
                        is_completed: 1,
                    })),
                }),
            });

            if (!tasksResponse.ok) {
                throw new Error("Gagal memperbarui status task");
            }

            // 3. Perbarui state lokal
            setNifasTask((prev) =>
                prev.map((task) => {
                    if (checkedTasks[task.id]) {
                        return {
                            ...task,
                            is_completed: 1,
                            completed_at: new Date().toISOString(),
                        };
                    }
                    return task;
                })
            );

            // 4. Tambahkan KF ke daftar yang sudah selesai
            if (!completedKFs.includes(activeKF)) {
                setCompletedKFs([...completedKFs, activeKF]);
            }

            // 5. Tutup modal
            setShowModal(false);

            // 6. Tampilkan notifikasi sukses (opsional) gunakan sweetalert
            await Swal.fire({
                icon: "success",
                title: "Kunjungan berhasil diselesaikan!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error("Error completing KF:", error);
            await Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan saat menyelesaikan kunjungan.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    useEffect(() => {
        fetch("/api/nifastask/percentage")
            .then((response) => response.json())
            .then((data) => {
                setFaseNifas(data);
            });
    }, []);

    // Add these helper functions at the top of the file, after the interfaces
    const calculateProgress = (startDate: string, endDate: string): number => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();

        const total = end.getTime() - start.getTime();
        const elapsed = today.getTime() - start.getTime();

        const progress = (elapsed / total) * 100;
        return Math.min(Math.max(progress, 0), 100); // Clamp between 0 and 100
    };

    const calculateDaysPassed = (startDate: string): number => {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateTotalDays = (startDate: string, endDate: string): number => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateNifasPhase = (startDate: string): number => {
        const start = new Date(startDate);
        const daysPassed = calculateDaysPassed(startDate);
        if (daysPassed <= 10) return 1;
        if (daysPassed <= 20) return 2;
        if (daysPassed <= 30) return 3;
        if (daysPassed <= 42) return 4;
        return 0;
    };

    const handleKFClick = (kfId: number) => {
        const nifasPhase = calculateNifasPhase(nifas?.start_date || "");
        setActiveKF(kfId);
        if (kfId <= nifasPhase) {
            setShowModal(true);
        } else {
            Swal.fire({
                icon: "error",
                title: "Fase nifas belum dimulai",
            });
        }
    };

    useEffect(() => {
        if (showModal) {
            // Ambil data dari salah satu task yang sesuai fase aktif
            const taskData = nifasTask.find(
                (task) => task.nifas_task.fase_nifas_id === activeKF
            );

            if (taskData) {
                setNotes(taskData.nifas_progress.notes || "");

                if (
                    taskData.nifas_progress.puskesmas ===
                        "Puskesmas Sejahtera" ||
                    taskData.nifas_progress.puskesmas === "Puskesmas Harapan" ||
                    taskData.nifas_progress.puskesmas === "Klinik Bidan" ||
                    taskData.nifas_progress.puskesmas === "Rumah Sakit"
                ) {
                    setSelectedPuskesmas(taskData.nifas_progress.puskesmas);
                    setCustomPuskesmas("");
                } else {
                    setSelectedPuskesmas("other");
                    setCustomPuskesmas(taskData.nifas_progress.puskesmas || "");
                }
            }
        }
    }, [showModal, activeKF, nifasTask]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-purple-700 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">BundaCare</h1>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-800">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center">
                            <div
                                className={`relative w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-lg font-bold ${
                                    completedKFs.length > 0
                                        ? "ring-2 ring-yellow-400 ring-offset-2"
                                        : ""
                                }`}
                            >
                                S
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4">
                {/* Welcome Section */}
                <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Selamat Datang, Bunda Sarah!
                            </h2>
                            <p className="text-gray-600">
                                Masa nifas dimulai:{" "}
                                {nifas?.start_date
                                    ? new Date(
                                          nifas.start_date
                                      ).toLocaleDateString("id-ID", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "-"}
                            </p>
                        </div>
                        {completedKFs.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <Award className="text-yellow-500" size={24} />
                                <span className="text-sm font-medium">
                                    {completedKFs.length} KF Selesai
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">
                            Progress Masa Nifas
                        </h3>
                        <span className="text-sm font-medium text-purple-700">
                            {nifas?.start_date
                                ? new Date(nifas.start_date).toLocaleDateString(
                                      "id-ID",
                                      {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      }
                                  )
                                : "-"}{" "}
                            -{" "}
                            {nifas?.end_date
                                ? new Date(nifas.end_date).toLocaleDateString(
                                      "id-ID",
                                      {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      }
                                  )
                                : "-"}
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6 relative group">
                        <div
                            className="bg-purple-600 h-4 rounded-full transition-all duration-300"
                            style={{
                                width: nifas
                                    ? `${calculateProgress(
                                          nifas.start_date,
                                          nifas.end_date
                                      )}%`
                                    : "0%",
                            }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {nifas
                                ? `${Math.round(
                                      calculateProgress(
                                          nifas.start_date,
                                          nifas.end_date
                                      )
                                  )}%`
                                : "0%"}{" "}
                            Selesai
                        </div>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>
                            Hari ke-
                            {nifas ? calculateDaysPassed(nifas.start_date) : 0}
                        </span>
                        <span>
                            Total{" "}
                            {nifas
                                ? calculateTotalDays(
                                      nifas.start_date,
                                      nifas.end_date
                                  )
                                : 0}{" "}
                            hari
                        </span>
                    </div>
                </div>

                {/* Reminders */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Pengingat
                    </h3>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Bell className="text-yellow-500" size={20} />
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-yellow-800">
                                    Kunjungan KF 2
                                </h4>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Jangan lupa jadwal kunjungan KF 2 pada
                                    tanggal 9 Mei 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KF Progress Cards */}
                <h3 className="text-lg font-medium text-gray-800 mb-4 mt-4">
                    Kunjungan Nifas
                </h3>
                {/* jika progress fase nifas belum mencapai maka card tidak bisa di klik , misal saat ini fase 1 belum selesai maka card fase 2 tidak bisa di klik */}
                <div className="grid gap-4 mb-6">
                    {faseNifas.map((kf) => (
                        <div
                            key={kf.id}
                            onClick={() => handleKFClick(kf.id)}
                            className={`bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all hover:shadow-lg ${
                                nifasTask.find(
                                    (task) =>
                                        task.nifas_task.fase_nifas_id === kf.id
                                )?.is_completed
                                    ? "border-l-4 border-green-500"
                                    : ""
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    {nifasTask.find(
                                        (task) =>
                                            task.nifas_task.fase_nifas_id ===
                                            kf.id
                                    )?.is_completed ? (
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle
                                                className="text-green-500"
                                                size={20}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                            <Calendar
                                                className="text-purple-500"
                                                size={20}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium text-gray-800">
                                            {kf.name}
                                        </h4>

                                        <p className="text-sm text-gray-500">
                                            {kf.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-16 text-right">
                                        <span className="text-sm font-medium">
                                            {kf.progress}%
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={18}
                                        className="text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Progress Bar for each KF */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                    className={`h-2 rounded-full ${
                                        kf.progress === 100
                                            ? "bg-green-500"
                                            : "bg-purple-600"
                                    }`}
                                    style={{ width: `${kf.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal untuk detail KF dan checklist */}
            {showModal && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop with blur effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-blue-500/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowModal(false)}
                    />

                    {/* Modal Container - Wider for desktop */}
                    <motion.div
                        className="bg-white rounded-2xl w-full max-w-4xl relative overflow-hidden shadow-2xl"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                    >
                        {/* Decorative curved shape at top */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-b-[50%] -translate-y-1/2" />

                        {/* Modal Content */}
                        <div className="relative z-10 p-6">
                            {/* Header - Top Section */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <motion.h3
                                        className="text-2xl font-bold text-blue-900"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {faseNifas[activeKF - 1].name}
                                    </motion.h3>
                                    <motion.p
                                        className="text-blue-600"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        {faseNifas[activeKF - 1].description}
                                    </motion.p>
                                </div>

                                {/* Close button */}
                                <motion.button
                                    onClick={() => setShowModal(false)}
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                    whileHover={{ rotate: 90 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                    }}
                                >
                                    <X size={16} />
                                </motion.button>
                            </div>

                            {/* Progress indicator - Below header */}
                            <motion.div
                                className="flex justify-between mb-8 relative"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Line connecting dots */}
                                <div className="absolute h-0.5 bg-gray-200 top-4 left-4 right-4 -z-10" />

                                {faseNifas.map((fase) => (
                                    <div
                                        key={fase.id}
                                        className="flex flex-col items-center relative"
                                    >
                                        <motion.div
                                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                                fase.id < activeKF
                                                    ? "bg-green-500 text-white"
                                                    : fase.id === activeKF
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {fase.id < activeKF ? (
                                                <Check size={16} />
                                            ) : (
                                                fase.id
                                            )}
                                        </motion.div>
                                        <span
                                            className={`text-xs mt-1 font-medium ${
                                                fase.id === activeKF
                                                    ? "text-blue-600"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {fase.name}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Main Content - Horizontal Layout */}
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Left Column - Checklist (60% width) */}
                                <motion.div
                                    className="lg:w-3/5 bg-blue-50 rounded-xl p-4 shadow-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-3 text-blue-800">
                                        <ClipboardList size={18} />
                                        <h4 className="font-semibold">
                                            Checklist Kunjungan
                                        </h4>
                                    </div>

                                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                        {nifasTask
                                            .filter(
                                                (task) =>
                                                    task.nifas_task
                                                        .fase_nifas_id ===
                                                    activeKF
                                            )
                                            .map((task) => (
                                                <motion.div
                                                    key={task.id}
                                                    className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-blue-400"
                                                    whileHover={{ x: 5 }}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            0.4 + task.id * 0.1,
                                                    }}
                                                >
                                                    <div className="relative pt-0.5">
                                                        <input
                                                            type="checkbox"
                                                            id={`task-${task.id}`}
                                                            checked={
                                                                checkedTasks[
                                                                    task.id
                                                                ] ||
                                                                task.is_completed ===
                                                                    1
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    task.id,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                            className="opacity-0 absolute h-5 w-5 cursor-pointer"
                                                        />
                                                        <div
                                                            className={`h-5 w-5 rounded border ${
                                                                checkedTasks[
                                                                    task.id
                                                                ] ||
                                                                task.is_completed ===
                                                                    1
                                                                    ? "bg-blue-600 border-blue-600"
                                                                    : "border-gray-300"
                                                            } flex items-center justify-center transition-colors duration-200`}
                                                        >
                                                            {(checkedTasks[
                                                                task.id
                                                            ] ||
                                                                task.is_completed ===
                                                                    1) && (
                                                                <motion.div
                                                                    initial={{
                                                                        scale: 0,
                                                                    }}
                                                                    animate={{
                                                                        scale: 1,
                                                                    }}
                                                                    transition={{
                                                                        type: "spring",
                                                                        stiffness: 500,
                                                                    }}
                                                                >
                                                                    <Check
                                                                        size={
                                                                            14
                                                                        }
                                                                        className="text-white"
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label
                                                            htmlFor={`task-${task.id}`}
                                                            className={`font-medium cursor-pointer ${
                                                                checkedTasks[
                                                                    task.id
                                                                ] ||
                                                                task.is_completed ===
                                                                    1
                                                                    ? "text-gray-500 line-through"
                                                                    : "text-gray-800"
                                                            }`}
                                                        >
                                                            {
                                                                task.nifas_task
                                                                    .name
                                                            }
                                                        </label>
                                                        <span className="text-sm text-gray-500">
                                                            {
                                                                task.nifas_task
                                                                    .description
                                                            }
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </motion.div>

                                {/* Right Column - Location & Notes (40% width) */}
                                <div className="lg:w-2/5 space-y-6">
                                    {/* Location Section */}
                                    <motion.div
                                        className="bg-blue-50 rounded-xl p-4 shadow-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="flex items-center gap-2 mb-3 text-blue-800">
                                            <MapPin size={18} />
                                            <h4 className="font-semibold">
                                                Lokasi Kunjungan
                                            </h4>
                                        </div>

                                        <div className="relative">
                                            <select
                                                className="w-full p-3 pl-4 pr-10 bg-white border border-blue-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                                value={selectedPuskesmas}
                                                onChange={(e) =>
                                                    setSelectedPuskesmas(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Puskesmas Sejahtera">
                                                    Puskesmas Sejahtera
                                                </option>
                                                <option value="Puskesmas Harapan">
                                                    Puskesmas Harapan
                                                </option>
                                                <option value="Klinik Bidan">
                                                    Klinik Bidan
                                                </option>
                                                <option value="Rumah Sakit">
                                                    Rumah Sakit
                                                </option>
                                                <option value="other">
                                                    Lainnya
                                                </option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-blue-400">
                                                <ChevronRight
                                                    size={18}
                                                    className="rotate-90"
                                                />
                                            </div>
                                        </div>

                                        {selectedPuskesmas === "other" && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <input
                                                    type="text"
                                                    className="w-full mt-2 p-3 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                                    placeholder="Tulis nama puskesmas..."
                                                    value={customPuskesmas}
                                                    onChange={(e) =>
                                                        setCustomPuskesmas(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Notes Section */}
                                    <motion.div
                                        className="bg-blue-50 rounded-xl p-4 shadow-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="flex items-center gap-2 mb-3 text-blue-800">
                                            <FileText size={18} />
                                            <h4 className="font-semibold">
                                                Catatan
                                            </h4>
                                        </div>

                                        <textarea
                                            className="w-full p-3 bg-white border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition-all"
                                            rows={5}
                                            placeholder="Tuliskan catatan tentang kondisi Anda..."
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                        ></textarea>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Action Buttons - Bottom */}
                            <motion.div
                                className="flex justify-end space-x-3 mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2.5 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Tutup
                                </motion.button>
                                <motion.button
                                    onClick={completeKF}
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Selesaikan {faseNifas[activeKF - 1].name}
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
