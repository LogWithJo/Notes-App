import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesHomePage from "./pages/main/NotesAppHomePage";
import NoteEditorPage from "./pages/Note/NotePage";

export function App() {
	return (
		<Routes>
			<Route index element={<Navigate to={"/notes/evn/all"} replace />} />
			<Route
				path="/notes/:lang/:category"
				element={
					<Layout>
						<NotesHomePage />
					</Layout>
				}
			/>

			<Route path="/note/:lang/:id" element={<NoteEditorPage />} />
		</Routes>
	);
}

export default App;
