import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Calendar,
    Clock,
    Book,
    Video,
    CheckSquare,
    Edit,
    Bell,
    User,
    Menu,
} from "lucide-react";
import Guest from "@/Layouts/GuestLayout";
import NotesSection from "./Components/NotesSection";

type StatusType = "hamil" | "" | "error";
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birth_date: string;
    blood_type: string;
}

interface Kehamilan {
    id: number;
    user_id: number;
    user: User;
    last_periode_date: string;
    estimated_due_date: string;
    is_active: boolean;
    status: StatusType;
    delivered_date?: string | null;
    miscarriage_week?: number | null;
    is_nifas_complete?: boolean | null;
    notes?: string | null;
}

export default function MaternalDashboard() {
    const [activeTab, setActiveTab] = useState("trimester-2");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [kehamilan, setKehamilan] = useState<Kehamilan | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const user = usePage().props.auth.user as User | null;
    const userId = user?.id;

    // Fetch Data Kehamilan
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/kehamilan/user/${userId}`);
                const json = await res.json();

                if (json.kehamilan) {
                    setKehamilan(json.kehamilan);
                } else {
                    console.error("No pregnancy data found for this user.");
                }
            } catch (err) {
                console.error("Error fetching kehamilan data", err);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]); // <- tambahkan dependency agar userId bisa terdeteksi

    const calculateDaysRemaining = (): number | null => {
        if (!kehamilan?.estimated_due_date) return null;

        const today = new Date();
        const dueDate = new Date(kehamilan.estimated_due_date);
        const diffTime = Math.abs(dueDate.getTime() - today.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculatePregnancyWeek = (): number | null => {
        if (!kehamilan?.last_periode_date) return null;

        const today = new Date();
        const lastPeriod = new Date(kehamilan.last_periode_date);

        const diffTime = today.getTime() - lastPeriod.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24); // convert ms to days
        const weeks = Math.floor(diffDays / 7); // floor untuk minggu bulat

        return weeks;
    };

    const getTrimester = (): string | null => {
        if (!kehamilan?.last_periode_date) return null;

        const today = new Date();
        const lastPeriod = new Date(kehamilan.last_periode_date);
        const diffTime = today.getTime() - lastPeriod.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);

        if (weeks <= 12) {
            return "Trimester 1";
        } else if (weeks <= 27) {
            return "Trimester 2";
        } else {
            return "Trimester 3";
        }
    };

    const calculatePregnancyDay = (): number => {
        if (!kehamilan?.last_periode_date) return 0;
        const today = new Date();
        const lastPeriod = new Date(kehamilan.last_periode_date);
        const diffTime = today.getTime() - lastPeriod.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const pregnancyDay = calculatePregnancyDay();
    const completionPercentage = Math.min((pregnancyDay / 280) * 100, 100); // 280 hari

    return (
        <GuestLayout>
            <div className="bg-blue-50 min-h-screen">
                {/* Main Content */}
                <main className="container mx-auto p-4">
                    {/* Summary Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <div className="text-sm text-gray-500">
                                Usia Kehamilan
                            </div>
                            <div className="text-2xl font-bold">
                                {calculatePregnancyWeek()} minggu
                            </div>
                            <div className="text-blue-600">
                                {getTrimester()}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <div className="text-sm text-gray-500">
                                Perkiraan Persalinan
                            </div>
                            <div className="text-2xl font-bold">
                                {calculateDaysRemaining()} hari
                            </div>
                            <div className="text-blue-600">
                                {kehamilan?.estimated_due_date.split("T")[0]}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white p-6 rounded-xl shadow-lg col-span-1 md:col-span-2"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-md font-semibold text-gray-700 mb-2"
                            >
                                Progress Kehamilan
                            </motion.h3>

                            <div
                                className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {/* Progress Bar */}
                                <motion.div
                                    className="bg-blue-600 h-4 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${completionPercentage}%`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    }}
                                />

                                {/* Tooltip on progress */}
                                {isHovered && (
                                    <motion.div
                                        className="absolute -top-8 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow pointer-events-none"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            left: `calc(${completionPercentage}% - 20px)`, // center the tooltip
                                        }}
                                    >
                                        {completionPercentage.toFixed(1)}%
                                    </motion.div>
                                )}

                                {/* Trimester Markers */}
                                {[1, 2].map((trimester, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="absolute top-0 h-full w-[2px] bg-white/70"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.2 }}
                                        style={{
                                            left: `${
                                                ((trimester * 280) / 3 / 280) *
                                                100
                                            }%`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Hari ke-0</span>
                                <span>Hari ke-281</span>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-sm text-gray-600 mt-2"
                            >
                                Hari ke-{pregnancyDay} dari 280 (
                                {completionPercentage.toFixed(1)}%)
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Main Panel */}
                    {kehamilan && kehamilan.id && (
                        <NotesSection
                            kehamilan_id={kehamilan.id}
                        ></NotesSection>
                    )}
                </main>

                {/* Bottom Navigation (Mobile) */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
                    <div className="flex justify-around">
                        {[
                            { icon: <Calendar size={20} />, label: "Catatan" },
                            { icon: <Book size={20} />, label: "Trimester" },
                            { icon: <Video size={20} />, label: "Edukasi" },
                            {
                                icon: <CheckSquare size={20} />,
                                label: "Checklist",
                            },
                            { icon: <User size={20} />, label: "Profil" },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className="p-3 flex flex-col items-center justify-center"
                            >
                                {item.icon}
                                <span className="text-xs mt-1">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
