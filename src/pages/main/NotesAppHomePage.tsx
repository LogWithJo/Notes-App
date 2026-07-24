import { Separator } from "@base-ui/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFilterNotes } from "@/hooks/hooks";
import AddNoteDialog from "./AddNoteDialog";
import NotesSection, {
	NoNotesFound,
	NotesGrid,
	NotesResultsHeader,
} from "./NotesGrid";
import { NotesHeader } from "./NotesHeader";
import SearchBar from "./SearchBar";

export default function NotesHomePage() {
	const { notes } = useFilterNotes();
	return (
		<main>
			<NotesHeader>
				<SidebarTrigger />
				<SearchBar />
				<AddNoteDialog />
			</NotesHeader>

			<NotesSection>
				<NotesResultsHeader />
				<Separator />
				{notes.length === 0 ? <NoNotesFound /> : <NotesGrid />}
			</NotesSection>
		</main>
	);
}
