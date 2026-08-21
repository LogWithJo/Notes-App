import type {  NoteType } from "./type";

export const COMMAND = "⌘";
export const SELECT_ALL_NOTES = "all";
export const Languages = ['ar', 'en'] as const
export const MOBILE_BREAKPOINT = 768;
export const DARK_MODE = "dark";
export const LIGHT_MODE = "light";
export const CTRL = "ctrl";
export const META = "meta";
export const Commands = {
	LANGAUGE_COMMAND: "L",
	SEARCH_COMMAND: "K",
	THEME_COMMAND: "E",
	SIDEBAR_COMMAND: "B",
	NEWNOTE_COMMAND: "M",
	SAVENOTE_COMMAND: "S",
} as const;

export const SORT = {
	newest: "newest",
	oldest: "oldest",
	az: "az",
	za: "za",
	maxLength: "maxLength",
	minLength: "minLength",
} as const;

export const sortFunctions = {
	az: (a: NoteType, b: NoteType) => a.title.localeCompare(b.title),
	za: (a: NoteType, b: NoteType) => b.title.localeCompare(a.title),
	maxLength: (a: NoteType, b: NoteType) => b.content.length - a.content.length,
	minLength: (a: NoteType, b: NoteType) => a.content.length - b.content.length,
	newest: (a: NoteType, b: NoteType) =>
		Number(new Date(b.date)) - Number(new Date(a.date)),
	oldest: (a: NoteType, b: NoteType) =>
		Number(new Date(a.date)) - Number(new Date(b.date)),
};
