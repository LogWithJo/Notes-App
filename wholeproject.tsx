// wholeproject.tsx - copy/paste concatenation of the current project source files.
// Note: This file is for reference only; the original project structure is required for correct imports.
// Last synced with the actual source code in `src/`.

/* ========================= src/main.tsx ========================= */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<HashRouter>
				<App />
			</HashRouter>
		</ThemeProvider>
	</StrictMode>,
);

/* ========================= src/App.tsx ========================= */
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotesHomePage from "./pages/main/NotesAppHomePage";
import NoteEditorPage from "./pages/Note/NotePage";

export function App() {
	addEventListener("keydown", (e) => {
		console.log(e.key);
	});
	return (
		<Routes>
			<Route index element={<Navigate to={"/notes/en/all"} replace />} />
			<Route
				path="/notes/:lang/:category"
				element={
					<Layout>
						<NotesHomePage />
					</Layout>
				}
			/>

			<Route path="/note/:lang/:id" element={<NoteEditorPage />} />
		</Routes>
	);
}

export default App;

/* ========================= src/Layout.tsx ========================= */
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1">{children}</main>
			</SidebarProvider>
		</div>
	);
}

/* ========================= src/components/AppSidebar.tsx ========================= */
import { Files } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useLang } from "@/hooks/hooks";
import { SELECT_ALL_NOTES } from "@/lib/constants";
import { useNotesStore } from "@/stores/notes.store";

