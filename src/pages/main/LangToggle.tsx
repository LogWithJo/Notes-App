import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/hooks";

function LangToggle() {
	const { toggleLang } = useLang();
	return (
		<Button onClick={toggleLang}>
			<Languages />
		</Button>
	);
}

export default LangToggle;
