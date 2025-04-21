import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Data dummy untuk visualisasi
const maternalDeathData = {
    penyebabKematian: [
        { name: "Perdarahan", value: 35 },
        { name: "Hipertensi", value: 25 },
        { name: "Infeksi", value: 15 },
        { name: "Komplikasi Nifas", value: 20 },
        { name: "Lainnya", value: 5 },
    ],
    kunjunganPerDaerah: [
        { region: "Bandung", percentage: 75 },
        { region: "Bogor", percentage: 68 },
        { region: "Bekasi", percentage: 82 },
        { region: "Depok", percentage: 79 },
        { region: "Cirebon", percentage: 64 },
        { region: "Tasikmalaya", percentage: 58 },
    ],
};

export default function ProblemSection() {
    const pieChartRef = useRef<HTMLCanvasElement | null>(null);
    const barChartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // PIE CHART
        if (pieChartRef.current) {
            const pieChartCtx = pieChartRef.current.getContext("2d");

            if (pieChartCtx) {
                const pieChartInstance = Chart.getChart(pieChartCtx);
                if (pieChartInstance) {
                    pieChartInstance.destroy();
                }

                new Chart(pieChartCtx, {
                    type: "pie",
                    data: {
                        labels: maternalDeathData.penyebabKematian.map(
                            (item) => item.name
                        ),
                        datasets: [
                            {
                                data: maternalDeathData.penyebabKematian.map(
                                    (item) => item.value
                                ),
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56",
                                    "#4BC0C0",
                                    "#9966FF",
                                ],
                                borderColor: "#FFFFFF",
                                borderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    color: "#FFFFFF",
                                    font: { size: 14 },
                                },
                            },
                            title: {
                                display: true,
                                text: "Penyebab Utama Kematian Ibu",
                                color: "#FFFFFF",
                                font: { size: 16, weight: "bold" },
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) =>
                                        `${context.label}: ${context.raw}%`,
                                },
                            },
                        },
                    },
                });
            }
        }

        // BAR CHART
        if (barChartRef.current) {
            const barChartCtx = barChartRef.current.getContext("2d");

            if (barChartCtx) {
                const barChartInstance = Chart.getChart(barChartCtx);
                if (barChartInstance) {
                    barChartInstance.destroy();
                }

                new Chart(barChartCtx, {
                    type: "bar",
                    data: {
                        labels: maternalDeathData.kunjunganPerDaerah.map(
                            (item) => item.region
                        ),
                        datasets: [
                            {
                                label: "Persentase Kunjungan Nifas",
                                data: maternalDeathData.kunjunganPerDaerah.map(
                                    (item) => item.percentage
                                ),
                                backgroundColor: "rgba(75, 192, 192, 0.7)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: { color: "#FFFFFF" },
                                grid: { color: "rgba(255, 255, 255, 0.1)" },
                            },
                            x: {
                                ticks: { color: "#FFFFFF" },
                                grid: { color: "rgba(255, 255, 255, 0.1)" },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: { color: "#FFFFFF" },
                            },
                            title: {
                                display: true,
                                text: "Persentase Kunjungan Nifas di Jawa Barat",
                                color: "#FFFFFF",
                                font: { size: 16, weight: "bold" },
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) =>
                                        `Kunjungan: ${context.raw}%`,
                                },
                            },
                        },
                    },
                });
            }
        }

        // CLEANUP
        return () => {
            const pieChartCtx = pieChartRef.current?.getContext("2d");
            if (pieChartCtx) {
                const pieChartInstance = Chart.getChart(pieChartCtx);
                if (pieChartInstance) pieChartInstance.destroy();
            }

            const barChartCtx = barChartRef.current?.getContext("2d");
            if (barChartCtx) {
                const barChartInstance = Chart.getChart(barChartCtx);
                if (barChartInstance) barChartInstance.destroy();
            }
        };
    }, []);

    return (
        <motion.section
            id="problem"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-blue-600 text-white min-h-screen  py-24"
        >
            <div className="container mx-auto px-6 text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                    {/* Chart 1: Penyebab Kematian Ibu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/20 p-4 rounded-lg"
                    >
                        <div className="h-80 relative">
                            <canvas ref={pieChartRef} />
                        </div>
                        <p className="text-sm mt-4">
                            20% kematian ibu disebabkan oleh komplikasi pada
                            masa nifas yang sebenarnya dapat dicegah dengan
                            pemeriksaan rutin.
                        </p>
                    </motion.div>

                    {/* Chart 2: Persentase Kunjungan Nifas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/20 p-4 rounded-lg"
                    >
                        <div className="h-80 relative">
                            <canvas ref={barChartRef} />
                        </div>
                        <p className="text-sm mt-4">
                            Rata-rata hanya 71% ibu di Jawa Barat yang melakukan
                            kunjungan nifas secara rutin. Beberapa daerah bahkan
                            memiliki angka di bawah 60%.
                        </p>
                    </motion.div>
                </div>

                <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">
                        Kenapa kontrol masa nifas penting?
                    </h3>
                    <ul className="text-left list-disc list-inside space-y-2 max-w-3xl mx-auto">
                        <li>
                            Deteksi dini komplikasi pasca melahirkan seperti
                            perdarahan dan infeksi
                        </li>
                        <li>
                            Pemantauan pemulihan tubuh ibu setelah melahirkan
                        </li>
                        <li>
                            Penanganan masalah laktasi dan dukungan pemberian
                            ASI
                        </li>
                        <li>
                            Screening gangguan psikologis seperti baby blues dan
                            depresi pasca melahirkan
                        </li>
                        <li>
                            Edukasi perawatan bayi baru lahir dan kesehatan ibu
                        </li>
                    </ul>
                </div>
            </div>
        </motion.section>
    );
}
