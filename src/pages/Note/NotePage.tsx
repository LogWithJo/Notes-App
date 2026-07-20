import { useParams } from "react-router-dom";
import NoteEditorHeader from "./NoteEditorHeader";
import NoteEditorMain from "./NoteEditorMain";

function NotePage() {
	const { id } = useParams();
	return (
		<>
			<NoteEditorHeader id={Number(id)} />

			<NoteEditorMain id={Number(id)} />
		</>
	);
}

export default NotePage;
