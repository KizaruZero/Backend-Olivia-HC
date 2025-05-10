import { useState, useEffect } from "react";

interface KfData {
    id: number;
    name: string;
    dateRange: string;
    completed: boolean;
    isCurrent: boolean;
    notes?: string;
}

interface Reminder {
    id: number;
    title: string;
    date: string;
    timeLeft: string;
    isDue: boolean;
}

interface ProgressData {
    startDate: string;
    endDate: string;
    percentage: number;
    completedKfs: number;
    kfData: KfData[];
    reminders: Reminder[];
    userName: string;
    streak: number;
    profileBorder?: string;
    justCompletedKf?: number;
}

export function useKfProgress() {
    const [progress, setProgress] = useState<ProgressData>({
        startDate: "2024-03-01",
        endDate: "2024-04-01",
        percentage: 0,
        completedKfs: 0,
        kfData: [],
        reminders: [],
        userName: "User",
        streak: 0,
    });

    useEffect(() => {
        // Fetch data from API
        fetch("/api/kehamilan/user/1")
            .then((res) => res.json())
            .then((data) => {
                setProgress((prev) => ({
                    ...prev,
                    ...data,
                }));
            });
    }, []);

    const completeKf = (id: number) => {
        setProgress((prev) => ({
            ...prev,
            kfData: prev.kfData.map((kf) =>
                kf.id === id ? { ...kf, completed: true } : kf
            ),
            completedKfs: prev.completedKfs + 1,
            percentage: ((prev.completedKfs + 1) / prev.kfData.length) * 100,
            justCompletedKf: id,
        }));
    };

    const updateNotes = (id: number, notes: string) => {
        setProgress((prev) => ({
            ...prev,
            kfData: prev.kfData.map((kf) =>
                kf.id === id ? { ...kf, notes } : kf
            ),
        }));
    };

    return { progress, completeKf, updateNotes };
}
