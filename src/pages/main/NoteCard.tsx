import { Button } from "@base-ui/react/button";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInfo } from "@/stores/notes.store";
import type { NoteType } from "@/types/type";

export default function NoteCard({ note }: { note: NoteType }) {
	const { deleteNote } = useInfo();
	return (
		<div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between cursor-pointer group">
			<Link to={`/notes/${note.id}`}>
				<div>
					<h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
						{note.title}
					</h3>
					<p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
						{note.content}
					</p>
				</div>
			</Link>

			<div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
				<span>Just now</span>
				<DropdownMenu>
					<DropdownMenuTrigger>
						{/* <Button>Options</Button> */}
						<Button className="text-gray-400 hover:text-gray-600">•••</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => {
								deleteNote(note.id);
							}}
							className={"text-red-500 cursor-pointer"}
						>
							{note.deleted ? 'undelete' : 'delete'}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
