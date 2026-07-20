import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AddNoteDialogData } from "@/lib/type";

export const useAddNoteDialogStore = create<AddNoteDialogData>()(
	devtools(
		persist(
			(set) => ({
				title: "",
				category: "",
				titleError: null,
				isOpen: false,
				isAddCategoryOpen: false,
				setIsAddCategoryOpen: (toggle) => {
					set({ isAddCategoryOpen: toggle });
				},
				toggleIsOpen: (toggle) => {
					set((state) => ({
						isOpen: toggle,
						title: toggle ? state.title : "",
					}));
				},
				setTitleError: (error) => {
					set({ titleError: error });
				},
				setTitle: (title) => {
					set({ title });
				},
				setCategory: (category) => {
					set({ category });
				},
			}),
			{
				name: "AddNoteDialog-Storage",
			},
		),
	),
);
