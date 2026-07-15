export interface NoteType {
	id: number;
	date: number;
	title: string;
	deleted: boolean;
	catogry: string;
	content: string;
}

export interface InfoType {
	notes: NoteType[];
	currentCategory: string;
	searchText: string;
	updateSearchText: (newVal: string) => void
	createNewNote: (title: string, catogry: string) => void;
	deleteNote: (id: number) => void;
	setCurrentCategory: (category: string) => void;
	deleteNoteForEver: (id: number) => void;
	editNote: (id: number, title: string, content: string) => void;
}
