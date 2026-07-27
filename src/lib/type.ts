export interface NoteType {
	id: number;
	date: number;
	title: string;
	category: string;
	content: string;
}

export type AvailableLang = "en" | "ar";
export interface NotesStore {
	language: AvailableLang;
	notes: NoteType[];
	categories: string[];
	searchText: string;
	setLanguage: (lang: AvailableLang) => void;
	addNewCategory: (category: string[]) => void;
	updateSearchText: (newVal: string) => void;
	createNewNote: (title: string, category: string, content?: string, date?: number) => void;
	deleteNote: (id: number) => void;
	editNote: (id: number, title: string, content: string) => void;
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
