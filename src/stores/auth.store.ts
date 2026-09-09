import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AUTH_TYPE {
    token: string | null,
    setToken: (newToken: string) => void
}

export const useAuthStore = create<AUTH_TYPE>()(
	devtools(
		persist(
			(set) => ({
                token: null,
                setToken: (newToken) => {
                    set({token: newToken})
                }
            }),
			{ name: "notes-storage" },
		),
	),
);
