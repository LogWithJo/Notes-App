import { useState } from "react";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotesStore } from "@/stores/notes.store";

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
