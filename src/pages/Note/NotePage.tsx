import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInfo } from "@/stores/notes.store";

function NotePage() {
	const navigate = useNavigate();
	const { notes, editNote } = useInfo();
	const { id } = useParams();
	const [note] = notes.filter((not) => Number(not.id) === Number(id));
	const [inputValue, setInputValue] = React.useState({
		title: note.title,
		content: note.content,
	});
	function saveNote() {
		editNote(Number(id), inputValue.title, inputValue.content);
		navigate("/");
	}
	return (
		<div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans">
			{/* Navigation / Header Bar */}
			<header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
				<div className="flex items-center space-x-2">
					<span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
					<span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
						Draft Mode
					</span>
				</div>

				{/* Actions aligned to the top right for quick access */}
				<div className="flex items-center gap-3">
					<Link
						to="/"
						className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-150 inline-flex items-center justify-center"
					>
						Cancel
					</Link>
					<button
						onClick={saveNote}
						type="button"
						className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-100 transition-all duration-150"
					>
						Save Note
					</button>
				</div>
			</header>

			{/* Main Editor Workspace */}
			<main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 py-10 flex flex-col gap-6">
				{/* Title Field (Borderless & Large) */}
				<div className="w-full">
					<textarea
						name="title"
						id="title"
						value={inputValue.title}
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								title: `${e.target.value}`,
							}));
						}}
						rows={1}
						placeholder="Untitled Note"
						className="w-full text-4xl font-bold text-slate-900 placeholder-slate-300 bg-transparent border-none resize-none focus:outline-none focus:ring-0 p-0 leading-tight"
					></textarea>
				</div>

				{/* Divider line that subtly separates title from content */}
				<hr className="border-slate-200" />

				{/* Content Field (Takes up the remaining vertical viewport space) */}
				<div className="flex-1 w-full flex">
					<textarea
						name="content"
						id="content"
						value={inputValue.content}
						onChange={(e) => {
							setInputValue((prev) => ({ ...prev, content: e.target.value }));
						}}
						placeholder="Start writing your thoughts here..."
						className="w-full flex-1 text-base text-slate-700 placeholder-slate-400 bg-transparent border-none resize-none focus:outline-none focus:ring-0 p-0 leading-relaxed min-h-[50vh]"
					></textarea>
				</div>
			</main>
		</div>
	);
}

export default NotePage;
