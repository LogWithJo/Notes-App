import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNotesStore } from "@/stores/notes.store";
import { Button } from "./ui/button";

function ErrorPortal() {
	const { isErrorPortalOpen, toggleIsErrorPortalOpen } = useNotesStore();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explaination>
	useEffect(() => {
		const timer = setTimeout(() => {
			toggleIsErrorPortalOpen(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isErrorPortalOpen, toggleIsErrorPortalOpen]);

	return createPortal(
		<div
			className={`${isErrorPortalOpen ? "block" : "hidden"} fixed z-999 top-4 left-1/2 -translate-x-1/2 w-80 overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-lg animate-in slide-in-from-top-2 fade-in duration-300`}
		>
			<div className="flex items-center gap-3 p-4">
				<CheckCircle2 className="h-5 w-5 text-primary shrink-0" />p

				<div className="text-sm font-medium text-foreground">
					Maximum number of Pin notes reached. Please unPin some notes to add new ones.
				</div>

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => toggleIsErrorPortalOpen(false)}
					className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
				>
					<X className="h-3.5 w-3.5" />
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

export default ErrorPortal;
