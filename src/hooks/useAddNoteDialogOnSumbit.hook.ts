import i18n from "@/i18n";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotesStore } from "@/stores/notes.store";
import { useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function useAddNoteDialogOnSubmit() {
	const { notes, createNewNote } = useNotesStore();
	const navigate = useNavigate();
	const {
		title,
		category,
		setTitleError,
		setTitle,
		setCategory,
		toggleIsOpen,
	} = useAddNoteDialogStore();

	const titleTrimmed = title.trim();
	const categoryTrimmed = category.trim();

	const isDuplicateTitle = useMemo(() => {
		if (!titleTrimmed) return false;
		return notes.some(
			(note) => note.title.toLowerCase() === titleTrimmed.toLowerCase(),
		);
	}, [titleTrimmed, notes]);

	function validate() {
		if (!titleTrimmed) {
			setTitleError("Title is required.");
			return false;
		}
		if (isDuplicateTitle) {
			setTitleError("A note with this title already exists.");
			return false;
		}
		setTitleError(null);
		return true;
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const id = Date.now()
		if (!validate()) return;

		createNewNote(titleTrimmed.toLowerCase(), categoryTrimmed.toLowerCase(), "", id);

		setTitle("");
		setCategory("");
		toggleIsOpen(false);
		setTitleError(null);
		navigate(`/note/${i18n.language}/${id}`);
	}
	return {
		handleSubmit,
	};
}