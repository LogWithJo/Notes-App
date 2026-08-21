import { Separator } from "@base-ui/react";
import { useTranslation } from "react-i18next";
import NotifactionPortal from "@/components/NotifactionPortal";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilterNotes } from "@/hooks/useFilterNotes.hook";
import { Commands } from "@/lib/constants";
import { getCommands } from "@/lib/utils";
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
			<NotifactionPortal />
		</main>
	);
}

function SideBar() {
	const { t } = useTranslation();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<SidebarTrigger />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						{t("Tooltips.sideBar")}
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							{getCommands(Commands.SIDEBAR_COMMAND)}
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
