import { useState, useEffect, useRef } from "react";
import {
    User,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Edit2,
    Save,
    X,
    CalendarDays,
    Quote,
    BookOpen,
    ChevronRight,
    Camera,
    Heart,
    Activity,
    Apple,
    Moon,
    Badge,
    CheckCircle,
    Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { error } from "console";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { usePage } from "@inertiajs/react";

interface NifasData {
    id: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

interface QuoteData {
    text: string;
    author: string;
}

interface PageProps {
    mustVerifyEmail: boolean;
    status?: string;
}

// Komponen utama Profile Page
export default function ProfilePage() {
    const { mustVerifyEmail, status } = usePage().props as unknown as {
        mustVerifyEmail: boolean;
        status?: string;
    };
    // State untuk data user dan data nifas
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone_number: "",
        birth_date: "",
        address: "",
        profile_picture: "/api/placeholder/200/200",
    });

    const [nifas, setNifas] = useState<NifasData | null>(null);
    const [isEditingNifas, setIsEditingNifas] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quotes, setQuotes] = useState<QuoteData[]>([]);
    const [currentQuote, setCurrentQuote] = useState<QuoteData>({
        text: "",
        author: "",
    });
    const [loading, setLoading] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [completedKFsCount, setCompletedKFsCount] = useState<number>(0);
    const [tipsData, setTipsData] = useState([
        {
            title: "Istirahat yang Cukup",
            description:
                "Usahakan tidur saat bayi tidur. Istirahat yang cukup membantu pemulihan lebih cepat.",
            icon: <Moon />,
            color: "from-blue-400 to-indigo-500",
        },
        {
            title: "Nutrisi Seimbang",
            description:
                "Konsumsi makanan bergizi tinggi protein, kalsium, dan zat besi untuk mempercepat pemulihan.",
            icon: <Apple />,
            color: "from-green-400 to-emerald-500",
        },
        {
            title: "Perawatan Payudara",
            description:
                "Jaga kebersihan payudara dan gunakan teknik menyusui yang benar untuk mencegah mastitis.",
            icon: <Heart />,
            color: "from-pink-400 to-rose-500",
        },
        {
            title: "Mobilisasi Bertahap",
            description:
                "Mulai dengan gerak ringan dan tingkatkan secara bertahap untuk membantu pemulihan.",
            icon: <Activity />,
            color: "from-purple-400 to-violet-500",
        },
    ]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    // Add this function near the top of the component, after the state declarations
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };

    // Mendapatkan data user dan nifas saat komponen dimuat
    useEffect(() => {
        // Simulasi fetch data user
        fetch("/api/user/current")
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            });

        // Fetch data nifas
        fetch("/api/nifas/user", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setNifas(data[0]);
                    setStartDate(formatDateForInput(data[0].start_date));
                    setEndDate(formatDateForInput(data[0].end_date));
                }
            })
            .catch((error) =>
                console.error("Error fetching nifas data:", error)
            );

        // Quotes tentang masa nifas
        const nifasQuotes = [
            {
                text: "Masa nifas adalah waktu untuk memberi kasih sayang pada diri sendiri sama seperti Anda memberikan kasih sayang pada bayi Anda.",
                author: "Bidan Sari",
            },
            {
                text: "Perawatan nifas yang baik adalah investasi untuk kesehatan Anda di masa depan.",
                author: "Dr. Amelia, Sp.OG",
            },
            {
                text: "Dalam masa nifas, kekuatan seorang ibu benar-benar teruji. Tetap semangat dan jaga kesehatan Anda.",
                author: "Dr. Farid, Sp.OG",
            },
            {
                text: "Istirahat yang cukup selama masa nifas tidak hanya baik untuk Anda, tetapi juga untuk bayi Anda.",
                author: "Ahli Gizi Ratna",
            },
            {
                text: "Masa nifas adalah perjalanan penyembuhan yang membutuhkan kesabaran dan perhatian khusus.",
                author: "Bidan Melati",
            },
        ];

        setQuotes(nifasQuotes);
        setCurrentQuote(
            nifasQuotes[Math.floor(Math.random() * nifasQuotes.length)]
        );

        // Mengganti quote setiap 10 detik
        const quoteInterval = setInterval(() => {
            setCurrentQuote(
                nifasQuotes[Math.floor(Math.random() * nifasQuotes.length)]
            );
        }, 10000);

        return () => clearInterval(quoteInterval);
    }, []);

    useEffect(() => {
        fetch("/api/nifasprogress/user")
            .then((response) => response.json())
            .then((data) => {
                setCompletedKFsCount(data);
                console.log(data);
            });
    }, []);

    // Fungsi untuk menyimpan perubahan data nifas
    // Modify the saveNifasData function
    const saveNifasData = async (
        startDateParam: string,
        endDateParam: string
    ) => {
        try {
            const response = await fetch("/api/nifas/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                credentials: "include",
                body: JSON.stringify({
                    start_date: startDateParam,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setNifas(data);
                setIsEditingNifas(false);
                setStartDate(formatDateForInput(data.start_date));
                setEndDate(formatDateForInput(data.end_date));
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data nifas berhasil disimpan",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                const errorData = await response.json();
                console.error("API error:", errorData);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorData.error
                        ? JSON.stringify(errorData.error)
                        : "Terjadi kesalahan saat menyimpan data nifas",
                });
            }
        } catch (error) {
            console.error("Error saving nifas data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat menyimpan data nifas",
            });
        }
    };

    // Modify the updateNifasData function
    const updateNifasData = async () => {
        try {
            // Show loading indicator
            Swal.fire({
                title: "Menyimpan...",
                text: "Mohon tunggu sebentar",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch(`/api/nifas/user/${nifas?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                credentials: "include",
                body: JSON.stringify({
                    start_date: startDate,
                }),
            });

            // Close loading indicator
            Swal.close();

            // Always try to parse the response, even if it's an error
            let data;
            try {
                const textResponse = await response.text();
                data = textResponse ? JSON.parse(textResponse) : {};
            } catch (parseError) {
                console.error("Error parsing response:", parseError);
                data = {
                    message: "Terjadi kesalahan saat memproses respons server",
                };
            }

            if (response.ok) {
                if (data.start_date && data.end_date) {
                    setNifas({
                        id: data.id,
                        start_date: data.start_date,
                        end_date: data.end_date,
                        is_active: data.is_active,
                    });
                    setStartDate(formatDateForInput(data.start_date));
                    setEndDate(formatDateForInput(data.end_date));
                    setIsEditingNifas(false);
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: data.message || "Data nifas berhasil diubah",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } else {
                // Handle validation errors
                if (response.status === 422) {
                    const errorMessage = data.error
                        ? Object.values(data.error).join("\n")
                        : "Terjadi kesalahan validasi";
                    Swal.fire({
                        icon: "error",
                        title: "Validasi Error",
                        text: errorMessage,
                    });
                } else {
                    // Handle other errors
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text:
                            data.message ||
                            "Terjadi kesalahan saat mengupdate data nifas",
                    });
                }
            }
        } catch (error) {
            console.error("Error updating nifas data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat mengupdate data nifas",
            });
        }
    };

    // Menghitung hari nifas yang telah berlalu
    const calculateDaysElapsed = () => {
        if (!nifas?.start_date) return 0;

        const start = new Date(nifas.start_date).getTime();
        const today = new Date().getTime();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    // Menghitung hari tersisa masa nifas (standar 40 hari)
    const calculateDaysRemaining = () => {
        if (!nifas?.start_date) return 42;

        const totalDays = 42;
        const elapsedDays = calculateDaysElapsed();
        return Math.max(0, totalDays - elapsedDays);
    };

    // Animasi Flame untuk border foto profil

    const BorderEffect = ({
        completedKFsCount,
    }: {
        completedKFsCount: number;
    }) => {
        if (completedKFsCount === 0) {
            return null; // Return nothing for count 0
        }

        // Define different gradient colors for each count
        const gradients = {
            1: "bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500",
            2: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
            3: "bg-gradient-to-r from-green-500 via-teal-400 to-emerald-500",
            4: "bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600",
        };

        // Define different animation durations for each count
        const durations = {
            1: 8,
            2: 6,
            3: 4,
            4: 2,
        };

        return (
            <motion.div
                className={`absolute w-56 h-56 rounded-full ${
                    gradients[completedKFsCount as keyof typeof gradients]
                } blur-md`}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        );
    };

    const ModernAchievementBadge = ({ count }: { count: number }) => {
        if (count === 0) return null;

        // Badge color based on achievement count
        const [badgeColors, setBadgeColors] = useState({
            from: "from-green-400",
            via: "via-green-500",
            to: "to-green-600",
        });

        useEffect(() => {
            // Adjust colors based on count levels
            if (count > 10) {
                setBadgeColors({
                    from: "from-blue-500",
                    via: "via-blue-600",
                    to: "to-blue-700",
                });
            }
            if (count > 20) {
                setBadgeColors({
                    from: "from-blue-600",
                    via: "via-blue-700",
                    to: "to-blue-800",
                });
            }
        }, [count]);

        return (
            <motion.div
                className="relative mt-6 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Main Badge Container */}
                <motion.div
                    className={`relative z-10 flex items-center px-2 py-3 rounded-xl 
                         bg-gradient-to-br ${badgeColors.from} ${badgeColors.via} ${badgeColors.to} 
                         text-white font-medium shadow-lg overflow-hidden
                         border border-white/20`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    {/* Icon with subtle pulse */}
                    <div className="relative mr-3 z-20">
                        <motion.div
                            className="absolute inset-0 bg-white/30 rounded-full blur-md"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <Award className="w-6 h-6 text-white relative z-10" />
                    </div>

                    <div className="flex flex-col z-20">
                        <div className="flex items-center">
                            <span className="text-sm">
                                Telah Menyelesaikan{" "}
                            </span>
                            <span className="text-sm mx-1 font-bold">
                                {count}
                            </span>
                            <span className="text-sm">Kunjungan KF</span>
                        </div>
                    </div>

                    {/* Checkmark icon */}
                    <CheckCircle className="w-5 h-5 text-white ml-2 z-20" />

                    {/* Enhanced Light Sweep Effect - Primary */}
                    <motion.div
                        className="absolute top-0 -right-40 w-40 h-full transform rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{
                            right: ["-40%", "100%"],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                        }}
                        style={{ zIndex: 0 }}
                    />

                    {/* Secondary Light Sweep - Thinner and faster */}
                    <motion.div
                        className="absolute top-0 -right-20 w-20 h-full transform rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                            right: ["-20%", "100%"],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                        style={{ zIndex: 0 }}
                    />

                    {/* Top Edge Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-white/30 to-white/10" />
                </motion.div>

                {/* Subtle Glow Effect */}
                <motion.div
                    className="absolute inset-0 bg-blue-300 rounded-xl blur-md -z-10"
                    animate={{
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Glass reflection overlay */}
                <motion.div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{ zIndex: 11, pointerEvents: "none" }}
                >
                    {/* Top edge reflective highlight */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />

                    {/* Bottom subtle reflection */}
                    <div className="absolute bottom-0 left-5 right-5 h-1 bg-gradient-to-t from-white/5 to-transparent" />

                    {/* Small circular highlight */}
                    <motion.div
                        className="absolute w-3 h-3 bg-white/40 rounded-full blur-sm"
                        animate={{
                            top: ["20%", "60%"],
                            left: ["30%", "70%"],
                            opacity: [0.4, 0.2, 0.4],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </motion.div>
        );
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setShowImageModal(true);
        }
    };

    const handleSaveImage = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append("profile_picture", selectedImage);

        try {
            const response = await fetch("/api/user/update-profile-picture", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                    Accept: "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUser((prev) => ({
                    ...prev,
                    profile_picture: data.profile_picture,
                }));
                setShowImageModal(false);
                setSelectedImage(null);
                setPreviewUrl("");
            } else {
                console.error("Failed to upload profile picture");

                console.error(response);
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <motion.div
                            className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
                            // create animate but not
                            animate={{}}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </div>
                ) : (
                    <div className="container mx-auto px-4 py-8">
                        {/* Header */}

                        {/* Main Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Profile Card */}
                            <motion.div
                                className="bg-white rounded-lg shadow-lg overflow-hidden md:col-span-1"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="p-6 flex flex-col items-center">
                                    {/* Profile Picture with Upload Button */}
                                    <div className="relative flex items-center justify-center w-64 h-64 group">
                                        <BorderEffect
                                            completedKFsCount={
                                                completedKFsCount
                                            }
                                        />

                                        {/* Main profile container */}
                                        <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white">
                                            <img
                                                src={user.profile_picture}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                                onClick={handleImageClick}
                                            >
                                                <Camera className="text-white w-8 h-8" />
                                            </div>
                                        </div>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <h2 className="text-2xl font-bold text-blue-800 mb-2">
                                        {user.name}
                                    </h2>
                                    {/* tambahkan badge level berdasarkan jumlah kunjungan KF */}
                                    <ModernAchievementBadge
                                        count={completedKFsCount}
                                    />

                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="max-w-xl"
                                        />
                                    </div>

                                    <div className="w-full space-y-3 mt-4">
                                        <div className="flex items-center">
                                            <Mail
                                                className="text-blue-600 mr-2 flex-shrink-0"
                                                size={18}
                                            />
                                            <p className="text-gray-700 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="flex items-center">
                                            <Phone
                                                className="text-blue-600 mr-2 flex-shrink-0"
                                                size={18}
                                            />
                                            <p className="text-gray-700">
                                                {user.phone_number}
                                            </p>
                                        </div>

                                        <div className="flex items-center">
                                            <Calendar
                                                className="text-blue-600 mr-2 flex-shrink-0"
                                                size={18}
                                            />
                                            <p className="text-gray-700">
                                                {new Date(
                                                    user.birth_date
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div className="flex items-start">
                                            <MapPin
                                                className="text-blue-600 mr-2 flex-shrink-0 mt-1"
                                                size={18}
                                            />
                                            <p className="text-gray-700">
                                                {user.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Nifas Data and Quote */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Nifas Status Card */}
                                <motion.div
                                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-semibold text-blue-700">
                                                Data Masa Nifas
                                            </h3>
                                            {nifas && !isEditingNifas && (
                                                <button
                                                    onClick={() =>
                                                        setIsEditingNifas(true)
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                                                >
                                                    <Edit2
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                    Edit
                                                </button>
                                            )}
                                        </div>

                                        {nifas ? (
                                            <div>
                                                <AnimatePresence mode="wait">
                                                    {isEditingNifas ? (
                                                        <motion.div
                                                            key="editing"
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                            className="space-y-4"
                                                        >
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Tanggal
                                                                        Mulai
                                                                        Nifas
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        value={
                                                                            startDate
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setStartDate(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Tanggal
                                                                        Selesai
                                                                        Nifas
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        value={
                                                                            endDate
                                                                        }
                                                                        disabled
                                                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                                                    />
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        Tanggal
                                                                        selesai
                                                                        akan
                                                                        dihitung
                                                                        otomatis
                                                                        (40 hari
                                                                        setelah
                                                                        tanggal
                                                                        mulai)
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() =>
                                                                        setIsEditingNifas(
                                                                            false
                                                                        )
                                                                    }
                                                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                                                                >
                                                                    <X
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="mr-1"
                                                                    />
                                                                    Batal
                                                                </button>
                                                                <button
                                                                    onClick={
                                                                        updateNifasData
                                                                    }
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                                                                >
                                                                    <Save
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="mr-1"
                                                                    />
                                                                    Simpan
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="viewing"
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                            }}
                                                        >
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">
                                                                        Tanggal
                                                                        Mulai
                                                                        Nifas
                                                                    </p>
                                                                    <div className="flex items-center mt-1">
                                                                        <CalendarDays
                                                                            className="text-blue-600 mr-2"
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                        <p className="text-lg font-semibold">
                                                                            {new Date(
                                                                                nifas.start_date
                                                                            ).toLocaleDateString(
                                                                                "id-ID",
                                                                                {
                                                                                    day: "numeric",
                                                                                    month: "long",
                                                                                    year: "numeric",
                                                                                }
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <p className="text-sm text-gray-500">
                                                                        Perkiraan
                                                                        Selesai
                                                                        Nifas
                                                                    </p>
                                                                    <div className="flex items-center mt-1">
                                                                        <CalendarDays
                                                                            className="text-blue-600 mr-2"
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                        <p className="text-lg font-semibold">
                                                                            {nifas.end_date
                                                                                ? new Date(
                                                                                      nifas.end_date
                                                                                  ).toLocaleDateString(
                                                                                      "id-ID",
                                                                                      {
                                                                                          day: "numeric",
                                                                                          month: "long",
                                                                                          year: "numeric",
                                                                                      }
                                                                                  )
                                                                                : new Date(
                                                                                      new Date(
                                                                                          nifas.start_date
                                                                                      ).getTime() +
                                                                                          40 *
                                                                                              24 *
                                                                                              60 *
                                                                                              60 *
                                                                                              1000
                                                                                  ).toLocaleDateString(
                                                                                      "id-ID",
                                                                                      {
                                                                                          day: "numeric",
                                                                                          month: "long",
                                                                                          year: "numeric",
                                                                                      }
                                                                                  )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-6">
                                                                <div className="flex justify-between mb-2">
                                                                    <span className="text-gray-600">
                                                                        Proses
                                                                        Masa
                                                                        Nifas
                                                                    </span>
                                                                    <span className="text-blue-600 font-medium">
                                                                        {calculateDaysElapsed()}{" "}
                                                                        dari 42
                                                                        hari
                                                                    </span>
                                                                </div>
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                    <motion.div
                                                                        className="bg-blue-600 h-2.5 rounded-full"
                                                                        initial={{
                                                                            width: "0%",
                                                                        }}
                                                                        animate={{
                                                                            width: `${Math.min(
                                                                                100,
                                                                                (calculateDaysElapsed() /
                                                                                    40) *
                                                                                    100
                                                                            )}%`,
                                                                        }}
                                                                        transition={{
                                                                            duration: 1,
                                                                            delay: 0.5,
                                                                        }}
                                                                    />
                                                                </div>
                                                                <p className="mt-2 text-sm text-gray-500">
                                                                    {calculateDaysRemaining() >
                                                                    0
                                                                        ? `Masa nifas Anda akan berakhir dalam ${calculateDaysRemaining()} hari lagi`
                                                                        : "Masa nifas Anda telah selesai! Tetap jaga kesehatan Anda."}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <div className="text-center py-6">
                                                <p className="text-gray-500 mb-4">
                                                    Belum ada data masa nifas
                                                    yang tersimpan
                                                </p>
                                                <button
                                                    onClick={async () => {
                                                        const newStartDate =
                                                            new Date()
                                                                .toISOString()
                                                                .split("T")[0];
                                                        const newEndDate =
                                                            new Date(
                                                                Date.now() +
                                                                    40 *
                                                                        24 *
                                                                        60 *
                                                                        60 *
                                                                        1000
                                                            )
                                                                .toISOString()
                                                                .split("T")[0];

                                                        // Simpan tanggal baru ke state
                                                        setStartDate(
                                                            newStartDate
                                                        );
                                                        setEndDate(newEndDate);
                                                        setNifas({
                                                            id: 0,
                                                            start_date:
                                                                newStartDate,
                                                            end_date:
                                                                newEndDate,
                                                            is_active: true,
                                                        });

                                                        // Tunggu update state selesai
                                                        await new Promise(
                                                            (resolve) =>
                                                                setTimeout(
                                                                    resolve,
                                                                    100
                                                                )
                                                        );

                                                        // Panggil fungsi saveNifasData
                                                        saveNifasData(
                                                            newStartDate,
                                                            newEndDate
                                                        );
                                                    }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    Tambah Data Nifas Baru
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Quote Card */}
                                <motion.div
                                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-lg overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold flex items-center">
                                                <Quote
                                                    className="mr-2"
                                                    size={20}
                                                />
                                                Quote Inspirasi
                                            </h3>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentQuote.text}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="italic"
                                            >
                                                <p className="text-lg mb-2">
                                                    "{currentQuote.text}"
                                                </p>
                                                <p className="text-right text-blue-100">
                                                    - {currentQuote.author}
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-50"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Header with gradient */}
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-5 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <motion.div
                                                className="bg-white bg-opacity-20 p-2 rounded-lg mr-3"
                                                initial={{
                                                    rotate: -10,
                                                    scale: 0.9,
                                                }}
                                                animate={{
                                                    rotate: 0,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    delay: 0.3,
                                                    type: "spring",
                                                }}
                                            >
                                                <BookOpen
                                                    className="text-white"
                                                    size={22}
                                                />
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-white">
                                                Tips Masa Nifas
                                            </h3>
                                        </div>
                                        <motion.span
                                            className="text-xs bg-white bg-opacity-25 text-white px-3 py-1 rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Penting untuk Pemulihan
                                        </motion.span>
                                    </div>

                                    {/* Content area */}
                                    <div className="p-6">
                                        <motion.div
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {tipsData.map((tip, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-50"
                                                    variants={itemVariants}
                                                    whileHover={{
                                                        y: -5,
                                                        boxShadow:
                                                            "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
                                                    }}
                                                >
                                                    {/* Gradient strip at top */}
                                                    <div
                                                        className={`h-1.5 bg-gradient-to-r ${tip.color}`}
                                                    />

                                                    <div className="p-4">
                                                        <div className="flex items-start">
                                                            <motion.div
                                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mr-3 flex-shrink-0"
                                                                whileHover={{
                                                                    rotate: 15,
                                                                }}
                                                            >
                                                                {tip.icon}
                                                            </motion.div>

                                                            <div>
                                                                <h4 className="text-blue-700 font-medium mb-1">
                                                                    {tip.title}
                                                                </h4>
                                                                <p className="text-gray-600 text-sm">
                                                                    {
                                                                        tip.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        {/* See all tips button */}
                                        <motion.button
                                            className="mt-5 w-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-lg transition-colors group"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <span className="font-medium">
                                                Lihat Semua Tips
                                            </span>
                                            <ChevronRight
                                                size={18}
                                                className="ml-1 group-hover:translate-x-1 transition-transform"
                                            />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Image Preview Modal */}
                        <AnimatePresence>
                            {showImageModal && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                >
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.9 }}
                                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                                    >
                                        <h3 className="text-xl font-semibold text-blue-800 mb-4">
                                            Preview Profile Picture
                                        </h3>
                                        <div className="mb-4">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setShowImageModal(false);
                                                    setSelectedImage(null);
                                                    setPreviewUrl("");
                                                }}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveImage}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
