import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { FormEventHandler } from "react";
import foto from "../assets/login.png";
import { motion } from "framer-motion";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const loginWithGoogle = () => {
        window.location.href = "/oauth/google/redirect";
    };

    return (
        <GuestLayout>
            <Head title="Masuk - Panduan Nifas & KB" />
            <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-12 w-full items-center">
                    {/* Left Content */}
                    <div className="hook">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl xl:text-6xl font-bold mb-6 text-blue-600 leading-tight">
                                Selamat Datang di Rumah Nifas
                            </h1>
                            <p className="text-gray-600 mb-8 text-lg xl:text-xl leading-relaxed">
                                Panduan lengkap untuk kesehatan ibu dari masa
                                nifas hingga KB. Belum memiliki akun?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                                >
                                    Daftar di sini
                                </Link>
                            </p>
                        </motion.div>
                    </div>

                    {/* Center Image */}
                    <div className="image flex justify-center">
                        <motion.img
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            src={foto}
                            alt="Ibu dan Bayi"
                            className="w-full max-w-md h-auto rounded-2xl "
                        />
                    </div>

                    {/* Right Form */}
                    <div className="form">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
                        >
                            <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
                                Masuk Akun
                            </h2>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        className="text-gray-700 font-medium"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-2 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg shadow-sm py-3"
                                        autoComplete="username"
                                        placeholder="masukkan@email.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Kata Sandi"
                                        className="text-gray-700 font-medium"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-2 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg shadow-sm py-3"
                                        autoComplete="current-password"
                                        placeholder="masukkan kata sandi"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked || false
                                                )
                                            }
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Ingat saya
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-blue-600 hover:text-blue-700 underline focus:outline-none"
                                        >
                                            Lupa kata sandi?
                                        </Link>
                                    )}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                                >
                                    {processing ? "Memproses..." : "Masuk"}
                                </motion.button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            atau masuk dengan
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={loginWithGoogle}
                                    className="mt-4 w-full bg-white text-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            fill="#FFC107"
                                            d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.6 7.5-6.2 0-11.2-5-11.2-11.2S18.5 13 24.7 13c2.8 0 5.3 1 7.3 2.7l5.6-5.6C34.5 7.2 29.6 5 24.7 5 13.7 5 5 13.7 5 24.7S13.7 44.4 24.7 44.4c11 0 19.7-8.7 19.7-19.7 0-1.6-.2-3.1-.6-4.2z"
                                        />
                                        <path
                                            fill="#FF3D00"
                                            d="M6.3 14.7l6.6 4.8c1.8-3.5 5.3-6 9.4-6 2.8 0 5.3 1.1 7.1 2.9l5.7-5.7C31.3 6.6 28.1 5 24.7 5c-6.8 0-12.6 3.9-15.6 9.7z"
                                        />
                                        <path
                                            fill="#4CAF50"
                                            d="M24.7 44.4c4.9 0 9.3-1.9 12.6-5l-6-4.9c-1.8 1.4-4.1 2.2-6.6 2.2-4.8 0-8.9-3.1-10.5-7.4l-6.6 5.1c2.9 5.6 8.8 9.3 15.1 9.3z"
                                        />
                                        <path
                                            fill="#1976D2"
                                            d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2.1 3.6-3.8 4.8l6 4.9c1.9-1.8 3.4-4.1 4.1-6.7.4-1.2.6-2.6.6-4 0-1.3-.2-2.5-.6-3.5z"
                                        />
                                    </svg>
                                    <span>Masuk dengan Google</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile & Tablet Layout */}
                <div className="lg:hidden w-full max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            src={foto}
                            alt="Ibu dan Bayi"
                            className="w-48 h-48 object-cover mx-auto mb-6 rounded-full shadow-xl"
                        />
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                            Panduan Masa Nifas & KB
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            Masuk untuk mengakses panduan kesehatan ibu
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-blue-100"
                    >
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg shadow-sm py-3"
                                    autoComplete="username"
                                    placeholder="masukkan@email.com"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="text-gray-700 font-medium"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg shadow-sm py-3"
                                    autoComplete="current-password"
                                    placeholder="masukkan kata sandi"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked || false
                                            )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600">
                                        Ingat saya
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-blue-600 hover:text-blue-700 underline"
                                    >
                                        Lupa kata sandi?
                                    </Link>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                            >
                                {processing ? "Memproses..." : "Masuk"}
                            </motion.button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        atau masuk dengan
                                    </span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={loginWithGoogle}
                                className="mt-4 w-full bg-white text-gray-700 px-4 py-3 rounded-xl shadow-md hover:shadow-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 48 48">
                                    <path
                                        fill="#FFC107"
                                        d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.6 7.5-6.2 0-11.2-5-11.2-11.2S18.5 13 24.7 13c2.8 0 5.3 1 7.3 2.7l5.6-5.6C34.5 7.2 29.6 5 24.7 5 13.7 5 5 13.7 5 24.7S13.7 44.4 24.7 44.4c11 0 19.7-8.7 19.7-19.7 0-1.6-.2-3.1-.6-4.2z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.3 14.7l6.6 4.8c1.8-3.5 5.3-6 9.4-6 2.8 0 5.3 1.1 7.1 2.9l5.7-5.7C31.3 6.6 28.1 5 24.7 5c-6.8 0-12.6 3.9-15.6 9.7z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24.7 44.4c4.9 0 9.3-1.9 12.6-5l-6-4.9c-1.8 1.4-4.1 2.2-6.6 2.2-4.8 0-8.9-3.1-10.5-7.4l-6.6 5.1c2.9 5.6 8.8 9.3 15.1 9.3z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2.1 3.6-3.8 4.8l6 4.9c1.9-1.8 3.4-4.1 4.1-6.7.4-1.2.6-2.6.6-4 0-1.3-.2-2.5-.6-3.5z"
                                    />
                                </svg>
                                <span>Masuk dengan Google</span>
                            </motion.button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Belum memiliki akun?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                                >
                                    Daftar di sini
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
