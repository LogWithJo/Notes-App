import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Commands } from "@/lib/constants";
import { getCommands, getHotKey } from "@/lib/utils";
import { useNotesStore } from "@/stores/notes.store";

export default function SearchBar() {
	const { t } = useTranslation();
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Search />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						{t("Tooltips.search")}
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							{getCommands(Commands.SEARCH_COMMAND)}
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function Search() {
	const { t } = useTranslation();
	const { searchText, updateSearchText } = useNotesStore();
	const input = useRef<HTMLInputElement>(null);
	useHotkeys(getHotKey(Commands.SEARCH_COMMAND), (e) => {
		e.preventDefault();
		input.current?.focus();
	});
	return (
		<div>
			<Field>
				<InputGroup>
					<InputGroupInput
						ref={input}
						value={searchText}
						onChange={(e) => {
							updateSearchText(e.target.value);
						}}
						className="caret-blue-400"
						id="inline-start-input"
						placeholder={t("Header.search")}
					/>
					<InputGroupAddon align="inline-start">
						<SearchIcon className="text-muted-foreground"></SearchIcon>
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</div>
	);
}
