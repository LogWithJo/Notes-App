import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { NotesStore } from "@/lib/type";

export const useNotesStore = create<NotesStore>()(
	devtools(
		persist(
			(set) => ({
				notes: [],
				searchText: "",
				categories: ["work", "personal"],
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
				createNewNote: (title, category) => {
					set((state) => {
						const newNotes = [
							...state.notes,
							{
								id: Date.now(),
								date: Date.now(),
								title,
								deleted: false,
								category,
								content: "",
							},
						];
						return { notes: newNotes, searchText: "" };
					});
				},
				deleteNote: (id) => {
					set((state) => {
						const newNotes = state.notes.map((note) => ({
							...note,
							deleted: note.id === id ? !note.deleted : note.deleted,
						}));
						return { notes: newNotes, searchText: "" };
					});
				},
				deleteNoteForEver: (id) => {
					set((state) => {
						const newNotes = state.notes.filter((note) => note.id !== id);
						return { notes: newNotes, searchText: "" };
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
