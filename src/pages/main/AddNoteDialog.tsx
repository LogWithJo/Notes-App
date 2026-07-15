import React, { type FormEvent } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useInfo } from "@/stores/notes.store";

export default function AddNoteDialog() {
	const { notes, createNewNote } = useInfo();

	const [title, setTitle] = React.useState("");
	const [category, setCategory] = React.useState("");
	const [titleError, setTitleError] = React.useState<string | null>(null);
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const titleTrimmed = title.trim();
	const categoryTrimmed = category.trim();

	const isDuplicateTitle = React.useMemo(() => {
		if (!titleTrimmed) return false;
		return notes.some(
			(note) =>
				!note.deleted &&
				note.title.toLowerCase() === titleTrimmed.toLowerCase(),
		);
	}, [notes, titleTrimmed]);

	function validate() {
		if (!titleTrimmed) {
			setTitleError("Title is required.");
			return false;
		}
		if (isDuplicateTitle) {
			setTitleError("A note with this title already exists.");
			return false;
		}
		setTitleError(null);
		return true;
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!validate()) return;

		createNewNote(titleTrimmed.toLowerCase(), categoryTrimmed.toLowerCase());

		setTitle("");
		setCategory("");
		setIsOpen(false)
		setTitleError(null);
	}

	return (
		<Dialog open={isOpen} onOpenChange={(e) => { setIsOpen(e) }}>
			<DialogTrigger render={<Button size="lg" className="shadow-sm" />}>
				<PlusIcon className="size-4" />
				<span className="hidden sm:inline">Add new note</span>
				<span className="sm:hidden">New</span>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Add new Note</DialogHeader>

				<form onSubmit={handleSubmit}>
					<FieldSet>
						<FieldLegend>New note</FieldLegend>
						<FieldDescription>
							Fill title and category, then submit.
						</FieldDescription>

						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="note-title">Title</FieldLabel>
								<Input
									id="note-title"
									autoComplete="off"
									placeholder="My first note"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									aria-invalid={!!titleError}
								/>
								{titleError && <FieldError>{titleError}</FieldError>}
							</Field>

							<Field>
								<FieldLabel htmlFor="note-category">Category</FieldLabel>
								<Input
									id="note-category"
									autoComplete="off"
									placeholder="work | personal | id
eas"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
								<FieldDescription>
									Optional. Leave blank for uncategorized.
								</FieldDescription>
							</Field>
						</FieldGroup>

						<div className="mt-4 flex justify-end">
							<Button type="submit">Create</Button>
						</div>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	);
}
