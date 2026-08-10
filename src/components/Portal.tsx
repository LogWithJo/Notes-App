import { CheckCircle2, Undo2 } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNotesStore } from "@/stores/notes.store";
import { Button } from "./ui/button";

function DeleteNotePortal() {
	const {
		isDeleteNotePortalOpen,
		toggleIsDeleteNotePortalOpen,
		lastDeletedNote,
		createNewNote,
	} = useNotesStore();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setTimeout(() => {
            console.log("closing portal");
			toggleIsDeleteNotePortalOpen(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, [isDeleteNotePortalOpen, toggleIsDeleteNotePortalOpen]);

	return createPortal(
		<div
			className={`${isDeleteNotePortalOpen ? "block" : "hidden"} fixed z-[999] top-4 left-1/2 -translate-x-1/2 w-80 overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-lg animate-in slide-in-from-top-2 fade-in duration-300`}
		>
			<div className="flex items-center gap-3 p-4">
				<CheckCircle2 className="h-5 w-5 text-primary shrink-0" />

				<div className="text-sm font-medium text-foreground">
					Note deleted successfully
				</div>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => {
						toggleIsDeleteNotePortalOpen(false);
						if (!lastDeletedNote) return;
						createNewNote(
							lastDeletedNote.title,
							lastDeletedNote.category,
							lastDeletedNote.content,
							lastDeletedNote.date,
							lastDeletedNote.isPin,
						);
					}}
					className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
				>
					<Undo2 className="h-3.5 w-3.5" />
					Undo
				</Button>
			</div>

			{/* progress bar */}
			<div className="h-1 w-full bg-muted">
				<div
					className="h-full bg-primary"
					style={{
						animation: `toast-progress 5000ms linear forwards`,
					}}
				/>
			</div>

			<style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
		</div>,
		document.body,
	);
}

export default DeleteNotePortal;
