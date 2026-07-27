import { toast } from "sonner";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { NotesStore, NoteType } from "@/lib/type";

export const useNotesStore = create<NotesStore>()(
	devtools(
		persist(
			(set) => ({
				language: "en",
				notes: [],
				searchText: "",
				categories: ["work", "personal"],
				setLanguage: (lang) => {
					set({ language: lang });
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
				createNewNote: (title, category, content, date, isPin) => {
					set((state) => {
						const newNotes = [
							...state.notes,
							{
								id: Date.now(),
								date: date || Date.now(),
								title,
								isPin,
								category,
								content: content || "",
							},
						];
						return { notes: newNotes, searchText: "" };
					});
				},
				deleteNote: (id) => {
					set((state) => {
						return {
							notes: state.notes.filter((note) => note.id !== id),
							searchText: "",
						};
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
				togglePin: (id) => {
					set((state) => {
						const numberOfPins = state.notes.filter(
							(note: NoteType) => note.isPin,
						).length;
						if (
							numberOfPins >= 3 &&
							!state.notes.find((note) => note.id === id)?.isPin // you want to pin (false => true)
						) {
							toast.error("only 3");
							return {};
						}
						const newNotes = state.notes.map((note) => ({
							...note,
							isPin: note.id === id ? !note.isPin : note.isPin,
						}));
						return { notes: newNotes };
					});
				},
			}),
			{ name: "notes-storage" },
		),
	),
);
