import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

function LoadingPage() {
	const { t } = useTranslation();

	return (
		<div className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-background/95 text-foreground backdrop-blur-sm">
			<div className="flex flex-col items-center gap-5">
				<p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
					{t("NotePage.pleaseWait")}
				</p>
				<div className="flex size-20 items-center justify-center rounded-full border bg-card shadow-lg">
					<Loader2 className="size-10 animate-spin text-primary" />
				</div>
			</div>
		</div>
	);
}

export default LoadingPage;
