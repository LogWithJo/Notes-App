import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import i18n from "@/i18n";
import { Languages, MOBILE_BREAKPOINT } from "@/lib/constants";
import type { AvailableLang, NoteType } from "@/lib/type";
import { useNotesStore } from "@/stores/notes.store";

export function useHandleDeleteNote(id: number) {
	const {
		notes,
		deleteNote,
		toggleIsDeleteNotePortalOpen,
		setLastDeletedNote,
	} = useNotesStore();
	const deletedNote: NoteType | undefined = notes.find(
		(note) => note.id === id,
	);

	function hadnleDelete() {
		deleteNote(id);
		toggleIsDeleteNotePortalOpen(true);
		setLastDeletedNote(deletedNote || null);
	}
	return hadnleDelete;
}

export function useLang() {
	const { lang = "en", category = "all" } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!lang) return;

		const isRTL = lang === Languages[0];
		i18n.changeLanguage(lang);
		document.documentElement.lang = lang;
		document.documentElement.dir = isRTL ? "rtl" : "ltr";
	}, [lang]);

	function toggleLang() {
		const newLang: AvailableLang =
			lang === Languages[0] ? Languages[1] : Languages[0];
		navigate(`/notes/${newLang}/${category}`);
	}

	return { lang, category, toggleLang };
}

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean>(
		() => window.innerWidth < MOBILE_BREAKPOINT,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
		);

		const onChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};

		const setMobile = () => setIsMobile(mediaQuery.matches);
		setMobile();

		mediaQuery.addEventListener("change", onChange);

		return () => {
			mediaQuery.removeEventListener("change", onChange);
		};
	}, []);

	return isMobile;
}
