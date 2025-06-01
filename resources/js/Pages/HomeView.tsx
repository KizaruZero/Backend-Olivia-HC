import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ProblemSection from "./Components/ProblemSection";
import JoinUs from "./Components/JoinUs";
import FiturCard from "./Components/FiturSection";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage, router } from "@inertiajs/react";
import NifasSection from "./Components/FaseNifasSection";
import EducationSection from "./Components/EducationSection";
import GeneralEducationSection from "./Components/GeneralEducationSection";

export default function HomeView() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Video intersection observer
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                        video.muted = false;
                    } else {
                        video.pause();
                        video.muted = true;
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    // Scroll spy effect
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "hero",
                "problem",
                "fase-nifas",
                "features",
                "join",
            ];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        document
                            .querySelectorAll("nav button")
                            .forEach((btn) => {
                                btn.classList.remove(
                                    "text-blue-600",
                                    "font-medium"
                                );
                                if (
                                    btn.textContent?.toLowerCase() ===
                                        section.toLowerCase() ||
                                    btn.getAttribute("data-section") === section
                                ) {
                                    btn.classList.add(
                                        "text-blue-600",
                                        "font-medium"
                                    );
                                }
                            });
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <GuestLayout>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                {/* Hero Section */}
                <motion.section
                    id="hero"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="container px-16 mx-auto min-h-screen pb-24 flex items-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="w-full" // Ensure child takes full width
                    >
                        <div className="hero flex flex-col md:flex-row w-full  justify-center">
                            <div className="w-full md:w-1/2 ">
                                <button className="border-2 mb-4 border-sky-200 hover:bg-blue-600 px-6 py-3 rounded-3xl text-gray-600 hover:text-white transition duration-300">
                                    Health Matters: Setiap Bunda Berhak Sehat
                                </button>
                                <motion.h3
                                    initial={{ y: -20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-2xl md:text-3xl  text-gray-800 mb-4 "
                                >
                                    Selamat datang di{" "}
                                    <span className="text-blue-600 font-bold">
                                        Rumah Nifas
                                    </span>
                                </motion.h3>

                                <motion.h1
                                    initial={{ y: -20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 "
                                >
                                    Rumah Nifas{" "}
                                    <span className="text-blue-600 font-bold">
                                        Tempat ibu belajar
                                    </span>
                                    ,{" "}
                                    <span className="text-blue-600 font-bold">
                                        memahami
                                    </span>
                                    , dan{" "}
                                    <span className="text-blue-600 font-bold">
                                        merawat diri
                                    </span>
                                </motion.h1>
                                <p className="text-xl text-gray-500 mb-8">
                                    Ruang aman dan nyaman bagi ibu untuk
                                    memahami cara merawat diri dan bayinya
                                    selama masa nifas, dengan dukungan edukasi
                                    yang menyeluruh.
                                </p>
                                <button
                                    onClick={() => router.visit("/login")}
                                    className="outline-2 bg-blue-600 mb-4 outline-sky-200 hover:bg-blue-600 px-6 py-3 rounded-3xl text-gray-200 hover:text-white transition duration-300"
                                >
                                    Mulai Sekarang
                                </button>
                            </div>
                            <div className="image mx-auto">
                                <motion.video
                                    ref={videoRef}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    src="/storage/video_nifas/edukasinifas.mp4"
                                    loop
                                    playsInline
                                    controls
                                    className="w-full md:w-1/2 h-auto mx-auto rounded-lg shadow-xl mb-4"
                                />
                                <div className="flex justify-center mt-4">
                                    <a
                                        href="/storage/video_nifas/edukasinifas.mp4"
                                        download="Edukasi_Nifas.mp4"
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                        Download Video
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Fase Nifas Section */}
                <NifasSection></NifasSection>
                <GeneralEducationSection />

                {/* Problem Section */}
                <ProblemSection></ProblemSection>

                {/* Solution Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16"
                >
                    <FiturCard></FiturCard>
                </motion.div>

                {/* Join Us Section */}
                <JoinUs></JoinUs>

                {/* Footer */}
            </div>
        </GuestLayout>
    );
}
