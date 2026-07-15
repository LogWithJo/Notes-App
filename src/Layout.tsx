import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1">
					{/* <SidebarTrigger /> */}
					{children}
				</main>
			</SidebarProvider>
		</div>
	);
}
