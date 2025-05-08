import { useState, useEffect, useRef } from "react";
import {
    ChevronRight,
    Check,
    Clock,
    AlertCircle,
    Heart,
    Baby,
    Activity,
    Calendar,
} from "lucide-react";

export default function NifasTimeline() {
    // Define the phases with more detailed data
    const nifasPhases = [
        {
            id: 1,
            title: "Fase Akut",
            duration: "0-24 jam",
            icon: Clock,
            color: "blue",
            description:
                "Fase kritis setelah melahirkan dengan fokus pada pemulihan awal",
            key_points: [
                "Pemantauan perdarahan",
                "Tanda-tanda vital",
                "Kontraksi uterus",
            ],
        },
        {
            id: 2,
            title: "Fase Subinvolusi",
            duration: "1-3 hari",
            icon: AlertCircle,
            color: "indigo",
            description:
                "Masa pemulihan organ reproduksi dan stabilisasi kondisi ibu",
            key_points: [
                "Involusi uterus",
                "Perawatan luka",
                "Inisiasi menyusui",
            ],
        },
        {
            id: 3,
            title: "Fase Pemulihan",
            duration: "4-14 hari",
            icon: Heart,
            color: "purple",
            description:
                "Pemulihan fisik dan penyesuaian dengan peran baru sebagai ibu",
            key_points: [
                "Perawatan payudara",
                "Nutrisi seimbang",
                "Mulai aktivitas ringan",
            ],
        },
        {
            id: 4,
            title: "Fase Adaptasi",
            duration: "2-6 minggu",
            icon: Baby,
            color: "fuchsia",
            description:
                "Adaptasi dengan kehidupan baru dan pemulihan penuh organ reproduksi",
            key_points: ["Pola tidur", "Dukungan mental", "Perawatan bayi"],
        },
        {
            id: 5,
            title: "Fase Pemulihan Penuh",
            duration: "6-8 minggu",
            icon: Activity,
            color: "pink",
            description:
                "Pemulihan total dan kembali ke kondisi normal pra-kehamilan",
            key_points: [
                "Pemeriksaan lengkap",
                "Kembali beraktivitas",
                "Perencanaan kontrasepsi",
            ],
        },
    ];

    const [activePhase, setActivePhase] = useState(1);
    const [completed, setCompleted] = useState([]);
    const timelineRef = useRef(null);

    // Add phases to completed list as user navigates through them
    useEffect(() => {
        if (!completed.includes(activePhase)) {
            setCompleted([...completed, activePhase]);
        }
    }, [activePhase]);

    // Get current phase data
    const currentPhase = nifasPhases.find((phase) => phase.id === activePhase);

    // Calculate progress percentage
    const progressPercentage = (activePhase / nifasPhases.length) * 100;

    // Helper for getting color classes based on phase
    const getColorClass = (phase, type) => {
        const colorMap = {
            blue: {
                bg: "bg-blue-600",
                bgLight: "bg-blue-50",
                bgHover: "hover:bg-blue-100",
                text: "text-blue-700",
                border: "border-blue-600",
                shadow: "shadow-blue-200",
            },
            indigo: {
                bg: "bg-indigo-600",
                bgLight: "bg-indigo-50",
                bgHover: "hover:bg-indigo-100",
                text: "text-indigo-700",
                border: "border-indigo-600",
                shadow: "shadow-indigo-200",
            },
            purple: {
                bg: "bg-purple-600",
                bgLight: "bg-purple-50",
                bgHover: "hover:bg-purple-100",
                text: "text-purple-700",
                border: "border-purple-600",
                shadow: "shadow-purple-200",
            },
            fuchsia: {
                bg: "bg-fuchsia-600",
                bgLight: "bg-fuchsia-50",
                bgHover: "hover:bg-fuchsia-100",
                text: "text-fuchsia-700",
                border: "border-fuchsia-600",
                shadow: "shadow-fuchsia-200",
            },
            pink: {
                bg: "bg-pink-600",
                bgLight: "bg-pink-50",
                bgHover: "hover:bg-pink-100",
                text: "text-pink-700",
                border: "border-pink-600",
                shadow: "shadow-pink-200",
            },
        };

        return colorMap[phase.color][type];
    };

    // Function to navigate to next phase
    const goToNextPhase = () => {
        if (activePhase < nifasPhases.length) {
            setActivePhase(activePhase + 1);
        }
    };

    // Function to navigate to previous phase
    const goToPrevPhase = () => {
        if (activePhase > 1) {
            setActivePhase(activePhase - 1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
            {/* Header with animation */}
            <div
                className="text-center mb-12"
                style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: "fadeInDown 0.5s ease forwards",
                }}
            >
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    Fase Penting Masa Nifas
                </h2>
                <p className="text-blue-600 max-w-2xl mx-auto">
                    Ketahui tahapan perawatan kesehatan pasca-melahirkan untuk
                    ibu dan bayi
                </p>
            </div>

            {/* Visual Progress Bar */}
            <div
                className="mb-8 relative"
                style={{
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 0.3s forwards",
                }}
            >
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                            width: `${progressPercentage}%`,
                            background: `linear-gradient(to right, #3b82f6, #8b5cf6, #d946ef)`,
                        }}
                    />
                </div>
                <div className="flex justify-between mt-1">
                    {nifasPhases.map((phase) => (
                        <div
                            key={`marker-${phase.id}`}
                            className={`flex flex-col items-center transition-all ${
                                phase.id <= activePhase
                                    ? getColorClass(phase, "text")
                                    : "text-gray-400"
                            }`}
                            style={{
                                transform: "scale(1)",
                                transition: "transform 0.3s ease",
                                animation:
                                    phase.id === activePhase
                                        ? "pulse 2s infinite"
                                        : "none",
                            }}
                        >
                            <div
                                className={`w-4 h-4 rounded-full ${
                                    phase.id < activePhase
                                        ? "bg-green-500"
                                        : phase.id === activePhase
                                        ? getColorClass(phase, "bg")
                                        : "bg-gray-200"
                                } flex items-center justify-center`}
                            >
                                {phase.id < activePhase && (
                                    <Check size={10} className="text-white" />
                                )}
                            </div>
                            <span className="text-xs mt-1">
                                {phase.duration}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Navigation */}
            <div
                className="flex flex-wrap gap-4 justify-center mb-10"
                style={{
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 0.5s forwards",
                }}
            >
                {nifasPhases.map((phase) => {
                    const isActive = activePhase === phase.id;
                    const isCompleted =
                        completed.includes(phase.id) && !isActive;
                    const Icon = phase.icon;

                    return (
                        <button
                            key={phase.id}
                            onClick={() => setActivePhase(phase.id)}
                            className={`px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                ${
                    isActive
                        ? `${getColorClass(phase, "bg")} text-white shadow-lg`
                        : isCompleted
                        ? `bg-white border ${getColorClass(
                              phase,
                              "border"
                          )} ${getColorClass(phase, "text")}`
                        : `${getColorClass(phase, "bgLight")} ${getColorClass(
                              phase,
                              "text"
                          )} ${getColorClass(phase, "bgHover")}`
                }`}
                            style={{
                                transform: isActive
                                    ? "scale(1.05)"
                                    : "scale(1)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            {isCompleted ? (
                                <Check
                                    size={18}
                                    className={getColorClass(phase, "text")}
                                />
                            ) : (
                                <Icon
                                    size={18}
                                    className={
                                        isActive
                                            ? "text-white"
                                            : getColorClass(phase, "text")
                                    }
                                />
                            )}
                            <span>{phase.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div
                className={`p-8 rounded-xl mb-6 transition-all duration-500 ${getColorClass(
                    currentPhase,
                    "bgLight"
                )} ${getColorClass(currentPhase, "shadow")}`}
                style={{
                    opacity: 0,
                    transform: "translateY(15px)",
                    animation: "fadeInUp 0.5s ease 0.7s forwards",
                }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className={`p-3 rounded-full ${getColorClass(
                            currentPhase,
                            "bg"
                        )} text-white`}
                        style={{ animation: "pulse 2s infinite" }}
                    >
                        {React.createElement(currentPhase.icon, { size: 24 })}
                    </div>
                    <div>
                        <h3
                            className={`text-2xl font-bold ${getColorClass(
                                currentPhase,
                                "text"
                            )}`}
                        >
                            {currentPhase.title}
                        </h3>
                        <p className="text-gray-500">{currentPhase.duration}</p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6">{currentPhase.description}</p>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4
                        className={`font-semibold mb-2 ${getColorClass(
                            currentPhase,
                            "text"
                        )}`}
                    >
                        Hal-hal penting:
                    </h4>
                    <ul className="space-y-2">
                        {currentPhase.key_points.map((point, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-2"
                                style={{
                                    opacity: 0,
                                    animation: `fadeIn 0.5s ease ${
                                        0.8 + index * 0.1
                                    }s forwards`,
                                }}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${getColorClass(
                                        currentPhase,
                                        "bg"
                                    )}`}
                                ></div>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div
                className="flex justify-between"
                style={{
                    opacity: 0,
                    animation: "fadeIn 0.8s ease 0.9s forwards",
                }}
            >
                <button
                    onClick={goToPrevPhase}
                    disabled={activePhase === 1}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
            ${
                activePhase === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : `${getColorClass(
                          nifasPhases[activePhase - 2],
                          "bg"
                      )} text-white hover:shadow-md`
            }`}
                >
                    <ChevronRight size={16} className="rotate-180" />
                    <span>Sebelumnya</span>
                </button>

                <div className="text-sm text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>
                        Fase {activePhase} dari {nifasPhases.length}
                    </span>
                </div>

                <button
                    onClick={goToNextPhase}
                    disabled={activePhase === nifasPhases.length}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
            ${
                activePhase === nifasPhases.length
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : `${getColorClass(
                          nifasPhases[activePhase],
                          "bg"
                      )} text-white hover:shadow-md`
            }`}
                >
                    <span>Selanjutnya</span>
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
                    }
                    70% {
                        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
                    }
                }
            `}</style>
        </div>
    );
}
