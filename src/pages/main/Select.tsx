import type { ReactNode } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddNoteDialog } from "@/stores/FilterNotes.store";
import { useInfo } from "@/stores/notes.store";

export function SelectDemo() {
	const { categories } = useInfo();
	const { setCategory } = useAddNoteDialog();
	const newCateg: { label: ReactNode; value: string }[] = categories.map(
		(category) => ({
			label: <div>{category}</div>,
			value: category,
		}),
	);
	return (
		<Select
			items={newCateg}
			defaultValue={categories[categories.length - 1]}
			onValueChange={(value) => {
				if (typeof value !== "string") return;
				setCategory(value);
			}}
		>
			<SelectTrigger className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>
						{newCateg.length > 0 ? "Categories" : "No Categories Found"}
					</SelectLabel>
					{newCateg.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
