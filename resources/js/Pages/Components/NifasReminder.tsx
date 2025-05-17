import React from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, ChevronRight, AlertCircle } from "lucide-react";

interface NifasReminderProps {
    currentPhase: number;
    nextPhase: number;
    reminderDate: string;
}

const NifasReminder: React.FC<NifasReminderProps> = ({
    currentPhase,
    nextPhase,
    reminderDate,
}) => {
    if (currentPhase >= 4) {
        return null; // Tidak menampilkan reminder jika sudah fase 4 atau selesai
    }

    // Calculate days remaining
    const calculateDaysRemaining = () => {
        const today = new Date();
        const reminder = new Date(reminderDate);
        const diffTime = Math.abs(reminder.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = calculateDaysRemaining();
    const isUrgent = daysRemaining <= 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`mb-6 rounded-xl overflow-hidden shadow-md ${
                isUrgent ? "border border-red-200" : "border border-blue-100"
            }`}
        >
            {/* Top gradient strip */}

            <div className="p-5 bg-white">
                <div className="flex items-start">
                    {/* Icon container */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className={`flex-shrink-0 p-3 rounded-full ${
                            isUrgent ? "bg-red-100" : "bg-blue-100"
                        }`}
                    >
                        {isUrgent ? (
                            <AlertCircle
                                className={
                                    isUrgent ? "text-red-500" : "text-blue-500"
                                }
                                size={22}
                            />
                        ) : (
                            <Bell
                                className={
                                    isUrgent ? "text-red-500" : "text-blue-500"
                                }
                                size={22}
                            />
                        )}
                    </motion.div>

                    {/* Reminder content */}
                    <div className="ml-4 flex-grow">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex justify-between items-start">
                                <h4
                                    className={`text-base font-semibold ${
                                        isUrgent
                                            ? "text-red-700"
                                            : "text-blue-700"
                                    }`}
                                >
                                    Kunjungan KF {nextPhase}
                                </h4>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className={`text-xs px-2 py-1 rounded-full ${
                                        isUrgent
                                            ? "bg-red-100 text-red-600"
                                            : "bg-blue-100 text-blue-600"
                                    }`}
                                >
                                    {isUrgent ? "Segera" : "Mendatang"}
                                </motion.span>
                            </div>

                            <p
                                className={`text-sm mt-1 ${
                                    isUrgent ? "text-red-600" : "text-blue-600"
                                }`}
                            >
                                Jangan lupa jadwal kunjungan KF {nextPhase}
                            </p>

                            <div className="flex items-center mt-2">
                                <Calendar
                                    size={14}
                                    className={
                                        isUrgent
                                            ? "text-red-500"
                                            : "text-blue-500"
                                    }
                                />
                                <span
                                    className={`text-sm ml-1 font-medium ${
                                        isUrgent
                                            ? "text-red-600"
                                            : "text-blue-600"
                                    }`}
                                >
                                    {new Date(reminderDate).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                                <span
                                    className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                                        isUrgent
                                            ? "bg-red-50 text-red-500"
                                            : "bg-blue-50 text-blue-500"
                                    }`}
                                >
                                    {daysRemaining} hari lagi
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Action button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-3 w-full flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium text-white ${
                        isUrgent
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-blue-500 to-blue-600"
                    }`}
                >
                    <span>Lihat Detail Kunjungan</span>
                    <ChevronRight size={16} className="ml-1" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default NifasReminder;
