import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { NotesStore } from "@/lib/type";

export const useNotesStore = create<NotesStore>()(
	devtools(
		persist(
			(set) => ({
				language: "en",
				notes: [],
				searchText: "",
				categories: ["work", "personal"],
				setLanguage: (lang) => {
					set({language: lang})
				},
				addNewCategory: (category) => {
					set((state) => {
						return {
							categories: [...new Set([...state.categories, ...category])],
						};
					});
				},
				updateSearchText: (newVal) => {
					set({ searchText: newVal });
				},
				createNewNote: (title, category, content, date) => {
					set((state) => {
						const newNotes = [
							...state.notes,
							{
								id: Date.now(),
								date: date || Date.now(),
								title,
								deleted: false,
								category,
								content: content || "",
							},
						];
						return { notes: newNotes, searchText: "" };
					});
				},
				deleteNote: (id) => {
					set((state) => {
						return { notes: state.notes.filter(note => note.id !== id), searchText: "" };
					});
				},
				editNote: (id, title, content) => {
					set((state) => {
						const [note] = state.notes.filter((not) => not.id === id);
						const newNotes = [
							{ ...note, title, content },
							...state.notes.filter((not) => not.id !== id),
						];
						return { notes: newNotes, searchText: "" };
					});
				},
			}),
			{ name: "notes-storage" },
		),
	),
);
