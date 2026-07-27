import { Files } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SELECT_ALL_NOTES } from "@/lib/constants";
import { useNotesStore } from "@/stores/notes.store";

export function AppSidebar() {
	const category = useParams();
	const navigate = useNavigate();
	const { notes } = useNotesStore();
	const categories = [
		...new Set(
			notes.map((note) => note.category).filter((categ) => categ !== ""),
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
								isActive={category.category === SELECT_ALL_NOTES}
								onClick={() => {
									handleClick("all");
								}}
							>
								<Files className="size-4" />
								<span>All</span>
							</SidebarMenuButton>

							<SidebarHeader>Categories</SidebarHeader>
							{categories.length > 0 ? (
								categories.map((note) => (
									<SidebarMenuButton
										isActive={category.category === note}
										key={note}
										onClick={() => handleClick(note)}
									>
										{note.toUpperCase()}
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
