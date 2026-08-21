import { Languages, LucideLanguages, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/hooks/hooks";

function SettingsPageMain() {
	const { lang, toggleLang } = useLang();
	return (
		<div className="w-5xl mx-auto flex flex-col">
			<DraggableItem
				label={"Language"}
				value={lang}
				onValueChange={toggleLang}
				selectItems={[
					{ value: "arabic", icon: <LucideLanguages /> },
					{ value: "dark", icon: <Languages /> },
				]}
			/>
		</div>
	);
}

export default SettingsPageMain;

interface Props {
	label: string;
	value: string;
	onValueChange: () => void;
	selectItems: {
		value: string;
		icon: ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		>;
	}[];
}

function DraggableItem({ label, value, onValueChange, selectItems }: Props) {
	return (
		<div className="flex w-full justify-between items-center">
			<div>{label}</div>
			<Select value={value} onValueChange={onValueChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{label}</SelectLabel>
						{selectItems.map((item) => (
							<SelectItem value={item.value} key={item.value}>
								{item.icon && <div>{item.icon}</div>}
								{item.value}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
