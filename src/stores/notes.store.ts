import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { InfoType } from "@/types/type";

export const useInfo = create<InfoType>()(
	devtools(
		persist(
			(set) => ({
				notes: [],
				currentCategory: "all",
				setCurrentCategory: (category) => {
					set(() => {
						return { currentCategory: category };
					});
				},
				createNewNote: (title, catogry) => {
					set((state) => {
						const newNotes = [
							...state.notes,
							{ id: Date.now(), title, deleted: false, catogry, content: "" },
						];
						return { notes: newNotes };
					});
				},
				deleteNote: (id) => {
					set((state) => {
						const newNotes = state.notes.map((note) => ({
							...note,
							deleted: note.id === id ? !note.deleted : note.deleted,
						}));
						return { notes: newNotes };
					});
				},
				editNote: (id, title, content) => {
					set((state) => {
						const [note] = state.notes.filter((not) => not.id === id);
						const newNotes = [
							{ ...note, title, content },
							...state.notes.filter((not) => not.id !== id),
						];
						return { notes: newNotes };
					});
				},
			}),
			{ name: "notes-storage" },
		),
	),
);
