import i18n from "i18next";
import LanguageDedector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import arCommon from "./ar/common.json";
import enCommon from "./en/common.json";

i18n
	.use(LanguageDedector)
	.use(initReactI18next)
	.init({
		fallbackLng: "eng",

		resources: {
			en: {
				common: enCommon,
			},
			ar: {
				common: arCommon,
			},
		},
		ns: ["common"],
		defaultNS: "common",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
