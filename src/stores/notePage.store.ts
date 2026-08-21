import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { TNotePage } from "@/lib/type";

export const useNotePage = create<TNotePage>()(
	devtools(
		persist(
			(set) => ({
				showLoadingPage: false,
				title: "",
				content: "",
				isSaving: false,

				setTitle: (title) => set({ title }),

				setLoadingPage: (toggle) => {
					set({ showLoadingPage: toggle });
					const time = setTimeout(() => {
						set({ showLoadingPage: false });
					}, 1000);
					return () => {
						clearTimeout(time);
					};
				},
				setContent: (content) => set({ content }),

				setIsSaving: (isSaving) => set({ isSaving }),

				loadNote: (note) =>
					set({
						title: note.title,
						content: note.content,
						isSaving: false,
					}),

				reset: () =>
					set({
						title: "",
						content: "",
						isSaving: false,
					}),
			}),
			{ name: "NotePage-storage" },
		),
	),
);
