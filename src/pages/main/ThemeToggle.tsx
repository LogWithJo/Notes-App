import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { DARK_MODE, LIGHT_MODE, THEME_COMMAND } from "@/lib/constants";
import { getCommands, getHotKey } from "@/lib/utils";

export default function ThemeToggle() {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();

	useHotkeys(getHotKey(THEME_COMMAND), (e) => {
		e.preventDefault();
		setTheme(theme === DARK_MODE ? LIGHT_MODE : DARK_MODE);
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						variant="default"
						onClick={() =>
							setTheme(theme === DARK_MODE ? LIGHT_MODE : DARK_MODE)
						}
					>
						{theme === LIGHT_MODE ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
						<span className="hidden md:block">
							{theme === LIGHT_MODE ? t("Header.light") : t("Header.dark")}
						</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						{t("Tooltips.theme")}
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							{getCommands(THEME_COMMAND)}
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
