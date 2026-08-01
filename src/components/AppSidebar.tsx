import { Files } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { useLang } from "@/hooks/hooks";
import { SELECT_ALL_NOTES } from "@/lib/constants";
import { useNotesStore } from "@/stores/notes.store";

export function AppSidebar() {
	const { t } = useTranslation();
	const { lang, category } = useLang();
	const navigate = useNavigate();
	const { notes } = useNotesStore();
	const categories = [
		...new Set(
			notes.map((note) => note.category).filter((categ) => categ !== ""),
		),
	];
	function handleClick(category: string) {
		navigate(`/notes/${lang}/${category}`);
	}
	function trans(dir: string) {
		const text = t(`SideBar.${dir}`);
		return text;
	}
	return (
		<Sidebar side={lang === "en" ? "left" : "right"}>
			<SidebarHeader>{trans("heading")}</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								isActive={category === SELECT_ALL_NOTES}
								onClick={() => {
									handleClick(SELECT_ALL_NOTES);
								}}
							>
								<Files className="size-4" />
								<span>{trans("all")}</span>
							</SidebarMenuButton>

							<SidebarHeader>{trans("heading")}</SidebarHeader>
							{categories.length > 0 ? (
								categories.map((note) => (
									<SidebarMenuButton
										isActive={category === note}
										key={note}
										onClick={() => handleClick(note)}
									>
										{note.toUpperCase()}
									</SidebarMenuButton>
								))
							) : (
								<SidebarMenuButton disabled>
									{trans("NotFound")}
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
