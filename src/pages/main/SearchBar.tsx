import type React from "react";

export default function SearchBar({
	value: inputValue,
	set: setInputValue,
}: {
	value: string;
	set: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<div className="w-full max-w-2xl mx-auto mb-8">
			<div className="relative">
				<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
					🔍
				</span>
				<input
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					type="text"
					placeholder="Search notes by title..."
					className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
				/>
			</div>
		</div>
	);
}
