import { useState } from "react";
import AddNoteDialog from "./AddNoteDialog";
import SidebarLinks from "./SidebarLinks";
import { Button } from "@base-ui/react/button";

export default function MobileNav({
	categories,
	info,
}: {
	categories: readonly string[];
	info: {
		isOpen: boolean;
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="md:hidden z-40">
			<div className="flex justify-between w-full items-center p-4">
				<div>
					<button
						type="button"
						onClick={() => setIsOpen(true)}
						className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none"
					>
						☰
					</button>
				</div>
				<AddNoteDialog isOpen={info.isOpen} setIsOpen={info.setIsOpen} />
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50">
					<button
						type="button"
						className="fixed inset-0 bg-black/40 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>

					<div className="fixed inset-y-0 left-0 w-72 bg-white p-6 shadow-xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
						<div>
							<div className="flex justify-between items-center mb-6">
								<div className="flex items-center space-x-2">
									<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
										N
									</div>
									<span className="text-xl font-bold">Notify Me</span>
								</div>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="text-gray-400 text-xl hover:text-gray-600"
								>
									✕
								</button>
							</div>

							<SidebarLinks categories={categories} />
						</div>

						<div className="pt-4 border-t border-gray-100">
							<Button onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-3 py-2 text-red-600 rounded-lg text-sm font-medium">
								<span>🗑️</span> <span>Removed Notes</span>
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
