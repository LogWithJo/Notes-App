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
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotesStore } from "@/stores/notes.store";

export function CategorySelect() {
	const { categories } = useNotesStore();
	const { setCategory } = useAddNoteDialogStore();
	const categoryItems: { label: ReactNode; value: string }[] = categories.map(
		(category) => ({
			label: <div>{category}</div>,
			value: category,
		}),
	);
	return (
		<Select
			items={categoryItems}
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
						{categoryItems.length > 0 ? "Categories" : "No Categories Found"}
					</SelectLabel>
					{categoryItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
