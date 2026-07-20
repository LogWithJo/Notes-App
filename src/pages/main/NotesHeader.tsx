import type { ReactNode } from "react";

export function NotesHeader({ children }: { children: ReactNode }) {
	return (
		<div className="flex justify-between items-center p-2 w-full">
			{children}
		</div>
	);
}
