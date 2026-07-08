import type { NoteType } from "@/types/type";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes }: {notes: NoteType[]}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">Recent Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.title} note={note} />
        ))}
      </div>
    </div>
  );
}