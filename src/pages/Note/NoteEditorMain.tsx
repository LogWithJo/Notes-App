import { Separator } from "@base-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotePageData } from "@/hooks/hooks";

export default function NoteEditorMain({ id }: { id: number }) {
	const { title, content, setTitle, setContent } =
		useNotePageData(id);
	return (
		<main className="mx-auto w-full max-w-5xl p-6">
			<Card className="shadow-lg">
				<CardHeader className="pb-4">
					<CardTitle className="text-muted-foreground text-sm">
						Note Editor
					</CardTitle>
				</CardHeader>

				<Separator />

				<CardContent className="space-y-6 pt-6">
					<TextareaAutosize
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						rows={1}
						placeholder="Untitled Note"
						className="w-full resize-none bg-transparent text-5xl font-bold outline-none placeholder:text-muted-foreground"
					/>

					<TextareaAutosize
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						placeholder="Start writing..."
						className="min-h-[65vh] w-full resize-none bg-transparent text-base leading-8 outline-none placeholder:text-muted-foreground"
					/>
					<Separator />
				</CardContent>
			</Card>
		</main>
	);
}
