import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesHomePage from "./pages/main/NotesAppHomePage";
import NoteEditorPage from "./pages/Note/NotePage";

export function App() {
	return (
		<Routes>
			<Route
				path="/:category"
				element={
					<Layout>
						<NotesHomePage />
					</Layout>
				}
			/>

			<Route path="/note/:id" element={<NoteEditorPage />} />
		</Routes>
	);
}

export default App;
