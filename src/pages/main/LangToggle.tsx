import { Languages } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLang } from "@/hooks/hooks";

function LangToggle() {
	const { t } = useTranslation();
	const { toggleLang } = useLang();
	useHotkeys("ctrl+l, meta+l", (e) => {
		e.preventDefault();
		toggleLang();
	});
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button onClick={toggleLang}>
						<Languages />
						<span className="hidden md:block">{t("Header.language")}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						toggle Language
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘L
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default LangToggle;

// export default function LangToggle() {
// 	return (
// 		<TooltipProvider>
// 			<Tooltip>
// 				<TooltipTrigger asChild>
// 					<Button variant="ghost" size="icon">
// 						<SearchIcon />
// 					</Button>
// 				</TooltipTrigger>
// 				<TooltipContent>
// 					<p className="flex items-center gap-2">
// 						Search
// 						<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
// 							⌘K
// 						</kbd>
// 					</p>
// 				</TooltipContent>
// 			</Tooltip>
// 		</TooltipProvider>
// 	);
// }
