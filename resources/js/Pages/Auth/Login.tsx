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
            <Head title="Log in" />
            <div className="container mx-auto mt-20 grid grid-cols-3 gap-x-8 ">
                <div className="hook items-center mx-auto my-auto">
                    <h1 className="text-7xl font-bold  mb-4">
                        Sign In to get your nutrients
                    </h1>
                    <p className="text-gray-600 mb-8 text-xl mt-8">
                        If you don’t have an account you can{" "}
                        <Link
                            href={route("register")}
                            className="text-blue-500 hover:underline"
                        >
                            Register Here
                        </Link>
                    </p>
                </div>
                <div className="image mx-auto ">
                    <motion.img
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        src={foto}
                        alt="Hero Image"
                        className="hidden md:block w-3/4 h-auto mx-auto"
                    />
                </div>
                <div className="form my-auto">
                    <form onSubmit={submit} className="form ">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">
                                Selamat Datang, Bunda!
                            </h1>
                            <InputLabel htmlFor="email" value="Email" />

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
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

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
                        </div>

                        <div className="mt-4 grid grid-cols-2 ">
                            <div className="remember">
                                <label className=" items-center col-span-1">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                (e.target.checked ||
                                                    false) as false
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                            <div className="forgot-password col-end-7">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white mt-4 px-6 py-3 w-full rounded-3xl text-xl shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </motion.button>
                    </form>
                    {/* or continue with */}
                    <div className="or mt-4 text-center">
                        <p className="text-gray-600">or continue with</p>
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
                            <svg className="w-6 h-6" viewBox="0 0 48 48">
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
                </div>
            </div>
        </GuestLayout>
    );
}
