import { FileTextIcon, SearchXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoteCard from "./NoteCard";
import type { NoteType } from "@/lib/type";
import { useInfo } from "@/stores/notes.store";

export default function NotesGrid() {
	const { notes: beforeIint, currentCategory, searchText } = useInfo();
	const filteredNotes = currentCategory === "all" ? beforeIint : currentCategory === "trash" ? beforeIint.filter(note => note.deleted) : beforeIint.filter(note => note.catogry === currentCategory)
	const filterNotesBySearch = filteredNotes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase()))

	const isSearching = searchText.trim().length > 0
	const notes: NoteType[] = isSearching ? filterNotesBySearch : filteredNotes


	return (
		<section className="space-y-5 px-2 py-4 sm:px-4">
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

			<Separator />

			{notes.length === 0 ? (
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
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
					{notes.map((note) => (
						<NoteCard key={note.id} note={note} />
					))}
				</div>
			)}
		</section>
	);
}
