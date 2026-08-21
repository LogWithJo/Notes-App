import type { Languages, SORT } from "./constants";

export interface NoteType {
	id: number;
	date: number;
	title: string;
	isPin: boolean;
	category: string;
	content: string;
}

export type AvailableLang = (typeof Languages)[number];

export type SortTypes = (typeof SORT)[keyof typeof SORT];
export interface NotesStore {
	lastDeletedNote: NoteType | null;
	setLastDeletedNote: (note: NoteType | null) => void;
	isDeleteNotePortalOpen: boolean;
	toggleIsDeleteNotePortalOpen: (toggle: boolean) => void;
	isErrorPortalOpen: boolean;
	toggleIsErrorPortalOpen: (toggle: boolean) => void;
	sortedBy: SortTypes;
	notes: NoteType[];
	categories: string[];
	searchText: string;
	setSortedBy: (sortedBy: SortTypes) => void;
	addNewCategory: (category: string[]) => void;
	updateSearchText: (newVal: string) => void;
	createNewNote: (
		title: string,
		category: string,
		content?: string,
		id?: number,
		date?: number,
		isPin?: boolean,
	) => void;
	deleteNote: (id: number) => void;
	editNote: (id: number, title: string, content: string) => void;
	togglePin: (id: number) => void;
}

export interface AddNoteDialogData {
	title: string;
	category: string;
	titleError: string | null;
	isOpen: boolean;
	isAddCategoryOpen: boolean;
	setIsAddCategoryOpen: (toggle: boolean) => void;
	toggleIsOpen: (toggle: boolean) => void;
	setTitleError: (error: string | null) => void;
	setCategory: (category: string) => void;
	setTitle: (title: string) => void;
}

export interface TNotePage {
	showLoadingPage: boolean;
	title: string;
	content: string;
	isSaving: boolean;

	setTitle: (title: string) => void;
	setLoadingPage: (toggle: boolean) => void;
	setContent: (content: string) => void;
	setIsSaving: (isSaving: boolean) => void;

	loadNote: (note: NoteType) => void;
	reset: () => void;
}
