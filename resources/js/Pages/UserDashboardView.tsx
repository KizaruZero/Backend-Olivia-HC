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
    Clipboard,
    Info,
} from "lucide-react";

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

    console.log(nifasTask);

    // Fungsi untuk menampilkan modal
    const handleKFClick = (kfId: number) => {
        setActiveKF(kfId);
        setShowModal(true);
    };

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

            console.log("Active KF:", activeKF);
            console.log("Nifas Tasks:", nifasTask);
            console.log("Found Nifas Progress ID:", nifasProgressId);

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

            console.log("Task Updates:", taskUpdates);

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

            // 6. Tampilkan notifikasi sukses (opsional)
            alert("Kunjungan berhasil diselesaikan!");

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error("Error completing KF:", error);
            alert("Terjadi kesalahan saat menyelesaikan kunjungan.");
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-bold mb-4">
                            {faseNifas[activeKF - 1].name}:{" "}
                            {faseNifas[activeKF - 1].description}
                        </h3>

                        <div className="mb-6">
                            <h4 className="font-medium mb-3">
                                Checklist Kunjungan:
                            </h4>
                            <div className="space-y-2">
                                {nifasTask
                                    .filter(
                                        (task) =>
                                            task.nifas_task.fase_nifas_id ===
                                            activeKF
                                    )
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center p-2 bg-gray-50 rounded"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    checkedTasks[task.id] ||
                                                    task.is_completed === 1
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        task.id,
                                                        e.target.checked
                                                    )
                                                }
                                                className="mr-3"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {task.nifas_task.name}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {
                                                        task.nifas_task
                                                            .description
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-medium mb-2">
                                Lokasi Kunjungan:
                            </h4>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={selectedPuskesmas}
                                onChange={(e) =>
                                    setSelectedPuskesmas(e.target.value)
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
                                <option value="Rumah Sakit">Rumah Sakit</option>
                                <option value="other">Lainnya</option>
                            </select>

                            {selectedPuskesmas === "other" && (
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                                    placeholder="Tulis nama puskesmas..."
                                    value={customPuskesmas}
                                    onChange={(e) =>
                                        setCustomPuskesmas(e.target.value)
                                    }
                                />
                            )}
                        </div>

                        <div className="mb-6">
                            <h4 className="font-medium mb-2">Catatan:</h4>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                rows={3}
                                placeholder="Tuliskan catatan tentang kondisi Anda..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={completeKF}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Selesaikan {faseNifas[activeKF - 1].name}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
