import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import i18n from "@/i18n";
import { AR, EN, MOBILE_BREAKPOINT, SELECT_ALL_NOTES } from "@/lib/constants";
import type { AvailableLang, NoteType } from "@/lib/type";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotePage } from "@/stores/notePage.store";
import { useNotesStore } from "@/stores/notes.store";

export function useFilterNotes() {
	const category = useParams();
	const currentCategory = category.category;
	const { notes: beforeInit, searchText } = useNotesStore();

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
		return isSearching
			? searchedNotes.sort((a, b) => Number(b.isPin) - Number(a.isPin))
			: filteredNotes.sort((a, b) => Number(b.isPin) - Number(a.isPin));
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

	const { title, content, loadNote, setIsSaving } = useNotePage();

	const { notes, editNote } = useNotesStore();

	const firstRender = useRef(true);
	const note = notes.find((n) => Number(n.id) === Number(id));

	// The note id we last loaded, so we can flush its pending edits when we
	// switch to another note or leave the page.
	const loadedId = useRef<number | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: reload only when the route id changes
	useEffect(() => {
		// Flush pending edits for the previously open note before switching.
		const prevId = loadedId.current;
		if (prevId !== null && prevId !== Number(id)) {
			const prevNote = useNotesStore
				.getState()
				.notes.find((n) => Number(n.id) === prevId);
			if (
				prevNote &&
				(title !== prevNote.title || content !== prevNote.content)
			) {
				editNote(prevId, title, content);
			}
		}

		if (!note) {
			navigate("/");
			return;
		}

		loadedId.current = Number(note.id);
		loadNote(note);
	}, [id]);

	useEffect(() => {
		if (!note) return;

		if (firstRender.current) {
			firstRender.current = false;
			return;
		}

		// Ignore the run triggered by `loadNote` — the editor is already in
		// sync with the note, so we must not save or flip the saving state.
		// This guard also stops the "Saving..." loop: after `editNote` replaces
		// the note object, `note` changes and re-runs this effect, but the
		// values match, so we bail out instead of starting another save.
		if (title === note.title && content === note.content) return;

		setIsSaving(true);

		const timeout = setTimeout(() => {
			editNote(Number(id), title, content);
			setIsSaving(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [title, content, id, note, editNote, setIsSaving]);

	// Flush any pending edits when leaving the page, so the latest changes
	// are never lost (the debounce timer would otherwise just be cancelled).
	useEffect(() => {
		return () => {
			const prevId = loadedId.current;
			if (prevId === null) return;

			const { title: currentTitle, content: currentContent } =
				useNotePage.getState();
			const prevNote = useNotesStore
				.getState()
				.notes.find((n) => Number(n.id) === prevId);
			if (
				prevNote &&
				(currentTitle !== prevNote.title || currentContent !== prevNote.content)
			) {
				editNote(prevId, currentTitle, currentContent);
			}
		};
	}, [editNote]);
}

export function useHandleDeleteNote(id: number) {
	const { notes, deleteNote, createNewNote } = useNotesStore();
	const deletedNote: NoteType | undefined = notes.find(
		(note) => note.id === id,
	);

	function hadnleDelete() {
		deleteNote(id);

		toast.success("Note deleted", {
			duration: 5000,
			action: {
				label: "Undo",
				onClick: () => {
					if (!deletedNote) return;
					createNewNote(
						deletedNote.title,
						deletedNote.category,
						deletedNote.content,
						deletedNote.date,
						deletedNote.isPin,
					);
				},
			},
		});
	}
	return hadnleDelete;
}

export function useLang() {
	const { lang = "en", category = "all" } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!lang) return;

		const isRTL = lang === "ar";
		i18n.changeLanguage(lang);
		document.documentElement.lang = lang;
		document.documentElement.dir = isRTL ? "rtl" : "ltr";
	}, [lang]);

	function toggleLang() {
		const newLang: AvailableLang = lang === AR ? EN : AR;
		navigate(`/notes/${newLang}/${category}`);
	}

	return { lang, category, toggleLang };
}

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean>(
		() => window.innerWidth < MOBILE_BREAKPOINT,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
		);

		const onChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};

		const setMobile = () => setIsMobile(mediaQuery.matches);
		setMobile();

		mediaQuery.addEventListener("change", onChange);

		return () => {
			mediaQuery.removeEventListener("change", onChange);
		};
	}, []);

	return isMobile;
}
