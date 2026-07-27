import {
	ClockIcon,
	FolderIcon,
	MoreHorizontalIcon,
	Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleDeleteNote } from "@/hooks/hooks";
import type { NoteType } from "@/lib/type";

export default function NoteCard({ note }: { note: NoteType }) {
	const hasContent = note.content.trim().length > 0;
	const handleDelete = useHandleDeleteNote(note.id);

	function formatDaysAgo(date: number) {
		const now = new Date();
		const then = new Date(date);

		const diffTime = now.getTime() - then.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 30) return `${diffDays} days ago`;

		return then.toLocaleDateString();
	}

	return (
		<Card className="group h-full overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
			<CardHeader className="gap-3 px-5 pt-5">
				<div className="flex items-start justify-between gap-3">
					<Link to={`/notes/${note.id}`} className="min-w-0 flex-1">
						<CardTitle className="line-clamp-2 text-lg leading-snug transition-colors group-hover:text-primary">
							{note.title}
						</CardTitle>
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
							<MoreHorizontalIcon className="size-4" />
							<span className="sr-only">Open note menu</span>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-36">
							<DropdownMenuItem
								onClick={handleDelete}
								variant="destructive"
								className="cursor-pointer"
							>
								<Trash2Icon className="size-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<Badge variant="outline" className="gap-1 rounded-full px-2.5">
						<FolderIcon className="size-3" />
						{note.category}
					</Badge>
				</div>
			</CardHeader>

			<Link to={`/note/${note.id}`} className="flex flex-1 flex-col">
				<CardContent className="flex-1 px-5 pb-5">
					<p className="line-clamp-4 min-h-20 text-sm leading-6 text-muted-foreground">
						{hasContent ? note.content : "No content yet."}
					</p>
				</CardContent>
			</Link>

			<CardFooter className="border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
				<div className="flex w-full items-center justify-between gap-3">
					<span className="inline-flex items-center gap-1.5">
						<ClockIcon className="size-3.5" />
						{formatDaysAgo(note.date)}
					</span>
					<span className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-transform group-hover:scale-125" />
				</div>
			</CardFooter>
		</Card>
	);
}
