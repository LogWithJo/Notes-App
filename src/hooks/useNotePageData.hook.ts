import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotePage } from "@/stores/notePage.store";
import { useNotesStore } from "@/stores/notes.store";

export function useNotePageData(id: number) {
	const { notes, editNote } = useNotesStore();
	const navigate = useNavigate();
	const { loadNote, title, content, setIsSaving } = useNotePage();

	// render the note at the page start only
	useEffect(() => {
		const [note] = notes.filter((note) => note.id === id) || null;
		if (!note) navigate(`/note/all`);
		const load = () => loadNote(note);
		load();
	}, [id, navigate, notes, loadNote]);

	// save the notes dynamic
	useEffect(() => {
		const time1 = setTimeout(() => {
			setIsSaving(true);
		}, 1000);
		const time2 = setTimeout(() => {
			setIsSaving(false);
			if (title.trim().length === 0 && content.trim().length === 0) return
			editNote(id, title || content.split(" ")[0].slice(0, 9), content);
		}, 2000);
		return () => {
			clearTimeout(time1);
			clearTimeout(time2);
		};
	}, [title, content, editNote, id, setIsSaving]);
}

// AI coded
// export function useNotePageData(id: number) {
// 	const navigate = useNavigate();
// 	const { title, content, loadNote, setIsSaving } = useNotePage();
// 	const { notes, editNote } = useNotesStore();
// 	const firstRender = useRef(true);
// 	const note = notes.find((n) => Number(n.id) === Number(id));
// 	const loadedId = useRef<number | null>(null);

// 	// Save any unsaved note before existing the note page
// 	// biome-ignore lint/correctness/useExhaustiveDependencies: reload only when the route id changes
// 	useEffect(() => {
// 		const prevId = loadedId.current;
// 		if (prevId !== null && prevId !== Number(id)) {
// 			const prevNote = useNotesStore
// 				.getState()
// 				.notes.find((n) => Number(n.id) === prevId);
// 			if (
// 				prevNote &&
// 				(title !== prevNote.title || content !== prevNote.content)
// 			) {
// 				editNote(prevId, title, content);
// 			}
// 		}

// 		if (!note) {
// 			navigate("/");
// 			return;
// 		}

// 		loadedId.current = Number(note.id);
// 		loadNote(note);
// 	}, [id]);

// 	// save note traditionally
// 	useEffect(() => {
// 		if (!note) return;

// 		if (firstRender.current) {
// 			firstRender.current = false;
// 			return;
// 		}

// 		if (title === note.title && content === note.content) return;

// 		setIsSaving(true);

// 		const timeout = setTimeout(() => {
// 			editNote(Number(id), title, content);
// 			setIsSaving(false);
// 		}, 500);

// 		return () => clearTimeout(timeout);
// 	}, [title, content, id, note, editNote, setIsSaving]);

// 	// save any way if the user closes the page
// 	useEffect(() => {
// 		return () => {
// 			const prevId = loadedId.current;
// 			if (prevId === null) return;

// 			const { title: currentTitle, content: currentContent } =
// 				useNotePage.getState();
// 			const prevNote = useNotesStore
// 				.getState()
// 				.notes.find((n) => Number(n.id) === prevId);
// 			if (
// 				prevNote &&
// 				(currentTitle !== prevNote.title || currentContent !== prevNote.content)
// 			) {
// 				editNote(prevId, currentTitle, currentContent);
// 			}
// 		};
// 	}, [editNote]);
// }
