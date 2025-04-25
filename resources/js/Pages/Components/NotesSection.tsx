import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Clock,
    Heart,
    Activity,
    Weight,
    FileText,
    Camera,
    Baby,
    Thermometer,
    AlertCircle,
} from "lucide-react";

// Interface untuk tipe data notes
interface DailyNote {
    id?: number;
    kehamilan_id: number;
    notes_date: string;
    notes_time: string | null;
    mood:
        | "sangat bahagia"
        | "senang"
        | "biasa saja"
        | "cemas"
        | "sedih"
        | "tertekan"
        | "mudah marah"
        | "mood swing"
        | null;
    stress_level: "rendah" | "sedang" | "tinggi" | null;
    stress_cause:
        | "pekerjaan"
        | "keluarga"
        | "keuangan"
        | "kesehatan"
        | "hubungan sosial"
        | "lainnya"
        | null;
    weight: number | null;
    daily_activities: string[] | null;
    gejala_fisik: string[] | null;
    additional_notes: string | null;
    photo_path: string | null;
    baby_movement_frequency: "sedikit" | "normal" | "aktif" | null;
    baby_movement_time: "pagi" | "siang" | "malam" | null;
    movement_counter: number | null;
    breast_condition:
        | "normal"
        | "bengkak"
        | "nyeri"
        | "puting lecet"
        | "mastitis"
        | null;
    wound_condition:
        | "normal"
        | "nyeri"
        | "kemerahan"
        | "bengkak"
        | "keluar cairan"
        | null;
    lochia_color: "merah" | "merah muda" | "kecoklatan" | "kekuningan" | null;
    lochia_amount: "sedikit" | "sedang" | "banyak" | null;
    lochia_smell: "normal" | "tidak normal" | null;
}

// Interface untuk custom date object
interface DateItem {
    date: Date;
    dayOfMonth: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isPast: boolean;
    dateString: string;
    hasNotes: boolean;
}

// Gejala fisik yang umum selama kehamilan
const GEJALA_FISIK_OPTIONS = [
    "Mual",
    "Muntah",
    "Pusing",
    "Sakit kepala",
    "Kram perut",
    "Nyeri punggung",
    "Nyeri pinggang",
    "Sembelit",
    "Diare",
    "Heartburn/asam lambung",
    "Bengkak pada kaki",
    "Kelelahan",
    "Insomnia",
    "Nafsu makan bertambah",
    "Nafsu makan berkurang",
    "Kontraksi",
    "Keputihan",
    "Gatal-gatal",
];

// Aktivitas harian yang umum
const DAILY_ACTIVITIES_OPTIONS = [
    "Olahraga ringan",
    "Jalan-jalan",
    "Senam hamil",
    "Yoga",
    "Bekerja",
    "Istirahat cukup",
    "Minum vitamin",
    "Kontrol ke dokter",
    "USG",
];