export function AppSidebar() {
	const { t } = useTranslation();
	const { lang, category } = useLang();
	const navigate = useNavigate();
	const { isMobile, setOpenMobile } = useSidebar();
	const { notes } = useNotesStore();

	const categories = [
		...new Set(
			notes.map((note) => note.category).filter((categ) => categ !== ""),
		),
	];
	function handleClick(category: string) {
		// Close the mobile sheet when navigating from the sidebar so the
		// overlay doesn't keep covering the content.
		if (isMobile) setOpenMobile(false);
		navigate(`/notes/${lang}/${category}`);
	}
	function trans(dir: string) {
		const text = t(`SideBar.${dir}`);
		return text;
	}
	return (
		<Sidebar side={lang === "en" ? "left" : "right"}>
			<SidebarHeader>{trans("heading")}</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								isActive={category === SELECT_ALL_NOTES}
								onClick={() => {
									handleClick(SELECT_ALL_NOTES);
								}}
							>
								<Files className="size-4" />
								<span>{trans("all")}</span>
							</SidebarMenuButton>

							<SidebarHeader>{trans("heading")}</SidebarHeader>
							{categories.length > 0 ? (
								categories.map((note) => (
									<SidebarMenuButton
										isActive={category === note}
										key={note}
										onClick={() => handleClick(note)}
									>
										{note.toUpperCase()}
									</SidebarMenuButton>
								))
							) : (
								<SidebarMenuButton disabled>
									{trans("NotFound")}
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

/* ========================= src/components/theme-provider.tsx ========================= */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (isTheme(storedTheme)) {
      return storedTheme
    }

    return defaultTheme
  })

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme !== "system") {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      setThemeState((currentTheme) => {
        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : currentTheme === "light"
              ? "dark"
              : getSystemTheme() === "dark"
                ? "light"
                : "dark"

        localStorage.setItem(storageKey, nextTheme)
        return nextTheme
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      if (event.key !== storageKey) {
        return
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
        return
      }

      setThemeState(defaultTheme)
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

/* ========================= src/pages/main/NotesAppHomePage.tsx ========================= */
import { Separator } from "@base-ui/react";
import { Toaster } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFilterNotes } from "@/hooks/hooks";
import AddNoteDialog from "./AddNoteDialog";
import LangToggle from "./LangToggle";
import NotesSection, {
	NoNotesFound,
	NotesGrid,
	NotesResultsHeader,
} from "./NotesGrid";
import { NotesHeader } from "./NotesHeader";
import SearchBar from "./SearchBar";

export default function NotesHomePage() {
	const theme = localStorage.getItem("theme");
	const { notes } = useFilterNotes();
	return (
		<main>
			<NotesHeader>
				<SideBar />
				<SearchBar />
				<div className="flex justify-center gap-3">
					<LangToggle />
					<AddNoteDialog />
				</div>
			</NotesHeader>

			<NotesSection>
				<NotesResultsHeader />
				<Separator />
				{notes.length === 0 ? <NoNotesFound /> : <NotesGrid />}
			</NotesSection>
			<Toaster
				position="top-center"
				theme={theme === "dark" || theme === "light" ? theme : undefined}
			/>
		</main>
	);
}

function SideBar() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<SidebarTrigger />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						Toggle Sidebar
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘B
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

/* ========================= src/pages/main/NotesHeader.tsx ========================= */
import type { ReactNode } from "react";

export function NotesHeader({ children }: { children: ReactNode }) {
	return (
		<div className="flex justify-between items-center p-2 w-full">
			{children}
		</div>
	);
}

/* ========================= src/pages/main/SearchBar.tsx ========================= */
import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNotesStore } from "@/stores/notes.store";

export default function SearchBar() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Search />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						Search
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘K
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function Search() {
	const { t } = useTranslation();
	const { searchText, updateSearchText } = useNotesStore();
	const input = useRef<HTMLInputElement>(null);
	useHotkeys("ctrl+k, meta+k", (e) => {
		e.preventDefault();
		input.current?.focus();
	});
	return (
		<div>
			<Field>
				<InputGroup>
					<InputGroupInput
						ref={input}
						value={searchText}
						onChange={(e) => {
							updateSearchText(e.target.value);
						}}
						className="caret-blue-400"
						id="inline-start-input"
						placeholder={t("Header.search")}
					/>
					<InputGroupAddon align="inline-start">
						<SearchIcon className="text-muted-foreground"></SearchIcon>
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</div>
	);
}

/* ========================= src/pages/main/AddNoteDialog.tsx ========================= */
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	useAddCategoryFieldData,
	useAddNoteDialogOnSubmit,
	useLang,
} from "@/hooks/hooks";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { CategorySelect } from "./CategorySelect";

export default function AddNoteDialog() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<AddDialog />
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						Add new Note
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘M
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function AddDialog() {
	const { t } = useTranslation();
	function trans(direction: string) {
		const text = t(`Header.addNoteDialog.${direction}`);
		return text;
	}
	const {
		titleError,
		isOpen,
		title,
		setTitle,
		toggleIsOpen,
		isAddCategoryOpen,
	} = useAddNoteDialogStore();
	const { handleSubmit } = useAddNoteDialogOnSubmit();
	const { lang } = useLang();

	useHotkeys("ctrl+m, meta+m", (e) => {
		e.preventDefault();
		toggleIsOpen(true);
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(e) => {
				toggleIsOpen(e);
			}}
		>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="size-4" />
					<span className="hidden md:block">{trans("toggleButton")}</span>
				</Button>
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogTitle className="sr-only">{trans("title")}</DialogTitle>
				<DialogDescription className="sr-only">
					{trans("description")}
				</DialogDescription>
				<form onSubmit={handleSubmit}>
					<FieldSet>
						<FieldLegend>{trans("title")}</FieldLegend>
						<FieldDescription
							className={lang === Languages ? "text-right" : "text-left"}
						>
							{trans("description")}
						</FieldDescription>

						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="note-title">
									{trans("titleInput.title")}
								</FieldLabel>
								<Input
									className="caret-blue-400"
									id="note-title"
									autoComplete="off"
									placeholder={trans("titleInput.placeholder")}
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									aria-invalid={!!titleError}
								/>
								{titleError && (
									<FieldError>{trans("titleInput.required")}</FieldError>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="note-category">
									{trans("categoryInput.title")}
								</FieldLabel>
								{isAddCategoryOpen ? (
									<AddCategoryInputField />
								) : (
									<CategorySelectField />
								)}
							</Field>
						</FieldGroup>

						<div className="mt-4 flex justify-end">
							<Button type="submit">{trans("submitButton")}</Button>
						</div>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function CategorySelectField() {
	const { setIsAddCategoryOpen: onClick } = useAddNoteDialogStore();
	return (
		<div className="flex gap-4 justify-around items-center">
			<CategorySelect />
			<Button
				variant="secondary"
				className="cursor-pointer"
				onClick={() => {
					onClick(true);
				}}
			>
				<PlusIcon />
			</Button>
		</div>
	);
}

function AddCategoryInputField() {
	const { t } = useTranslation();
	const { error, handleClick, close, handleInputChange, category } =
		useAddCategoryFieldData();
	return (
		<div className="flex  justify-around items-center gap-3">
			<Button
				className="cursor-pointer"
				onClick={close}
				variant={category.length > 0 ? "destructive" : "secondary"}
			>
				<ArrowLeft />
			</Button>
			<Input
				className={`${error ? "border-red-400" : ""} caret-blue-400`}
				value={category}
				placeholder="Work | Personal"
				onChange={handleInputChange}
			/>
			<Button className="cursor-pointer" onClick={handleClick}>
				{t("Header.addNoteDialog.categoryInput.button")}
			</Button>
		</div>
	);
}

/* ========================= src/pages/main/CategorySelect.tsx ========================= */
import { type ReactNode, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddNoteDialogStore } from "@/stores/addNoteDialog.store";
import { useNotesStore } from "@/stores/notes.store";

export function CategorySelect() {
	const { categories } = useNotesStore();
	const { setCategory, isAddCategoryOpen, category } = useAddNoteDialogStore();
	const categoryItems: { label: ReactNode; value: string }[] = categories.map(
		(category) => ({
			label: <div>{category}</div>,
			value: category,
		}),
	);
	const lastCategory = categories.at(-1);
	useEffect(() => {
		if (!category && lastCategory) {
			setCategory(lastCategory);
		}
	}, [category, lastCategory, setCategory]);
	return (
		<Select
			value={category}
			onValueChange={(value) => {
				if (typeof value !== "string") return;
				setCategory(
					isAddCategoryOpen ? categories[categories.length - 1] : value,
				);
			}}
		>
			<SelectTrigger className="w-full">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>
						{categoryItems.length > 0 ? "Categories" : "No Categories Found"}
					</SelectLabel>
					{categoryItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

/* ========================= src/pages/main/LangToggle.tsx ========================= */
import { Languages } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLang } from "@/hooks/hooks";

function LangToggle() {
	const { t } = useTranslation();
	const { toggleLang } = useLang();
	useHotkeys("ctrl+l, meta+l", (e) => {
		e.preventDefault();
		toggleLang();
	});
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button onClick={toggleLang}>
						<Languages />
						<span className="hidden md:block">{t("Header.language")}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className="flex items-center gap-2">
						toggle Language
						<kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[17px] font-medium text-muted-foreground">
							⌘L
						</kbd>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default LangToggle;

/* ========================= src/pages/main/NoteCard.tsx ========================= */
import {
	ClockIcon,
	FolderIcon,
	MoreHorizontalIcon,
	Pin,
	Trash2Icon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleDeleteNote, useLang } from "@/hooks/hooks";
import type { NoteType } from "@/lib/type";
import { useNotesStore } from "@/stores/notes.store";

export default function NoteCard({ note }: { note: NoteType }) {
	const { t } = useTranslation();
	const { lang } = useLang();
	const { togglePin } = useNotesStore();
	const hasContent = note.content.trim().length > 0;
	const handleDelete = useHandleDeleteNote(note.id);

	function formatDaysAgo(date: number) {
		const now = new Date();
		const then = new Date(date);

		const diffTime = now.getTime() - then.getTime();
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return trans("time.today");
		if (diffDays === 1) return trans("time.yesterday");
		if (diffDays < 30) return `${diffDays} ${trans("time.days")}`;

		return then.toLocaleDateString();
	}

	function trans(dir: string) {
		const text = t(`NotesGrid.NoteCard.${dir}`);
		return text;
	}

	return (
		<Card className="group h-full overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
			<CardHeader className="gap-3 px-5 pt-5">
				<div className="flex items-start justify-between gap-3">
					<Link to={`/notes/${note.id}`} className="min-w-0 flex-1">
						<CardTitle className="line-clamp-2 flex gap-4 text-lg leading-snug transition-colors group-hover:text-primary">
							{note.title}

							{note.isPin && (
								<div className="flex justify-center items-center">
									<Pin className="size-4 " />
								</div>
							)}
						</CardTitle>
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
							<MoreHorizontalIcon className="size-4" />
							<span className="sr-only">Open note menu</span>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-36">
							<DropdownMenuItem
								dir={lang === "ar" ? "rtl" : "ltr"}
								onClick={handleDelete}
								variant="destructive"
								className="cursor-pointer"
							>
								<Trash2Icon className="size-4" />
								{trans("dropDown.delete")}
							</DropdownMenuItem>
							<DropdownMenuItem
								dir={lang === "ar" ? "rtl" : "ltr"}
								onClick={() => {
									togglePin(note.id);
								}}
								className="cursor-pointer"
							>
								<Pin className="size-4" />
								{note.isPin ? trans("dropDown.unPin") : trans("dropDown.pin")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<Badge variant="outline" className="gap-1 rounded-full px-2.5">
						<FolderIcon className="size-3" />
						{note.category}
					</Badge>
				</div>
			</CardHeader>

			<Link
				to={`/note/${lang || "en"}/${note.id}`}
				className="flex flex-1 flex-col"
			>
				<CardContent className="flex-1 px-5 pb-5">
					<p className="line-clamp-4 min-h-20 text-sm leading-6 text-muted-foreground">
						{hasContent ? note.content : trans("NoContent")}
					</p>
				</CardContent>
			</Link>

			<CardFooter className="border-t bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
				<div className="flex w-full items-center justify-between gap-3">
					<span className="inline-flex items-center gap-1.5">
						<ClockIcon className="size-3.5" />
						{formatDaysAgo(note.date)}
					</span>
					<span className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-transform group-hover:scale-125" />
				</div>
			</CardFooter>
		</Card>
	);
}

/* ========================= src/pages/main/NotesGrid.tsx ========================= */
import { FileTextIcon, SearchXIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useFilterNotes, useLang } from "@/hooks/hooks";
import { useNotesStore } from "@/stores/notes.store";
import NoteCard from "./NoteCard";

export default function NotesSection({ children }: { children: ReactNode }) {
	return <section className="space-y-5 px-2 py-4 sm:px-4">{children}</section>;
}

export function NotesResultsHeader() {
	const { t } = useTranslation();
	const { isSearching, notes } = useFilterNotes();
	const { searchText } = useNotesStore();
	const { lang } = useLang();
	function trans(direction: string) {
		const text = t(`NotesGrid.Header.${direction}`);
		return text;
	}
	return (
