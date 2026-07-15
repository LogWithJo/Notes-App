import { SidebarTrigger } from "@/components/ui/sidebar";
import AddNoteDialog from "./AddNoteDialog";
import SearchBar from "./SearchBar";

function Header() {
	return (
		<div className="flex justify-between items-center p-2 w-full">
			<SidebarTrigger />
      <div><SearchBar /></div>
			<AddNoteDialog />
		</div>
	);
}

export default Header;
