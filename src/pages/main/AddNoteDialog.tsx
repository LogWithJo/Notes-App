import { ArrowLeft, PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
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
import {
	useAddCategoryFieldData,
	useAddNoteDialogOnSubmit,
	useLang,
} from "@/hooks/hooks";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { CategorySelect } from "./CategorySelect";

export default function AddNoteDialog() {
	const { t } = useTranslation();
	function trans(direction: string) {
		const text = t(`Header.addNoteDialog.${direction}`);
		return text;
	}
	const {
		titleError,
		isOpen,
		title,
		setTitle,
		toggleIsOpen,
		isAddCategoryOpen,
	} = useAddNoteDialogStore();
	const { handleSubmit } = useAddNoteDialogOnSubmit();
	const { lang } = useLang();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(e) => {
				toggleIsOpen(e);
			}}
		>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="size-4" />
					<span className="hidden jmd:block">{trans("toggleButton")}</span>
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogTitle className="sr-only">{trans("title")}</DialogTitle>
				<DialogDescription className="sr-only">
					{trans("description")}
				</DialogDescription>
				<form onSubmit={handleSubmit}>
					<FieldSet>
						<FieldLegend>{trans("title")}</FieldLegend>
						<FieldDescription
							className={lang === "ar" ? "text-right" : "text-left"}
						>
							{trans("description")}
						</FieldDescription>

						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="note-title">
									{trans("titleInput.title")}
								</FieldLabel>
								<Input
									className="caret-blue-400"
									id="note-title"
									autoComplete="off"
									placeholder={trans("titleInput.placeholder")}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									aria-invalid={!!titleError}
								/>
								{titleError && (
									<FieldError>{trans("titleInput.required")}</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="note-category">
									{trans("categoryInput.title")}
								</FieldLabel>
								{isAddCategoryOpen ? (
									<AddCategoryInputField />
								) : (
									<CategorySelectField />
								)}
							</Field>
						</FieldGroup>

						<div className="mt-4 flex justify-end">
							<Button type="submit">{trans("submitButton")}</Button>
						</div>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function CategorySelectField() {
	const { setIsAddCategoryOpen: onClick } = useAddNoteDialogStore();
	return (
		<div className="flex gap-4 justify-around items-center">
			<CategorySelect />
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

function AddCategoryInputField() {
	const { t } = useTranslation();
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
				className={`${error ? "border-red-400" : ""} caret-blue-400`}
				value={category}
				placeholder="Work | Personal"
				onChange={handleInputChange}
			/>
			<Button className="cursor-pointer" onClick={handleClick}>
				{t("Header.addNoteDialog.categoryInput.button")}
			</Button>
		</div>
	);
}
