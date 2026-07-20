import { Check, Loader2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNotePageData } from "@/hooks/hooks";

export default function NoteEditorHeader({ id }: { id: number }) {
	const { isSaving, navigate } = useNotePageData(id);
	return (
		<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<Badge variant="secondary">Draft</Badge>
					<Status id={id} />
				</div>

				<Button
					onClick={() => {
						if (isSaving) return;
						navigate("/");
					}}
				>
					<Save className="mr-2 size-4" />
					Save
				</Button>
			</div>
		</header>
	);
}

function Status({ id }: { id: number }) {
	const { isSaving } = useNotePageData(id);
	return (
		<div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-all">
			{isSaving ? (
				<>
					<Loader2 className="size-4 animate-spin text-primary" />
					<span>Saving...</span>
				</>
			) : (
				<>
					<Check className="size-4 text-emerald-500" />
					<span>Saved</span>
				</>
			)}
		</div>
	);
}
