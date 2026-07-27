import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import i18n from "@/i18n";
import { AR, EN } from "@/lib/constants";
import { useNotesStore } from "@/stores/notes.store";

function LangToggle() {
	const { language, setLanguage } = useNotesStore();
	return (
		<Button
			onClick={() => {
				const newLang = language === AR ? EN : AR;
				setLanguage(newLang);
				i18n.changeLanguage(newLang);
			}}
		>
			<Languages />
		</Button>
	);
}

export default LangToggle;
