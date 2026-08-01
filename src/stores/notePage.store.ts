import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { NoteType } from "@/lib/type";

interface TNotePage {
	title: string;
	content: string;
	isSaving: boolean;

	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setIsSaving: (isSaving: boolean) => void;

	loadNote: (note: NoteType) => void;
	reset: () => void;
}

export const useNotePage = create<TNotePage>()(
	devtools(
		persist(
			(set) => ({
				title: "",
				content: "",
				isSaving: false,

				setTitle: (title) => set({ title }),

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
