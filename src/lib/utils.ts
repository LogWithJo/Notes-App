import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COMMAND, CTRL, META } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getHotKey(letter: string) {
	return `${CTRL}+${letter.trim()}, ${META}+${letter.trim}`;
}

export function getCommands(letter: string) {
	return `${COMMAND}${letter}`;
}
