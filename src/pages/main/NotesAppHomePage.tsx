import { Separator } from "@base-ui/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useInfo } from "@/stores/notes.store";
import AddNoteDialog from "./AddNoteDialog";
import { NotesHeader } from "./Header";
import Container, { NotesGrid, NotFound, Results } from "./NotesGrid";
import SearchBar from "./SearchBar";

export default function NotesHomePage() {
	const { notes } = useInfo();
	return (
		<main>
			<NotesHeader>
				<SidebarTrigger />
				<SearchBar />
				<AddNoteDialog />
			</NotesHeader>

			<Container>
				<Results />
				<Separator />
				{notes.length === 0 ? <NotFound /> : <NotesGrid />}
			</Container>
		</main>
	);
}
