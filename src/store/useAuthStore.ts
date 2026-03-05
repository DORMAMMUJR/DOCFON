import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer' | 'franchise';
}

interface AuthStore {
    token: string | null;
    user: AuthUser | null;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            isAdmin: () => get().user?.role === 'admin',
        }),
        {
            name: 'docfon-auth-storage',
        }
    )
);
