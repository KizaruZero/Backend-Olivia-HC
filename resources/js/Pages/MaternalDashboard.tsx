import { motion } from "framer-motion";
import { useState } from "react";
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

export default function MaternalDashboard() {
    const [activeTab, setActiveTab] = useState("trimester-2");
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Data dummy untuk demo
    const userData = {
        name: "Ibu Anisa",
        pregnancyWeek: 24,
        trimester: 2,
        dueDate: new Date(2025, 7, 15), // 15 Agustus 2025
        completionPercentage: 72,
    };

    // Hitung selisih hari dengan due date
    const calculateDaysRemaining = () => {
        const today = new Date();
        const dueDate = userData.dueDate;
        const diffTime = Math.abs(dueDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="bg-blue-50 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-blue-600 text-2xl">
                            BundaSehat
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <span className="hidden md:block">
                                {userData.name}
                            </span>
                        </div>
                        <button className="md:hidden">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

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
                            {userData.pregnancyWeek} minggu
                        </div>
                        <div className="text-blue-600">
                            Trimester {userData.trimester}
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
                            {userData.dueDate.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2"
                    >
                        <div className="text-sm text-gray-500">
                            Progress Kehamilan
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-1">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                    width: `${userData.completionPercentage}%`,
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span>0 minggu</span>
                            <span>40 minggu</span>
                        </div>
                    </motion.div>
                </div>

                {/* Main Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar & Daily Notes */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-lg shadow p-4"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Calendar size={18} />
                                Catatan Harian
                            </h2>
                            <button className="text-blue-600">
                                <Edit size={18} />
                            </button>
                        </div>

                        {/* Calendar Placeholder - in a real app, use a proper calendar component */}
                        <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                                {["M", "S", "S", "R", "K", "J", "S"].map(
                                    (day, i) => (
                                        <div key={i} className="text-gray-500">
                                            {day}
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center">
                                {Array(35)
                                    .fill(null)
                                    .map((_, i) => {
                                        const dayNum = i - 3 + 1;
                                        const isToday =
                                            dayNum === new Date().getDate();
                                        const hasNote = [
                                            5, 12, 18, 24,
                                        ].includes(dayNum);

                                        return (
                                            <div
                                                key={i}
                                                className={`
                        h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm
                        ${
                            dayNum > 0 && dayNum <= 30
                                ? "cursor-pointer hover:bg-blue-100"
                                : "text-gray-300"
                        }
                        ${isToday ? "bg-blue-600 text-white" : ""}
                        ${hasNote && !isToday ? "border-2 border-blue-400" : ""}
                      `}
                                            >
                                                {dayNum > 0 && dayNum <= 30
                                                    ? dayNum
                                                    : ""}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Daily Notes Entry */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-1">
                                Catatan untuk hari ini
                            </label>
                            <textarea
                                className="w-full border rounded-lg p-3 h-24 text-sm"
                                placeholder="Tulis catatan harian Anda di sini..."
                            ></textarea>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">
                                Simpan Catatan
                            </button>
                            <button className="flex items-center justify-center border border-blue-600 text-blue-600 p-2 rounded-lg">
                                <Bell size={16} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Trimester Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-white rounded-lg shadow p-4"
                    >
                        <h2 className="text-lg font-semibold mb-4">
                            Informasi Trimester
                        </h2>

                        {/* Trimester Selector */}
                        <div className="flex mb-4 overflow-x-auto gap-2">
                            {[
                                "trimester-1",
                                "trimester-2",
                                "trimester-3",
                                "nifas",
                            ].map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                                        activeTab === tab
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {tab === "trimester-1" && "Trimester 1"}
                                    {tab === "trimester-2" && "Trimester 2"}
                                    {tab === "trimester-3" && "Trimester 3"}
                                    {tab === "nifas" && "Masa Nifas"}
                                </button>
                            ))}
                        </div>

                        {/* Trimester Content */}
                        <div className="mb-6">
                            <div className="text-center mb-6">
                                <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                    {/* Replace with actual baby development illustration */}
                                    <span className="text-blue-600 text-3xl">
                                        👶
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Minggu ke-24
                                </div>
                                <div className="font-medium">
                                    Sebesar buah pepaya
                                </div>
                            </div>

                            <h3 className="font-medium mb-2">
                                Perkembangan Minggu Ini
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Bayi Anda sudah mulai mendengar suara dari luar.
                                Kulitnya masih transparan dan tipis, namun sudah
                                mulai terbentuk lapisan lemak. Paru-paru sudah
                                mulai mengembangkan kemampuan untuk bernapas.
                            </p>

                            <h3 className="font-medium mb-2">
                                Checklist Trimester 2
                            </h3>
                            <div className="space-y-2">
                                {[
                                    "USG Trimester 2 (Anatomi)",
                                    "Pemeriksaan darah lengkap",
                                    "Pemeriksaan gula darah",
                                    "Konsumsi vitamin & nutrisi tambahan",
                                    "Persiapkan peralatan bayi",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`check-${i}`}
                                            className="rounded text-blue-600"
                                        />
                                        <label htmlFor={`check-${i}`}>
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Educational Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-white rounded-lg shadow p-4"
                    >
                        <h2 className="text-lg font-semibold mb-4">
                            Edukasi & Saran
                        </h2>

                        {/* Tabs for content type */}
                        <div className="flex border-b mb-4">
                            <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600">
                                Artikel
                            </button>
                            <button className="px-4 py-2 text-gray-500">
                                Video
                            </button>
                            <button className="px-4 py-2 text-gray-500">
                                Tips
                            </button>
                        </div>

                        {/* Article List */}
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Nutrisi Penting di Trimester 2",
                                    desc: "Mengetahui makanan yang dibutuhkan untuk perkembangan optimal janin",
                                    img: "nutrition.jpg",
                                    time: "5 menit",
                                },
                                {
                                    title: "Persiapan Menjelang Persalinan",
                                    desc: "Tips menyiapkan mental dan fisik menjelang proses persalinan",
                                    img: "preparation.jpg",
                                    time: "7 menit",
                                },
                                {
                                    title: "Mengatasi Nyeri Punggung saat Hamil",
                                    desc: "Panduan stretching dan posisi tidur untuk ibu hamil",
                                    img: "backpain.jpg",
                                    time: "4 menit",
                                },
                            ].map((article, i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg"
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-medium text-sm">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-2">
                                            {article.desc}
                                        </p>
                                        <div className="text-xs text-blue-600 mt-1">
                                            {article.time} membaca
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full text-center text-blue-600 text-sm py-2">
                                Lihat semua artikel
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Bottom Navigation (Mobile) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
                <div className="flex justify-around">
                    {[
                        { icon: <Calendar size={20} />, label: "Catatan" },
                        { icon: <Book size={20} />, label: "Trimester" },
                        { icon: <Video size={20} />, label: "Edukasi" },
                        { icon: <CheckSquare size={20} />, label: "Checklist" },
                        { icon: <User size={20} />, label: "Profil" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className="p-3 flex flex-col items-center justify-center"
                        >
                            {item.icon}
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
