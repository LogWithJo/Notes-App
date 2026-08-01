import { useParams } from "react-router-dom";
import { useNotePageData } from "@/hooks/hooks";
import NoteEditorHeader from "./NoteEditorHeader";
import NoteEditorMain from "./NoteEditorMain";

function NotePage() {
	const { id } = useParams();
	useNotePageData(Number(id));
	return (
		<>
			<NoteEditorHeader />

			<NoteEditorMain />
		</>
	);
}

export default NotePage;
