import { Separator } from "@base-ui/react";
import { ArrowLeft, Clock, Save } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInfo } from "@/stores/notes.store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TextareaAutosize from 'react-textarea-autosize';

function NotePage() {
	const navigate = useNavigate();
	const { notes, editNote } = useInfo();
	const { id } = useParams();
	const [note] = notes.filter((not) => Number(not.id) === Number(id));
	const [inputValue, setInputValue] = React.useState({
		title: note.title,
		content: note.content,
	});
	function saveNote() {
		editNote(Number(id), inputValue.title, inputValue.content);
		navigate("/");
	}
	return (
		<>
			<Header saveNote={saveNote} />
			<MainSection inputValue={inputValue} setInputValue={setInputValue} />
		</>
	);
}

export default NotePage;

function Header({ saveNote }: { saveNote: () => void }) {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<SidebarTrigger />
					<Badge variant="secondary">Draft</Badge>

					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Clock className="size-4" />
						<span>Editing note</span>
					</div>
				</div>

				<div className="flex gap-2">
					<Button variant="outline">
						<Link to="/" className='flex'>
							<ArrowLeft className="mr-2 size-4" />
							Cancel
						</Link>
					</Button>

					<Button onClick={saveNote}>
						<Save className="mr-2 size-4" />
						Save
					</Button>
				</div>
			</div>
		</header>
	);
}

function MainSection({
	inputValue,
	setInputValue,
}: {
	inputValue: {
		title: string;
		content: string;
	};
	setInputValue: Dispatch<
		SetStateAction<{
			title: string;
			content: string;
		}>
	>;
}) {
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
						value={inputValue.title}
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						rows={1}
						placeholder="Untitled Note"
						className="w-full resize-none bg-transparent text-5xl font-bold outline-none placeholder:text-muted-foreground"
					/>

					<TextareaAutosize
						value={inputValue.content}
						onChange={(e) =>
							setInputValue((prev) => ({
								...prev,
								content: e.target.value,
							}))
						}
						placeholder="Start writing..."
						className="min-h-[65vh] w-full resize-none bg-transparent text-base leading-8 outline-none placeholder:text-muted-foreground"
					/>
					<Separator />
				</CardContent>
			</Card>
		</main>
	);
}