const PregnancyNotesApp: React.FC = () => {
    // State untuk tanggal yang dipilih
    const formatLocalDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // State untuk tanggal yang dipilih (menggunakan format lokal)
    const [selectedDate, setSelectedDate] = useState<string>(
        formatLocalDate(new Date())
    );
    // State untuk bulan dan tahun yang ditampilkan di kalender
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    // State untuk menyimpan notes
    const [notes, setNotes] = useState<DailyNote[]>([]);
    // State untuk notes berdasarkan tanggal (untuk menandai calendar)
    const [allNoteDates, setAllNoteDates] = useState<string[]>([]);
    // State untuk note yang sedang diedit
    const [currentNote, setCurrentNote] = useState<DailyNote>({
        kehamilan_id: 1, // Default value, akan diambil dari user yang login
        notes_date: formatLocalDate(new Date()),
        notes_time: new Date().toTimeString().slice(0, 5),
        mood: null,
        stress_level: null,
        stress_cause: null,
        weight: null,
        daily_activities: [],
        gejala_fisik: [],
        additional_notes: "",
        photo_path: null,
        baby_movement_frequency: null,
        baby_movement_time: null,
        movement_counter: null,
        breast_condition: null,
        wound_condition: null,
        lochia_color: null,
        lochia_amount: null,
        lochia_smell: null,
    });
    // State untuk id note yang sedang diedit
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
    // State untuk loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State untuk error
    const [error, setError] = useState<string | null>(null);
    // State untuk menampilkan form add/edit note
    const [showNoteForm, setShowNoteForm] = useState<boolean>(false);
    // State untuk tab yang aktif pada form
    const [activeTab, setActiveTab] = useState<string>("umum");
    // State untuk file gambar yang akan diupload
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    // State untuk image preview
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    // State untuk tahap kehamilan user (trimester atau nifas)
    const [pregnancyStage, setPregnancyStage] = useState<
        "trimester1" | "trimester2-3" | "nifas"
    >("trimester2-3");

    // Fungsi untuk mengambil tanggal hari ini dalam format YYYY-MM-DD
    const getTodayDate = (): string => {
        return new Date().toISOString().split("T")[0];
    };

    // Fungsi untuk memvalidasi tanggal yang dipilih
    const isValidDate = (date: string): boolean => {
        const today = getTodayDate();
        return date <= today;
    };

    // Fungsi untuk mengambil notes berdasarkan tanggal
    const fetchNotes = async () => {
        if (!isValidDate(selectedDate)) {
            setError("Tidak bisa memilih tanggal di masa depan");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            // Ganti URL dengan endpoint API Laravel Anda
            const response = await axios.get(
                `/api/daily-notes?date=${selectedDate}&kehamilan_id=1`
            );
            setNotes(response.data);
        } catch (err) {
            setError("Gagal mengambil data notes");
            console.error("Error fetching notes:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk mengambil semua tanggal yang memiliki notes (untuk menandai calendar)
    const fetchAllNoteDates = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/daily-notes/dates", // Full URL for testing
                { params: { kehamilan_id: 1 } }
            );
            setAllNoteDates(response.data);
        } catch (err) {
            console.error("Error fetching note dates:");
        }
    };

    // Efek samping untuk mengambil notes saat tanggal berubah
    useEffect(() => {
        fetchNotes();
    }, [selectedDate]);

    // Efek samping untuk mengambil semua tanggal yang memiliki notes saat bulan berubah
    useEffect(() => {
        fetchAllNoteDates();
    }, [currentMonth]);

    // Fungsi untuk menyimpan note
    const saveNote = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // Tambahkan semua field ke FormData untuk mengirim ke API
            Object.entries(currentNote).forEach(([key, value]) => {
                if (value !== null) {
                    // Handle array fields differently
                    if (key === "daily_activities" || key === "gejala_fisik") {
                        // Append each array item individually
                        value.forEach((item: string | Blob, index: any) => {
                            formData.append(`${key}[${index}]`, item);
                        });
                    } else {
                        formData.append(key, value);
                    }
                }
            });

            console.log(formData);
            console.log(currentNote);

            // Tambahkan file gambar jika ada
            if (selectedImage) {
                // Kirim FILE-nya, bukan hanya nama
                formData.append("photo", selectedImage); // File untuk disimpan di storage
                formData.append("photo_path", selectedImage.name); // Nama untuk database
            }

            if (editingNoteId) {
                // Update note yang sudah ada
                await axios.post(
                    `/api/daily-notes/${editingNoteId}?_method=PUT`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                // Buat note baru
                await axios.post("/api/daily-notes", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            // Refresh notes
            fetchNotes();
            fetchAllNoteDates();
            // Reset form
            resetForm();
        } catch (err) {
            setError("Gagal menyimpan note");
            console.error("Error saving note:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk mengedit note
    const editNote = (note: DailyNote) => {
        setCurrentNote({
            ...note,
            daily_activities: note.daily_activities || [],
            gejala_fisik: note.gejala_fisik || [],
        });
        setEditingNoteId(note.id || null);
        setShowNoteForm(true);

        // Set image preview jika ada
        if (note.photo_path) {
            setImagePreview(`/storage/foto_notes/${note.photo_path}`);
        } else {
            setImagePreview(null);
        }
    };

    // Fungsi untuk menghapus note
    const deleteNote = async (id: number | undefined) => {
        if (!id) return;

        if (!window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
            return;
        }

        setIsLoading(true);
        try {
            await axios.delete(`/api/daily-notes/${id}`);
            // Refresh notes
            fetchNotes();
            fetchAllNoteDates();
        } catch (err) {
            setError("Gagal menghapus note");
            console.error("Error deleting note:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk reset form
    const resetForm = () => {
        setCurrentNote({
            kehamilan_id: 1,
            notes_date: selectedDate,
            notes_time: new Date().toTimeString().slice(0, 5),
            mood: null,
            stress_level: null,
            stress_cause: null,
            weight: null,
            daily_activities: [],
            gejala_fisik: [],
            additional_notes: "",
            photo_path: null,
            baby_movement_frequency: null,
            baby_movement_time: null,
            movement_counter: null,
            breast_condition: null,
            wound_condition: null,
            lochia_color: null,
            lochia_amount: null,
            lochia_smell: null,
        });
        setEditingNoteId(null);
        setShowNoteForm(false);
        setSelectedImage(null);
        setImagePreview(null);
        setActiveTab("umum");
    };

    // Mendapatkan array dengan nama-nama hari dalam seminggu
    const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    // Mendapatkan nama bulan
    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    // Fungsi untuk mendapatkan semua tanggal yang perlu ditampilkan di kalender
    const getDatesForCalendar = (): DateItem[] => {
        const formatLocalDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // Tanggal pertama dari bulan yang ditampilkan
        const firstDayOfMonth = new Date(year, month, 1);
        // Hari dalam seminggu dari tanggal pertama (0 = Minggu, 6 = Sabtu)
        const firstDayOfWeek = firstDayOfMonth.getDay();

        // Tanggal terakhir dari bulan yang ditampilkan
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Tanggal hari ini
        const today = new Date();
        const todayDateString = formatLocalDate(today);

        const dates: DateItem[] = [];

        // Tambahkan tanggal dari bulan sebelumnya untuk mengisi baris pertama
        const daysFromPrevMonth = firstDayOfWeek;
        const prevMonth = new Date(year, month, 0);
        const daysInPrevMonth = prevMonth.getDate();

        for (
            let i = daysInPrevMonth - daysFromPrevMonth + 1;
            i <= daysInPrevMonth;
            i++
        ) {
            const date = new Date(year, month - 1, i);
            const dateString = formatLocalDate(date);
            dates.push({
                date,
                dayOfMonth: i,
                isCurrentMonth: false,
                isToday: dateString === todayDateString,
                isPast: date < today,
                dateString,
                hasNotes: allNoteDates.includes(dateString),
            });
        }

        // Tambahkan tanggal dari bulan saat ini
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const dateString = formatLocalDate(date);
            dates.push({
                date,
                dayOfMonth: i,
                isCurrentMonth: true,
                isToday: dateString === todayDateString,
                isPast: date < today,
                dateString,
                hasNotes: allNoteDates.includes(dateString),
            });
        }

        // Tambahkan tanggal dari bulan berikutnya untuk mengisi baris terakhir
        const daysFromNextMonth = 42 - dates.length; // 6 baris * 7 hari = 42 cell

        for (let i = 1; i <= daysFromNextMonth; i++) {
            const date = new Date(year, month + 1, i);
            const dateString = formatLocalDate(date);
            dates.push({
                date,
                dayOfMonth: i,
                isCurrentMonth: false,
                isToday: dateString === todayDateString,
                isPast: date < today,
                dateString,
                hasNotes: allNoteDates.includes(dateString),
            });
        }

        return dates;
    };

    // Fungsi untuk bulan sebelumnya
    const goToPrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    // Fungsi untuk bulan berikutnya
    const goToNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    // Fungsi untuk memilih tanggal
    const selectDate = (dateItem: DateItem) => {
        if (dateItem.isPast || dateItem.isToday) {
            setSelectedDate(dateItem.dateString);
            setError(null);
        } else {
            setError("Tidak bisa memilih tanggal di masa depan");
        }
    };

    // Fungsi untuk kembali ke bulan saat ini
    const goToCurrentMonth = () => {
        setCurrentMonth(new Date());
    };

    // Handle perubahan input biasa
    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setCurrentNote((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle perubahan checkbox (untuk daily_activities dan gejala_fisik)
    const handleCheckboxChange = (
        field: "daily_activities" | "gejala_fisik",
        value: string
    ) => {
        setCurrentNote((prev) => {
            const currentValues = prev[field] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prev,
                    [field]: currentValues.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prev,
                    [field]: [...currentValues, value],
                };
            }
        });
    };

    // Handle perubahan gambar
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            // Buat preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle increment untuk movement counter
    const handleMovementCounterIncrement = () => {
        setCurrentNote((prev) => ({
            ...prev,
            movement_counter: (prev.movement_counter || 0) + 1,
        }));
    };

    // Handle reset untuk movement counter
    const handleMovementCounterReset = () => {
        setCurrentNote((prev) => ({
            ...prev,
            movement_counter: 0,
        }));
    };

    // Render tab berdasarkan tab yang aktif
    const renderTabContent = () => {
        switch (activeTab) {
            case "umum":
                return (
                    <div className="space-y-4">
                        {/* Waktu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Waktu
                            </label>
                            <input
                                type="time"
                                name="notes_time"
                                value={currentNote.notes_time || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            />
                        </div>

                        {/* Mood */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mood
                            </label>
                            <select
                                name="mood"
                                value={currentNote.mood || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Mood</option>
                                <option value="sangat bahagia">
                                    Sangat Bahagia 😄
                                </option>
                                <option value="senang">Senang 🙂</option>
                                <option value="biasa saja">
                                    Biasa Saja 😐
                                </option>
                                <option value="cemas">Cemas 😟</option>
                                <option value="sedih">Sedih 😢</option>
                                <option value="tertekan">Tertekan 😞</option>
                                <option value="mudah marah">
                                    Mudah Marah 😠
                                </option>
                                <option value="mood swing">
                                    Mood Swing 🔄
                                </option>
                            </select>
                        </div>

                        {/* Stress Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tingkat Stress
                            </label>
                            <div className="flex gap-4">
                                {["rendah", "sedang", "tinggi"].map((level) => (
                                    <label
                                        key={level}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="stress_level"
                                            value={level}
                                            checked={
                                                currentNote.stress_level ===
                                                level
                                            }
                                            onChange={handleInputChange}
                                            className="mr-1"
                                        />
                                        <span className="capitalize">
                                            {level}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Stress Cause - hanya muncul jika stress level dipilih */}
                        {currentNote.stress_level && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Penyebab Stress
                                </label>
                                <select
                                    name="stress_cause"
                                    value={currentNote.stress_cause || ""}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                >
                                    <option value="">Pilih Penyebab</option>
                                    <option value="pekerjaan">Pekerjaan</option>
                                    <option value="keluarga">Keluarga</option>
                                    <option value="keuangan">Keuangan</option>
                                    <option value="kesehatan">Kesehatan</option>
                                    <option value="hubungan sosial">
                                        Hubungan Sosial
                                    </option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                            </div>
                        )}

                        {/* Berat Badan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Berat Badan (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={currentNote.weight || ""}
                                onChange={handleInputChange}
                                placeholder="Masukkan berat badan"
                                step="0.1"
                                min="30"
                                max="150"
                                className="border border-gray-300 p-2 rounded-md w-full"
                            />
                        </div>

                        {/* Catatan Tambahan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Catatan Tambahan
                            </label>
                            <textarea
                                name="additional_notes"
                                value={currentNote.additional_notes || ""}
                                onChange={handleInputChange}
                                placeholder="Tuliskan catatan tambahan di sini..."
                                rows={3}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            />
                        </div>

                        {/* Upload Foto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Foto
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-h-40 object-contain rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        Hapus Gambar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "aktivitas":
                return (
                    <div className="space-y-4">
                        {/* Aktivitas Harian */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Aktivitas Harian
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {DAILY_ACTIVITIES_OPTIONS.map((activity) => (
                                    <label
                                        key={activity}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(
                                                currentNote.daily_activities ||
                                                []
                                            ).includes(activity)}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    "daily_activities",
                                                    activity
                                                )
                                            }
                                            className="mr-1"
                                        />
                                        <span>{activity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Gejala Fisik */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gejala Fisik
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {GEJALA_FISIK_OPTIONS.map((gejala) => (
                                    <label
                                        key={gejala}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={(
                                                currentNote.gejala_fisik || []
                                            ).includes(gejala)}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    "gejala_fisik",
                                                    gejala
                                                )
                                            }
                                            className="mr-1"
                                        />
                                        <span>{gejala}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "bayi":
                return (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-md mb-3">
                            <p className="text-blue-700 text-sm">
                                <AlertCircle
                                    size={16}
                                    className="inline mr-1"
                                />
                                Section ini khusus untuk trimester 2-3 kehamilan
                            </p>
                        </div>

                        {/* Frekuensi Gerakan Bayi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Frekuensi Gerakan Bayi
                            </label>
                            <select
                                name="baby_movement_frequency"
                                value={
                                    currentNote.baby_movement_frequency || ""
                                }
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Frekuensi</option>
                                <option value="sedikit">Sedikit</option>
                                <option value="normal">Normal</option>
                                <option value="aktif">Aktif</option>
                            </select>
                        </div>

                        {/* Waktu Gerakan Bayi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Waktu Gerakan Bayi
                            </label>
                            <div className="flex gap-4">
                                {["pagi", "siang", "malam"].map((time) => (
                                    <label
                                        key={time}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="baby_movement_time"
                                            value={time}
                                            checked={
                                                currentNote.baby_movement_time ===
                                                time
                                            }
                                            onChange={handleInputChange}
                                            className="mr-1"
                                        />
                                        <span className="capitalize">
                                            {time}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Movement Counter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kick Counter
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    name="movement_counter"
                                    value={currentNote.movement_counter || 0}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 rounded-md w-20"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={handleMovementCounterIncrement}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                >
                                    Catat Gerakan +1
                                </button>
                                <button
                                    type="button"
                                    onClick={handleMovementCounterReset}
                                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case "nifas":
                return (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-md mb-3">
                            <p className="text-blue-700 text-sm">
                                <AlertCircle
                                    size={16}
                                    className="inline mr-1"
                                />
                                Section ini khusus untuk masa nifas
                            </p>
                        </div>

                        {/* Kondisi Payudara */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kondisi Payudara
                            </label>
                            <select
                                name="breast_condition"
                                value={currentNote.breast_condition || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Kondisi</option>
                                <option value="normal">Normal</option>
                                <option value="bengkak">Bengkak</option>
                                <option value="nyeri">Nyeri</option>
                                <option value="puting lecet">
                                    Puting Lecet
                                </option>
                                <option value="mastitis">Mastitis</option>
                            </select>
                        </div>

                        {/* Kondisi Luka Persalinan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kondisi Luka Persalinan
                            </label>
                            <select
                                name="wound_condition"
                                value={currentNote.wound_condition || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Kondisi</option>
                                <option value="normal">Normal</option>
                                <option value="nyeri">Nyeri</option>
                                <option value="kemerahan">Kemerahan</option>
                                <option value="bengkak">Bengkak</option>
                                <option value="keluar cairan">
                                    Keluar Cairan
                                </option>
                            </select>
                        </div>

                        {/* Warna Lochia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Warna Lochia
                            </label>
                            <select
                                name="lochia_color"
                                value={currentNote.lochia_color || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Warna</option>
                                <option value="merah">Merah</option>
                                <option value="merah muda">Merah Muda</option>
                                <option value="kecoklatan">Kecoklatan</option>
                                <option value="kekuningan">Kekuningan</option>
                            </select>
                        </div>

                        {/* Jumlah Lochia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Jumlah Lochia
                            </label>
                            <select
                                name="lochia_amount"
                                value={currentNote.lochia_amount || ""}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-md w-full"
                            >
                                <option value="">Pilih Jumlah</option>
                                <option value="sedikit">Sedikit</option>
                                <option value="sedang">Sedang</option>
                                <option value="banyak">Banyak</option>
                            </select>
                        </div>

                        {/* Bau Lochia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bau Lochia
                            </label>
                            <div className="flex gap-4">
                                {["normal", "tidak normal"].map((smell) => (
                                    <label
                                        key={smell}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name="lochia_smell"
                                            value={smell}
                                            checked={
                                                currentNote.lochia_smell ===
                                                smell
                                            }
                                            onChange={handleInputChange}
                                            className="mr-1"
                                        />
                                        <span className="capitalize">
                                            {smell}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Render UI untuk notes yang sudah ada
    const renderExistingNotes = () => {
        if (isLoading) {
            return <div className="text-center py-4">Loading...</div>;
        }

        if (notes.length === 0) {
            return (
                <div className="text-center py-4 text-gray-500">
                    Tidak ada catatan untuk tanggal ini
                </div>
            );
        }

        return notes.map((note) => (
            <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <Clock size={18} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                            {note.notes_time
                                ? note.notes_time.slice(0, 5)
                                : "Tidak ada waktu"}
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => editNote(note)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Mood dan Stress Level */}
                {(note.mood || note.stress_level) && (
                    <div className="mb-3">
                        {note.mood && (
                            <div className="flex items-center mb-1">
                                <Heart
                                    size={18}
                                    className="text-pink-500 mr-2"
                                />
                                <span>
                                    Mood:{" "}
                                    <span className="capitalize">
                                        {note.mood}
                                    </span>
                                </span>
                            </div>
                        )}
                        {note.stress_level && (
                            <div className="flex items-center">
                                <Activity
                                    size={18}
                                    className="text-orange-500 mr-2"
                                />
                                <span>
                                    Stress:{" "}
                                    <span className="capitalize">
                                        {note.stress_level}
                                    </span>
                                    {note.stress_cause && (
                                        <span> ({note.stress_cause})</span>
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Berat Badan */}
                {note.weight && (
                    <div className="flex items-center mb-3">
                        <Weight size={18} className="text-green-500 mr-2" />
                        <span>Berat: {note.weight} kg</span>
                    </div>
                )}

                {/* Gerakan Bayi */}
                {(note.baby_movement_frequency || note.movement_counter) && (
                    <div className="mb-3">
                        <div className="flex items-center mb-1">
                            <Baby size={18} className="text-blue-500 mr-2" />
                            <span>
                                Gerakan bayi:
                                {note.baby_movement_frequency && (
                                    <span className="capitalize">
                                        {" "}
                                        {note.baby_movement_frequency}
                                    </span>
                                )}
                                {note.baby_movement_time && (
                                    <span> pada {note.baby_movement_time}</span>
                                )}
                            </span>
                        </div>
                        {note.movement_counter ||
                            (0 > 0 && (
                                <div className="ml-6">
                                    <span>
                                        Jumlah gerakan: {note.movement_counter}
                                    </span>
                                </div>
                            ))}
                    </div>
                )}

                {/* Kondisi Masa Nifas */}
                {(note.breast_condition ||
                    note.wound_condition ||
                    note.lochia_color) && (
                    <div className="mb-3">
                        <div className="flex items-start mb-1">
                            <Thermometer
                                size={18}
                                className="text-purple-500 mr-2 mt-1"
                            />
                            <div>
                                <span className="font-medium">
                                    Kondisi Masa Nifas:
                                </span>
                                <ul className="list-disc list-inside ml-2 mt-1">
                                    {note.breast_condition && (
                                        <li>
                                            Payudara:{" "}
                                            <span className="capitalize">
                                                {note.breast_condition}
                                            </span>
                                        </li>
                                    )}
                                    {note.wound_condition && (
                                        <li>
                                            Luka:{" "}
                                            <span className="capitalize">
                                                {note.wound_condition}
                                            </span>
                                        </li>
                                    )}
                                    {note.lochia_color && (
                                        <li>
                                            Lochia:{" "}
                                            <span className="capitalize">
                                                {note.lochia_color}
                                            </span>
                                            {note.lochia_amount && (
                                                <span>
                                                    , {note.lochia_amount}
                                                </span>
                                            )}
                                            {note.lochia_smell && (
                                                <span>
                                                    , bau {note.lochia_smell}
                                                </span>
                                            )}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Aktivitas dan Gejala */}
                {((note.daily_activities && note.daily_activities.length > 0) ||
                    (note.gejala_fisik && note.gejala_fisik.length > 0)) && (
                    <div className="mb-3">
                        {note.daily_activities &&
                            note.daily_activities.length > 0 && (
                                <div className="flex items-start mb-1">
                                    <Activity
                                        size={18}
                                        className="text-blue-500 mr-2 mt-1"
                                    />
                                    <div>
                                        <span className="font-medium">
                                            Aktivitas:
                                        </span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {Array.isArray(
                                                note.daily_activities
                                            ) &&
                                                note.daily_activities.map(
                                                    (activity, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                        >
                                                            {activity}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        {note.gejala_fisik && note.gejala_fisik.length > 0 && (
                            <div className="flex items-start mt-2">
                                <AlertCircle
                                    size={18}
                                    className="text-red-500 mr-2 mt-1"
                                />
                                <div>
                                    <span className="font-medium">
                                        Gejala fisik:
                                    </span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {Array.isArray(note.daily_activities) &&
                                            note.daily_activities.map(
                                                (activity, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                    >
                                                        {activity}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Catatan Tambahan */}
                {note.additional_notes && (
                    <div className="flex items-start mb-3">
                        <FileText
                            size={18}
                            className="text-gray-500 mr-2 mt-1"
                        />
                        <div>
                            <span className="font-medium">Catatan:</span>
                            <p className="text-gray-700 mt-1">
                                {note.additional_notes}
                            </p>
                        </div>
                    </div>
                )}

                {/* Foto */}
                {note.photo_path && (
                    <div className="mt-3">
                        <img
                            src={`/storage/foto_notes/${note.photo_path}`}
                            alt="Foto catatan"
                            className="w-1/3 h-1/4 rounded-lg mx-auto"
                        />
                    </div>
                )}
            </motion.div>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">
                Catatan Harian Kehamilan
            </h1>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* Calendar Section */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                        <Calendar size={20} className="mr-2" />
                        {monthNames[currentMonth.getMonth()]}{" "}
                        {currentMonth.getFullYear()}
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={goToPrevMonth}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={goToCurrentMonth}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                            Bulan Ini
                        </button>
                        <button
                            onClick={goToNextMonth}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {/* Weekday headers */}
                    {weekdays.map((day) => (
                        <div
                            key={day}
                            className="text-center font-medium text-gray-500 py-2"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {getDatesForCalendar().map((dateItem, index) => (
                        <div
                            key={index}
                            onClick={() => selectDate(dateItem)}
                            className={`
                relative h-12 border rounded-md flex items-center justify-center cursor-pointer
                ${
                    dateItem.isCurrentMonth
                        ? "bg-white"
                        : "bg-gray-100 text-gray-400"
                }
                ${dateItem.isToday ? "border-blue-500" : "border-gray-200"}
                ${dateItem.dateString === selectedDate ? "bg-blue-100" : ""}
                ${
                    !dateItem.isPast && !dateItem.isToday
                        ? "cursor-not-allowed"
                        : ""
                }
                hover:bg-gray-100
              `}
                        >
                            <span className="text-sm">
                                {dateItem.dayOfMonth}
                            </span>
                            {dateItem.hasNotes && (
                                <span className="absolute bottom-1 left-0 right-0 flex justify-center">
                                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full"></span>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Date Info */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {new Date(selectedDate).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>
                    {!showNoteForm && (
                        <button
                            onClick={() => {
                                setCurrentNote({
                                    ...currentNote,
                                    notes_date: selectedDate,
                                    notes_time: new Date()
                                        .toTimeString()
                                        .slice(0, 5),
                                });
                                setShowNoteForm(true);
                            }}
                            className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                        >
                            <Plus size={18} className="mr-1" />
                            Tambah Catatan
                        </button>
                    )}
                </div>

                {/* Form untuk add/edit note */}
                <AnimatePresence>
                    {showNoteForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 p-4 rounded-lg mb-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">
                                    {editingNoteId
                                        ? "Edit Catatan"
                                        : "Tambah Catatan Baru"}
                                </h3>
                                <button
                                    onClick={resetForm}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Tab navigation */}
                            <div className="flex border-b mb-4">
                                <button
                                    onClick={() => setActiveTab("umum")}
                                    className={`px-4 py-2 font-medium ${
                                        activeTab === "umum"
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    Umum
                                </button>
                                <button
                                    onClick={() => setActiveTab("aktivitas")}
                                    className={`px-4 py-2 font-medium ${
                                        activeTab === "aktivitas"
                                            ? "border-b-2 border-blue-500 text-blue-500"
                                            : "text-gray-500"
                                    }`}
                                >
                                    Aktivitas & Gejala
                                </button>
                                {pregnancyStage === "trimester2-3" && (
                                    <button
                                        onClick={() => setActiveTab("bayi")}
                                        className={`px-4 py-2 font-medium ${
                                            activeTab === "bayi"
                                                ? "border-b-2 border-blue-500 text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Gerakan Bayi
                                    </button>
                                )}
                                {pregnancyStage === "nifas" && (
                                    <button
                                        onClick={() => setActiveTab("nifas")}
                                        className={`px-4 py-2 font-medium ${
                                            activeTab === "nifas"
                                                ? "border-b-2 border-blue-500 text-blue-500"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Masa Nifas
                                    </button>
                                )}
                            </div>

                            {/* Tab content */}
                            {renderTabContent()}

                            {/* Save button */}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={saveNote}
                                    disabled={isLoading}
                                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                                >
                                    <Save size={18} className="mr-1" />
                                    {isLoading
                                        ? "Menyimpan..."
                                        : "Simpan Catatan"}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Render existing notes */}
                {renderExistingNotes()}
            </div>
        </div>
    );
};

export default PregnancyNotesApp;
