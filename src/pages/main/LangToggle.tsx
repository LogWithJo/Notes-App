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
import { Commands } from "@/lib/constants";
import { getCommands, getHotKey } from "@/lib/utils";

function LangToggle() {
	const { t } = useTranslation();
	const { toggleLang } = useLang();
	useHotkeys(getHotKey(Commands.LANGAUGE_COMMAND), (e) => {
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
						{t("Tooltips.language")}
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							{getCommands(Commands.LANGAUGE_COMMAND)}
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default LangToggle;
