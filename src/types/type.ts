export interface NoteType {
	id: number;
	title: string;
	deleted: boolean;
	catogry: string;
	content: string;
}

export interface InfoType {
	notes: NoteType[];
	currentCategory: string;
	createNewNote: (title: string, catogry: string) => void;
	deleteNote: (id: number) => void;
	setCurrentCategory: (category: string) => void;
	editNote: (id: number, title: string, content: string) => void;
}
