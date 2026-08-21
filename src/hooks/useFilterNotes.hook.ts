import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SELECT_ALL_NOTES, sortFunctions } from "@/lib/constants";
import type { NoteType } from "@/lib/type";
import { useNotesStore } from "@/stores/notes.store";

export function useFilterNotes() {
	const category = useParams();
	const currentCategory = category.category;
	const { notes: beforeInit, searchText, sortedBy } = useNotesStore();

	const filteredNotes = useMemo(() => {
		return currentCategory === SELECT_ALL_NOTES || !currentCategory
			? beforeInit
			: beforeInit.filter((note) => note.category === currentCategory);
	}, [beforeInit, currentCategory]);

	const searchedNotes = useMemo(() => {
		return filteredNotes.filter((note) =>
			note.title.toLowerCase().includes(searchText.toLowerCase()),
		);
	}, [filteredNotes, searchText]);

	const isSearching = searchText.trim().length > 0;

	const notes: NoteType[] = useMemo(() => {
		const compareFn: (a: NoteType, b: NoteType) => number =
			sortFunctions[sortedBy];
		return isSearching
			? searchedNotes.sort((a, b) => Number(b.isPin) - Number(a.isPin))
			: filteredNotes
					.sort(compareFn)
					.sort((a, b) => Number(b.isPin) - Number(a.isPin));
	}, [isSearching, searchedNotes, filteredNotes, sortedBy]);

	return { isSearching, notes };
}
