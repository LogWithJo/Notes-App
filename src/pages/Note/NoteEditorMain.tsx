import { Separator } from "@base-ui/react";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotePageData } from "@/hooks/hooks";

export default function NoteEditorMain({ id }: { id: number }) {
	const { t } = useTranslation();
	const { title, content, setTitle, setContent } = useNotePageData(id);
	return (
		<main className="mx-auto w-full max-w-5xl p-6">
			<Card className="shadow-lg">
				<CardHeader className="pb-4">
					<CardTitle className="text-muted-foreground text-sm">
						{t("NotePage.noteEditor")} | {t("NotePage.words")}:{" "}
						{content.split(" ").filter((word) => !!word).length} |{" "}
						{t("NotePage.characters")}:{" "}
						{content.split("").filter((char) => char !== " ").length}
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
						placeholder={t("NotePage.untitled")}
						className="w-full resize-none bg-transparent text-5xl font-bold outline-none placeholder:text-muted-foreground"
					/>

					<TextareaAutosize
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						placeholder={`${t("NotePage.placeholder")}...`}
						className="min-h-[65vh] w-full resize-none bg-transparent text-base leading-8 outline-none placeholder:text-muted-foreground"
					/>
					<Separator />
				</CardContent>
			</Card>
		</main>
	);
}
