import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const user = usePage().props.auth.user;
    const [nifasStartDate, setNifasStartDate] = useState("");
    const [nifasEndDate, setNifasEndDate] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        nifas_start_date: "",
        nifas_end_date: "",
    });

    const submitNifasDates = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("profile.update-nifas-dates"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-800">
                    Nifas Profile
                </h2>
            }
        >
            <Head title="Nifas Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Header Section */}
                    <div className="bg-white p-8 shadow sm:rounded-lg">
                        <div className="flex items-center space-x-6">
                            <div className="h-24 w-24 overflow-hidden rounded-full bg-blue-100">
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-blue-200 text-blue-600">
                                        <span className="text-2xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-blue-800">
                                    {user.name}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Nifas Dates Section */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="max-w-xl">
                            <h2 className="text-lg font-medium text-blue-800">
                                Nifas Period
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Set your Nifas start and end dates.
                            </p>

                            <form
                                onSubmit={submitNifasDates}
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="nifas_start_date"
                                        value="Start Date"
                                    />
                                    <TextInput
                                        id="nifas_start_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.nifas_start_date}
                                        onChange={(e) =>
                                            setData(
                                                "nifas_start_date",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.nifas_start_date}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="nifas_end_date"
                                        value="End Date"
                                    />
                                    <TextInput
                                        id="nifas_end_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.nifas_end_date}
                                        onChange={(e) =>
                                            setData(
                                                "nifas_end_date",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.nifas_end_date}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Update Nifas Dates
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Profile Information Section */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Password Update Section */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account Section */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
