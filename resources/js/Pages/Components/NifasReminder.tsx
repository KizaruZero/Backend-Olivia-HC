import { Bell } from "lucide-react";

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
    if (currentPhase >= 3) {
        return null; // Tidak menampilkan reminder jika sudah fase 4 atau selesai
    }

    console.log(currentPhase, nextPhase, reminderDate);

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <Bell className="text-yellow-500" size={20} />
                </div>
                <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">
                        Kunjungan KF {nextPhase}
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                        Jangan lupa jadwal kunjungan KF {nextPhase} pada tanggal{" "}
                        {reminderDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NifasReminder;
