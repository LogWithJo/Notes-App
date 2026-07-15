import { SidebarTrigger } from "@/components/ui/sidebar";
import AddNoteDialog from "./AddNoteDialog";
import SearchBar from "./SearchBar";

export function NotesHeader() {
	return (

		<div className="flex justify-between items-center p-2 w-full">
			<SidebarTrigger />
			<div><SearchBar /></div>
			<AddNoteDialog />
		</div>
	);
}



