import type React from "react";

function AddButton({
	set,
}: {
	set: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div>
			<button
				onClick={() => set(prev => !prev)}
				type="button"
				className="w-full p-2 inline-flex items-center justify-center space-x-2 rounded-xl text-sm font-medium h-11 bg-indigo-600 text-white hover:bg-indigo-700 shadow transition-colors cursor-pointer"
			>
				<span>+</span> <span>Add Note</span>
			</button>
		</div>
	);
}

export default AddButton;
