import { Check, Loader2, Save } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLang } from "@/hooks/hooks";
import { SAVENOTE_COMMAND } from "@/lib/constants";
import { getCommands, getHotKey } from "@/lib/utils";
import { useNotePage } from "@/stores/notePage.store";

export default function NoteEditorHeader() {
	const { t } = useTranslation();

	return (
		<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<Badge variant="secondary">{t("NotePage.draft")}</Badge>
					<Status />
				</div>

				<SaveButton />
			</div>
		</header>
	);
}

function Status() {
	const { t } = useTranslation();
	const { isSaving } = useNotePage();
	return (
		<div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-all">
			{isSaving ? (
				<>
					<Loader2 className="size-4 animate-spin text-primary" />
					<span>{t("NotePage.saving")}...</span>
				</>
			) : (
				<>
					<Check className="size-4 text-emerald-500" />
					<span>{t("NotePage.saved")}</span>
				</>
			)}
		</div>
	);
}

function SaveButton() {
	const { t } = useTranslation();
	const { lang } = useLang();
	const navigate = useNavigate();
	const { isSaving, reset, content } = useNotePage();

	function save() {
		if (content.trim().length === 0) return
		reset();
		navigate(`/notes/${lang}/all`);
	}

	useHotkeys(getHotKey(SAVENOTE_COMMAND), (e) => {
		e.preventDefault();
		save();
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button disabled={isSaving} onClick={save}>
						<Save className="mr-2 size-4" />
						{t("NotePage.save")}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						{t("Tooltips.saveNote")}
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							{getCommands(SAVENOTE_COMMAND)}
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
