import { ArrowLeft, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

function SettingsPageHeader() {
	const t = useTranslation().t;
	return (
		<div className='flex gap-3 p-3 items-center'>
			<ArrowLeft className='size-5 hover:bg-blue-100 rounded-full' />
			<div className='flex gap-2 items-center'>
				<Settings className='size-4' />
				{t("SideBar.settings")}
			</div>
		</div>
	);
}

export default SettingsPageHeader;
