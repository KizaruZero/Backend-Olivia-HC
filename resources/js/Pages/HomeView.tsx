import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import heroImage from "./assets/hero.png";
import ProblemSection from "./Components/ProblemSection";
import JoinUs from "./Components/JoinUs";
import FiturCard from "./Components/FiturSection";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage, router } from "@inertiajs/react";

export default function HomeView() {
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
            const sections = ["hero", "problem", "features", "join"];
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
                                <button className="outline-1 mb-4 outline-sky-200 hover:bg-blue-600 px-6 py-3 rounded-3xl text-gray-600 hover:text-white transition duration-300">
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
                                        Bunda Sehat+
                                    </span>
                                </motion.h3>

                                <motion.h1
                                    initial={{ y: -20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 "
                                >
                                    Setiap Momen{" "}
                                    <span className="text-blue-600 font-bold">
                                        Kehamilan
                                    </span>{" "}
                                    hingga{" "}
                                    <span className="text-blue-600 font-bold">
                                        Pulih
                                    </span>
                                    , Kami Temani Anda
                                </motion.h1>
                                <p className="text-xl text-gray-500 mb-8">
                                    Dapatkan panduan holistik trimester demi
                                    trimester & pemantauan nifas 24/7 - karena
                                    kesehatan Bunda menentukan masa depan si
                                    kecil
                                </p>
                                <button
                                    onClick={() => router.visit("/login")}
                                    className="outline-2 bg-blue-600 mb-4 outline-sky-200 hover:bg-blue-600 px-6 py-3 rounded-3xl text-gray-200 hover:text-white transition duration-300"
                                >
                                    Mulai Sekarang
                                </button>
                            </div>
                            <div className="image mx-auto ">
                                <motion.img
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    src={heroImage}
                                    alt="Hero Image"
                                    className="hidden md:block w-full h-auto mx-auto"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* <motion.div variants={itemVariants} className="mt-16">
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 bg-blue-100 rounded-2xl overflow-hidden">
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-blue-200 rounded-full"
            />
          </div>
        </motion.div> */}
                </motion.section>

                {/* Problem Section */}
                <ProblemSection></ProblemSection>

                {/* Solution Section */}
                <FiturCard></FiturCard>

                {/* Join Us Section */}
                <JoinUs></JoinUs>

                {/* Footer */}
            </div>
        </GuestLayout>
    );
}
