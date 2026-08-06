import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { useNotesStore } from "@/stores/notes.store";

export default function SearchBar() {
	const { t } = useTranslation();
	const { searchText, updateSearchText } = useNotesStore();
	return (
		<div>
			<Field>
				<InputGroup>
					<InputGroupInput
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
