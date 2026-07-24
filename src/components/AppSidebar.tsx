import { Files, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNotesStore } from "@/stores/notes.store";

export function AppSidebar() {
	const navigate = useNavigate();
	const { notes } = useNotesStore();
	const categories = [
		...new Set(
			notes
				.filter((note) => !note.deleted)
				.map((note) => note.category)
				.filter((categ) => categ !== ""),
		),
	];
	function handleClick(category: string) {
		navigate(`/${category}`);
	}
	return (
		<Sidebar>
			<SidebarHeader>Categories</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								onClick={() => {
									handleClick("all");
								}}
							>
								<Files className="size-4" />
								<span>All</span>
							</SidebarMenuButton>

							<SidebarMenuButton
								onClick={() => {
									handleClick("trash");
								}}
							>
								<Trash2 className="size-4" />
								<span>Trash</span>
							</SidebarMenuButton>
							<SidebarHeader>Categories</SidebarHeader>
							{categories.length > 0 ? (
								categories.map((note) => (
									<SidebarMenuButton
										key={note}
										onClick={() => handleClick(note)}
									>
										{note}
									</SidebarMenuButton>
								))
							) : (
								<SidebarMenuButton disabled>No categories</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
