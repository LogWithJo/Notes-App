import React from "react";
import { useInfo } from "@/stores/notes.store";
import AddButton from "./AddButton";

export default function AddNoteDialog({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { notes } = useInfo();
	const [showError, setShowError] = React.useState(false);
	const [inputValues, setInputValues] = React.useState({
		title: "",
		category: "",
	});
	const { createNewNote } = useInfo();
	function handleClick() {
		setIsOpen(false);
		setInputValues({ title: "", category: "" });
		const result = verify(inputValues.title);
		console.log(result)
		if (result) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 1000);
			return
		}
		createNewNote(inputValues.title, inputValues.category);
	}

	function verify(text: string) {
		if (!inputValues.title) return true;
		return [...notes.map((note) => note.title)].some((title) => title.toLowerCase() === text.toLowerCase());
	}

	return (
		<div className="p-2">
			<AddButton set={setIsOpen} />

			{isOpen && (
				<div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center">
					<button
						type="button"
						className="fixed inset-0 bg-black/50 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>

					<div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-gray-100 animate-in fade-in-50 zoom-in-95 duration-200 z-10 mx-4">
						<div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
							<h2 className="text-lg font-semibold leading-none tracking-tight">
								Create New Note
							</h2>
							<p className="text-sm text-gray-500">
								Add details to kickstart your next thought.
							</p>
						</div>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<div className="text-right text-sm font-medium text-gray-600">
									Title
								</div>
								<input
									type="text"
									placeholder="Note title..."
									className="col-span-3 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
									value={inputValues.title}
									onChange={(e) => {
										setInputValues((prev) => ({
											...prev,
											title: e.target.value,
										}));
									}}
								/>
								{showError && <div>error</div>}
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<div className="text-right text-sm font-medium text-gray-600">
									Category
								</div>
								<input
									type="text"
									placeholder="Note Category..."
									className="col-span-3 flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
									value={inputValues.category}
									onChange={(e) => {
										setInputValues((prev) => ({
											...prev,
											category: e.target.value,
										}));
									}}
								/>
							</div>
						</div>

						<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2 gap-2">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									handleClick();
								}}
								className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
							>
								Save Note
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
