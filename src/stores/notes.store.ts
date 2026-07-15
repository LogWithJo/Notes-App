import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { InfoType } from "@/lib/type";

export const useInfo = create<InfoType>()(
	devtools(
		persist(
			(set) => ({
				notes: [],
				currentCategory: "all",
				searchText: "",
				updateSearchText: (newVal) => {
					set({searchText: newVal})
				},
				setCurrentCategory: (category) => {
					set(() => {
						return { currentCategory: category, searchText: "" };
					});
				},
				createNewNote: (title, catogry) => {
					set((state) => {
						const newNotes = [
							...state.notes,
							{ id: Date.now(), date: Date.now(), title, deleted: false, catogry, content: "" },
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
					set(state => {
						const newNotes = state.notes.filter(note => note.id !== id)
						return {notes: newNotes, searchText: ""}
					})
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
