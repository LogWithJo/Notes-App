export interface NoteType {
	id: number;
	date: number;
	title: string;
	deleted: boolean;
	category: string;
	content: string;
}

export interface NotesStore {
	notes: NoteType[];
	categories: string[];
	currentCategory: string;
	searchText: string;
	addNewCategory: (category: string[]) => void;
	updateSearchText: (newVal: string) => void;
	createNewNote: (title: string, catogry: string) => void;
	deleteNote: (id: number) => void;
	setCurrentCategory: (category: string) => void;
	deleteNoteForEver: (id: number) => void;
	editNote: (id: number, title: string, content: string) => void;
}

export interface TAddNoteDialogData {
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

export type SaveStatus = "editing" | "saving" | "saved";
