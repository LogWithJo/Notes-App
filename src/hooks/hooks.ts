import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NoteType } from "@/lib/type";
import { useAddNoteDialog } from "@/stores/FilterNotes.store";
import { useInfo } from "@/stores/notes.store";

export function useFilterNotes() {
	const { notes: beforeIint, currentCategory, searchText } = useInfo();
	const filteredNotes = useMemo(() => {
		return currentCategory === "all"
			? beforeIint.filter((note) => !note.deleted)
			: currentCategory === "trash"
				? beforeIint.filter((note) => note.deleted)
				: beforeIint.filter((note) => note.category === currentCategory);
	}, [beforeIint, currentCategory]);
	const filterNotesBySearch = useMemo(() => {
		return filteredNotes.filter((note) =>
			note.title.toLowerCase().includes(searchText.toLowerCase()),
		);
	}, [filteredNotes, searchText]);

	const isSearching = searchText.trim().length > 0;
	const notes: NoteType[] = useMemo(() => {
		return isSearching ? filterNotesBySearch : filteredNotes;
	}, [isSearching, filterNotesBySearch, filteredNotes]);
	return { isSearching, notes };
}

export function useAddNoteDialogOnSubmit() {
	const { notes, createNewNote } = useInfo();
	const {
		title,
		category,
		setTitleError,
		setTitle,
		setCategory,
		toggleIsOpen,
	} = useAddNoteDialog();

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
	const { setIsAddCategoryOpen } = useAddNoteDialog();
	const { addNewCategory } = useInfo();
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
	const { notes, editNote } = useInfo();
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
