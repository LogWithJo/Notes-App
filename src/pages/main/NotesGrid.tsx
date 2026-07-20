import { FileTextIcon, SearchXIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFilterNotes } from "@/hooks/hooks";
import { useNotesStore } from "@/stores/notes.store";
import NoteCard from "./NoteCard";

export default function NotesSection({ children }: { children: ReactNode }) {
	return <section className="space-y-5 px-2 py-4 sm:px-4">{children}</section>;
}

export function NotesResultsHeader() {
	const { isSearching } = useFilterNotes();
	const { searchText, notes } = useNotesStore();
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div className="space-y-1.5">
				<div className="flex items-center gap-2">
					<div className="flex size-9 items-center justify-center rounded-lg border bg-background shadow-xs">
						<FileTextIcon className="size-4 text-muted-foreground" />
					</div>
					<h2 className="text-2xl font-semibold tracking-tight text-foreground">
						Notes
					</h2>
				</div>
				<p className="max-w-xl text-sm text-muted-foreground">
					{isSearching ? (
						<span>
							Results for
							<span className="font-medium text-foreground">
								“{searchText.trim()}”
							</span>
						</span>
					) : (
						"Recent notes, sorted into a clean workspace."
					)}
				</p>
			</div>

			<Badge variant="secondary" className="h-7 rounded-full px-3">
				{notes.length} note{notes.length === 1 ? "" : "s"}
			</Badge>
		</div>
	);
}

export function NoNotesFound() {
	const { isSearching } = useFilterNotes();
	return (
		<Card className="border-dashed bg-muted/20 shadow-none">
			<CardHeader className="items-center text-center">
				<div className="mb-2 flex size-12 items-center justify-center rounded-full border bg-background">
					<SearchXIcon className="size-5 text-muted-foreground" />
				</div>
				<CardTitle>No notes found</CardTitle>
				<CardDescription>
					{isSearching
						? "Try a different search."
						: "Create your first note to get started."}
				</CardDescription>
			</CardHeader>
			<CardContent className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2">
				<div className="h-2 rounded-full bg-muted" />
				<div className="h-2 rounded-full bg-muted" />
				<div className="h-2 rounded-full bg-muted" />
			</CardContent>
		</Card>
	);
}

export function NotesGrid() {
	const { notes } = useNotesStore();
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
			{notes.map((note) => (
				<NoteCard key={note.id} note={note} />
			))}
		</div>
	);
}
