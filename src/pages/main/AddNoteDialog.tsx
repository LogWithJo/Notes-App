import { ArrowLeft, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import {
	useAddCategoryFieldData,
	useAddNoteDialogOnSubmit,
} from "@/hooks/hooks";
import { useAddNoteDialog } from "@/stores/FilterNotes.store";
import { SelectDemo } from "./Select";

export default function AddNoteDialog() {
	const {
		titleError,
		isOpen,
		title,
		setTitle,
		toggleIsOpen,
		isAddCategoryOpen,
	} = useAddNoteDialog();
	const { handleSubmit } = useAddNoteDialogOnSubmit();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(e) => {
				toggleIsOpen(e);
			}}
		>
			<DialogTrigger render={<Button size="lg" className="shadow-sm" />}>
				<PlusIcon className="size-4" />
				<span className="hidden sm:inline">Add new note</span>
				<span className="sm:hidden">New</span>
			</DialogTrigger>
			<DialogContent>
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
								{isAddCategoryOpen ? <AddCategoryField /> : <CategorySelect />}
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

function CategorySelect() {
	const { setIsAddCategoryOpen: onClick } = useAddNoteDialog();
	return (
		<div className="flex gap-4 justify-around items-center">
			<SelectDemo />
			<Button
				variant="secondary"
				className="cursor-pointer"
				onClick={() => {
					onClick(true);
				}}
			>
				<PlusIcon />
			</Button>
		</div>
	);
}

function AddCategoryField() {
	const { error, handleClick, close, handleInputChange, category } =
		useAddCategoryFieldData();
	return (
		<div className="flex  justify-around items-center gap-3">
			<Button
				className="cursor-pointer"
				onClick={close}
				variant={category.length > 0 ? "destructive" : "secondary"}
			>
				<ArrowLeft />
			</Button>
			<Input
				className={`${error ? "border-red-400" : ""}`}
				value={category}
				placeholder="Work | Personal"
				onChange={handleInputChange}
			/>
			<Button className="cursor-pointer" onClick={handleClick}>
				Add Category
			</Button>
		</div>
	);
}
