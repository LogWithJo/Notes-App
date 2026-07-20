import { Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteNoteDialog({
	isOpen,
	setIsOpen,
	deleteNoteForEver,
	id,
	title,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	deleteNoteForEver: (id: number) => void;
	id: number;
	title: string;
}) {
	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={(e) => {
				setIsOpen(e);
			}}
		>
			<AlertDialogTrigger>
				<Button variant="destructive">
					<Trash2 className="size-4" />
					Delete
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent className="sm:max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<Trash2 className="size-5 text-destructive" />
						Delete note?
					</AlertDialogTitle>

					<AlertDialogDescription>
						This action cannot be undone.
						<div className="font-medium">{title}</div>
						This note will be permanently removed from your device.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<AlertDialogAction
						onClick={() => {
							deleteNoteForEver(id);
						}}
						className="bg-destructive hover:bg-destructive/90"
					>
						Delete note
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
