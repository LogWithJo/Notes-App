import {  Route, Routes } from "react-router-dom";
import NoteApp from "./pages/main/NotesAppHomePage";
import NotePage from "./pages/Note/NotePage";

export function App() {
	return <Routes>
		<Route path='/' element={<NoteApp />} />
		<Route path='/notes/:id' element={<NotePage />} />
	</Routes>;
}

export default App;
