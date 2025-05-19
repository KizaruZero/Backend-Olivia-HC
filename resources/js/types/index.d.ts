export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_picture?: string;
    phone_number?: string;
    birth_date?: string;
    address?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
