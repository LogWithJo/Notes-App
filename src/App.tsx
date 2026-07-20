import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesHomePage from "./pages/main/NotesAppHomePage";
import NotePage from "./pages/Note/NotePage";

export function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<NotesHomePage />
					</Layout>
				}
			/>

			<Route path="/notes/:id" element={<NotePage />} />
		</Routes>
	);
}

export default App;
