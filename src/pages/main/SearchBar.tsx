import { SearchIcon } from "lucide-react";
import { Field } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { useInfo } from "@/stores/notes.store";

export default function SearchBar() {
	const { searchText, updateSearchText } = useInfo();
	return (
		<div>
			<Field>
				<InputGroup>
					<InputGroupInput
						value={searchText}
						onChange={(e) => {
							updateSearchText(e.target.value);
						}}
						id="inline-start-input"
						placeholder="Search..."
					/>
					<InputGroupAddon align="inline-start">
						<SearchIcon className="text-muted-foreground"></SearchIcon>
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</div>
	);
}
