import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // Animation variants
    const formItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 },
        },
        tap: { scale: 0.95 },
    };

    const loginWithGoogle = () => {
        window.location.href = "/oauth/google/redirect";
    };

    return (
        <GuestLayout>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Left Section - Image and Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center p-8"
                >
                    <div className="max-w-md mx-auto text-center">
                        {/* Image placeholder - replace with actual maternal health image */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-8 rounded-full bg-white p-2 inline-block"
                        >
                            <img
                                src={profile}
                                alt="Maternal Health"
                                className="rounded-full w-40 h-40 object-cover"
                            />
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-3xl font-bold mb-4"
                        >
                            Maternal Health Monitor
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="text-lg mb-6"
                        >
                            Comprehensive care for every stage of your maternal
                            journey
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="mb-8 text-blue-100"
                        >
                            <p className="mb-4">
                                ✓ Personalized health tracking
                            </p>
                            <p className="mb-4">
                                ✓ Expert guidance & resources
                            </p>
                            <p className="mb-4">✓ Community support network</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Section - Registration Form */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <Head title="Register - Maternal Health Monitor" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-2xl font-semibold text-blue-800">
                                Create Your Account
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Join our maternal health community today
                            </p>
                        </motion.div>

                        <form onSubmit={submit} className="space-y-6">
                            <motion.div
                                custom={0}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                            >
                                <InputLabel
                                    htmlFor="name"
                                    value="Full Name"
                                    className="text-blue-800"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </motion.div>

                            <motion.div
                                custom={1}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                            >
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                    className="text-blue-800"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </motion.div>

                            <motion.div
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                            >
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-blue-800"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </motion.div>

                            <motion.div
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                            >
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="text-blue-800"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border-blue-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                                {/* or continue with */}
                                <div className="or mt-4 text-center">
                                    <p className="text-gray-600">
                                        or continue with
                                    </p>
                                </div>
                                <div className="social-login mt-4 flex justify-center space-x-4">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-3 rounded-3xl shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        onClick={loginWithGoogle}
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.23 10.44 22v-7.01H7.9v-2.92h2.54V9.71c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34V22C18.34 21.23 22 17.1 22 12.07z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="bg-white text-black px-4 py-3 rounded-3xl shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                                        onClick={loginWithGoogle}
                                    >
                                        <svg
                                            className="w-6 h-6"
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
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                custom={4}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                                className="flex items-center justify-between"
                            >
                                <Link
                                    href={route("login")}
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                                >
                                    Already registered?
                                </Link>

                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <PrimaryButton
                                        className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white px-6 py-2 rounded-md shadow-md"
                                        disabled={processing}
                                    >
                                        Create Account
                                    </PrimaryButton>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                custom={5}
                                initial="hidden"
                                animate="visible"
                                variants={formItemVariants}
                                className="text-center text-xs text-gray-500"
                            >
                                By registering, you agree to our Terms and
                                Privacy Policy
                            </motion.div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
