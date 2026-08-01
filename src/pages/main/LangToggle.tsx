import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/hooks";

function LangToggle() {
	const { t } = useTranslation();
	const { toggleLang } = useLang();
	return (
		<Button onClick={toggleLang}>
			<Languages />
			<span className="hidden md:block">{t("Header.language")}</span>
		</Button>
	);
}

export default LangToggle;
