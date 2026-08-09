import { Separator } from "@base-ui/react";
import { Toaster } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilterNotes } from "@/hooks/hooks";
import AddNoteDialog from "./AddNoteDialog";
import LangToggle from "./LangToggle";
import NotesSection, {
	NoNotesFound,
	NotesGrid,
	NotesResultsHeader,
} from "./NotesGrid";
import { NotesHeader } from "./NotesHeader";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function NotesHomePage() {
	const theme = localStorage.getItem("theme");
	const { notes } = useFilterNotes();
	return (
		<main>
			<NotesHeader>
				<SideBar />
				<SearchBar />
				<div className="flex justify-center gap-3">
					<ThemeToggle />
					<LangToggle />
					<AddNoteDialog />
				</div>
			</NotesHeader>

			<NotesSection>
				<NotesResultsHeader />
				<Separator />
				{notes.length === 0 ? <NoNotesFound /> : <NotesGrid />}
			</NotesSection>
			<Toaster
				position="top-center"
				theme={theme === "dark" || theme === "light" ? theme : undefined}
			/>
		</main>
	);
}

function SideBar() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<SidebarTrigger />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						Toggle Sidebar
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘B
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
