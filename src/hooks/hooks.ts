import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NoteType } from "@/lib/type";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotesStore } from "@/stores/notes.store";

export function useFilterNotes() {
	const category = useParams();
	const currentCategory = category.category
	const { notes: beforeInit, searchText } = useNotesStore();
	const filteredNotes = useMemo(() => {
		return currentCategory === "all" || !currentCategory
			? beforeInit.filter((note) => !note.deleted)
			: currentCategory === "trash"
				? beforeInit.filter((note) => note.deleted)
				: beforeInit.filter((note) => note.category === currentCategory);
	}, [beforeInit, currentCategory]);
	const searchedNotes = useMemo(() => {
		return filteredNotes.filter((note) =>
			note.title.toLowerCase().includes(searchText.toLowerCase()),
		);
	}, [filteredNotes, searchText]);

	const isSearching = searchText.trim().length > 0;
	const notes: NoteType[] = useMemo(() => {
		return isSearching ? searchedNotes : filteredNotes;
	}, [isSearching, searchedNotes, filteredNotes]);
	return { isSearching, notes };
}

export function useAddNoteDialogOnSubmit() {
	const { notes, createNewNote } = useNotesStore();
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
			(note) =>
				!note.deleted &&
				note.title.toLowerCase() === titleTrimmed.toLowerCase(),
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
		if (!validate()) return;

		createNewNote(titleTrimmed.toLowerCase(), categoryTrimmed.toLowerCase());

		setTitle("");
		setCategory("");
		toggleIsOpen(false);
		setTitleError(null);
	}
	return {
		handleSubmit,
	};
}

export function useAddCategoryFieldData() {
	const { setIsAddCategoryOpen } = useAddNoteDialogStore();
	const { addNewCategory } = useNotesStore();
	const [error, setIsError] = useState(false);
	const [category, setCategory] = useState("");
	function close() {
		setIsAddCategoryOpen(false);
		setCategory("");
	}
	function handleClick() {
		if (category.length === 0) {
			setIsError(true);
			return false;
		}
		addNewCategory([category.toLowerCase()]);
		setIsAddCategoryOpen(false);
	}
	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setIsError(false);
		setCategory(e.target.value);
	}
	return { error, handleClick, handleInputChange, category, close };
}

export function useNotePageData(id: number) {
	const navigate = useNavigate();
	const { notes, editNote } = useNotesStore();
	const [isSaving, setIsSaving] = useState(false);
	const [note] = notes.filter((not) => Number(not.id) === Number(id));
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	if (note === undefined) {
		navigate("/");
	}

	useEffect(() => {
		function load() {
			setIsSaving(true);
		}
		load();

		const timeout = setTimeout(() => {
			editNote(Number(id), title, content);
			setIsSaving(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [content, id, editNote, title]);
	return {
		isSaving,
		title,
		content,
		navigate,
		setTitle,
		setContent,
	};
}
