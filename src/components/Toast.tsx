import { CheckCircle2, Undo2, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNotesStore } from "@/stores/notes.store";
import { Button } from "./ui/button";

interface ToastProps {
	message: string;
	duration: number;
	variation: "success" | "error";
}

function Toast({ message, duration, variation }: ToastProps) {
	const {
		isDeleteNotePortalOpen,
		toggleIsDeleteNotePortalOpen,
		isErrorPortalOpen,
		toggleIsErrorPortalOpen,
	} = useNotesStore();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanatio>
	useEffect(() => {
		const timer = setTimeout(() => {
			if (variation === "error") {
				toggleIsErrorPortalOpen(false);
			} else {
				toggleIsDeleteNotePortalOpen(false);
			}
		}, duration);
		return () => clearTimeout(timer);
	}, [
		duration,
		variation,
		isDeleteNotePortalOpen,
		toggleIsDeleteNotePortalOpen,
		isErrorPortalOpen,
		toggleIsErrorPortalOpen,
	]);

	return createPortal(
		<div
			className={`${(variation === "error" ? isErrorPortalOpen : isDeleteNotePortalOpen) ? "block" : "hidden"} fixed z-999 top-4 left-1/2 -translate-x-1/2 w-80 overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-lg animate-in slide-in-from-top-2 fade-in duration-300`}
		>
			<div className="flex items-center gap-3 p-4">
				<CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
				<div className="text-sm font-medium text-foreground">{message}</div>
				<ExitButton variation={variation} />
			</div>

			<ProgressBar duration={duration} />
		</div>,
		document.body,
	);
}

export default Toast;

function ProgressBar({ duration }: { duration: number }) {
	return (
		<div className="h-1 w-full bg-muted">
			<div
				className="h-full bg-primary"
				style={{
					animation: `toast-progress ${duration}ms linear forwards`,
				}}
			/>
		</div>
	);
}

function ExitButton({ variation }: { variation: "success" | "error" }) {
	const {
		toggleIsDeleteNotePortalOpen,
		toggleIsErrorPortalOpen,
		lastDeletedNote,
		createNewNote,
	} = useNotesStore();
	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={() => {
				if (variation === "error") {
					toggleIsErrorPortalOpen(false);
				} else {
					toggleIsDeleteNotePortalOpen(false);
					if (!lastDeletedNote) return;
					createNewNote(
						lastDeletedNote.title,
						lastDeletedNote.category,
						lastDeletedNote.content,
						lastDeletedNote.date,
						lastDeletedNote.isPin,
					);
				}
			}}
			className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
		>
			{variation === "success" ? (
				<>
					<Undo2 className="h-3.5 w-3.5" />
					Undo
				</>
			) : (
				<X className="h-3.5 w-3.5" />
			)}
		</Button>
	);
}
