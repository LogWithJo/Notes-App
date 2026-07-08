import React, { useState } from "react";
import { useInfo } from "@/stores/notes.store";
import MobileNav from "./MobileNav";
import NotesGrid from "./NotesGrid";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

export default function NoteApp() {
	const { notes, currentCategory } = useInfo();
	const [inputValue, setInputValue] = React.useState("");
	const categories = [...new Set(notes.map(note => note.catogry))];
	const filteredNotes = currentCategory === "all"
	? notes.filter((note) => !note.deleted)
	: currentCategory === "trash"
	? notes.filter((note) => note.deleted)
	: notes.filter((note) => note.catogry === currentCategory);
	const [isOpen, setIsOpen] = useState(false);
	const filteredNotesBySearch = filteredNotes.filter((note) =>
		note.title.toLowerCase().includes(inputValue.trim().toLowerCase()),
	);

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800 font-sans">
			<div className="hidden md:block">
				<Sidebar categories={categories} info={{ isOpen, setIsOpen }} />
			</div>

			<MobileNav categories={categories} info={{ isOpen, setIsOpen }} />

			<main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
				<SearchBar
					value={inputValue}
					set={setInputValue}
				/>

				<NotesGrid notes={inputValue ? filteredNotesBySearch : filteredNotes} />
			</main>
		</div>
	);
}
