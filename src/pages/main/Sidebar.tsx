import type React from "react";
import { useInfo } from "@/stores/notes.store";
import AddNoteDialog from "./AddNoteDialog";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar({
	categories,
	info,
}: {
	categories: readonly string[];
	info: {
		isOpen: boolean;
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
}) {
	const { setCurrentCategory } = useInfo();
	return (
		<aside className="w-64 h-screen bg-white border-r border-gray-200 p-6 flex flex-col justify-between sticky top-0">
			<div>
				<div className="flex items-center space-x-2 mb-6">
					<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
						N
					</div>
					<span className="text-xl font-bold tracking-tight">Notify Me</span>
				</div>

				<AddNoteDialog isOpen={info.isOpen} setIsOpen={info.setIsOpen} />

				<SidebarLinks categories={categories} />
			</div>

			<button
				type="button"
				className="pt-4 border-t border-gray-100"
				onClick={() => {
					setCurrentCategory("trash");
				}}
			>
				<div
					className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors font-medium"
				>
					<span>🗑️</span> <span>Removed Notes</span>
				</div>
			</button>
		</aside>
	);
}
