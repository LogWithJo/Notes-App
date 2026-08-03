import { Separator } from "@base-ui/react";
import { Toaster } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
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

export default function NotesHomePage() {
	const theme = localStorage.getItem("theme");
	const { notes } = useFilterNotes();
	return (
		<main>
			<NotesHeader>
				<SidebarTrigger />
				<SearchBar />
				<div className="flex justify-center gap-3">
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
