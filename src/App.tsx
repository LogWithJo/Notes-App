import { Route, Routes } from "react-router-dom";
import NotesHomePage from "./pages/main/NotesAppHomePage";

import NotePage from "./pages/Note/NotePage";

export function App() {
	return <Routes>
		<Route path='/' element={<NotesHomePage />} />

		<Route path='/notes/:id' element={<NotePage />} />
	</Routes>;
}

export default App;
