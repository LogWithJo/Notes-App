// wholeproject.tsx - copy/paste concatenation of requested project files.
// Note: This file is for reference; the original project structure is required for correct imports.

/* ========================= src/App.tsx ========================= */
import { Route, Routes } from "react-router-dom";
import NoteApp from "./pages/main/NotesAppHomePage";
import NotePage from "./pages/Note/NotePage";

export function App() {
    return <Routes>
        <Route path='/' element={<NoteApp />} />
        <Route path='/notes/:id' element={<NotePage />} />
    </Routes>;
}

export default App;

/* ========================= src/main.tsx ========================= */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import App from "./App.tsx";
import Layout from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <HashRouter>
                <Layout>
                    <App />
                </Layout>
            </HashRouter>
        </ThemeProvider>
    </StrictMode>,
);

/* ========================= src/Layout.tsx ========================= */
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1">
                    {/* <SidebarTrigger /> */}
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}

/* ========================= src/pages/main/NotesAppHomePage.tsx ========================= */
import Header from "./Header";
import NotesGrid from "./NotesGrid";

export default function NoteApp() {
    return (
        <main>
            <Header />
            <NotesGrid />
        </main>
    );
}

/* ========================= src/pages/main/Header.tsx ========================= */
import { SidebarTrigger } from "@/components/ui/sidebar";
import AddNoteDialog from "./AddNoteDialog";
import SearchBar from "./SearchBar";

function Header() {
    return (
        <div className="flex justify-between items-center p-2 w-full">
            <SidebarTrigger />
            <div><SearchBar /></div>
            <AddNoteDialog />
        </div>
    );
}

export default Header;

/* ========================= src/pages/main/AddNoteDialog.tsx ========================= */
import React, { type FormEvent } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
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
import { useInfo } from "@/stores/notes.store";

export default function AddNoteDialog() {
    const { notes, createNewNote } = useInfo();

    const [title, setTitle] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [titleError, setTitleError] = React.useState<string | null>(null);
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const titleTrimmed = title.trim();
    const categoryTrimmed = category.trim();

    const isDuplicateTitle = React.useMemo(() => {
        if (!titleTrimmed) return false;
        return notes.some(
            (note) =>
                !note.deleted &&
                note.title.toLowerCase() === titleTrimmed.toLowerCase(),
        );
    }, [notes, titleTrimmed]);

    function validate() {
        if (!titleTrimmed) {
            setTitleError("Title is required.");
            return false;
        }
        if (isDuplicateTitle) {
            setTitleError("A note with this title already exists.");
            return false;
        }
        setTitleError(null);
        return true;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        createNewNote(titleTrimmed.toLowerCase(), categoryTrimmed.toLowerCase());

        setTitle("");
        setCategory("");
        setIsOpen(false)
        setTitleError(null);
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger render={<Button size="lg" className="shadow-sm" />}>
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">Add new note</span>
                <span className="sm:hidden">New</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add new Note</DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldSet>
                        <FieldLegend>New note</FieldLegend>
                        <FieldDescription>
                            Fill title and category, then submit.
                        </FieldDescription>

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="note-title">Title</FieldLabel>
                                <Input
                                    id="note-title"
                                    autoComplete="off"
                                    placeholder="My first note"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    aria-invalid={!!titleError}
                                />
                                {titleError && <FieldError>{titleError}</FieldError>}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="note-category">Category</FieldLabel>
                                <Input
                                    id="note-category"
                                    autoComplete="off"
                                    placeholder="work | personal | id
eas"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                                <FieldDescription>
                                    Optional. Leave blank for uncategorized.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                        <div className="mt-4 flex justify-end">
                            <Button type="submit">Create</Button>
                        </div>
                    </FieldSet>
                </form>
            </DialogContent>
        </Dialog>
    );
}

/* ========================= src/pages/main/SearchBar.tsx ========================= */
import { SearchIcon } from "lucide-react";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useInfo } from "@/stores/notes.store";

export default function SearchBar() {
    const { searchText, updateSearchText } = useInfo();
    return (
        <Field>
            <InputGroup>
                <InputGroupInput
                    value={searchText}
                    onChange={(e) => { updateSearchText(e.target.value); }}
                    id="inline-start-input"
                    placeholder="Search..."
                />
                <InputGroupAddon align="inline-start">
                    <SearchIcon className="text-muted-foreground"></SearchIcon>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    );
}

/* ========================= src/pages/main/NoteCard.tsx ========================= */
import {
    ArchiveRestoreIcon,
    ClockIcon,
    FolderIcon,
    MoreHorizontalIcon,
    Trash2Icon,
} from "lucide-react";
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
import type { NoteType } from "@/lib/type";
import { useInfo } from "@/stores/notes.store";

export default function NoteCard({ note }: { note: NoteType }) {
    const { deleteNote, deleteNoteForEver } = useInfo();
    const hasContent = note.content.trim().length > 0;

    function formatDaysAgo(date: number) {
        const now = new Date();
        const then = new Date(date);

        const diffTime = now.getTime() - then.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 30) return `${diffDays} days ago`;

        return then.toLocaleDateString();
    }

    return (
        <Card className="group h-full overflow-hidden py-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
            <CardHeader className="gap-3 px-5 pt-5">
                <div className="flex items-start justify-between gap-3">
                    <Link to={`/notes/${note.id}`} className="min-w-0 flex-1">
                        <CardTitle className="line-clamp-2 text-lg leading-snug transition-colors group-hover:text-primary">
                            {note.title}
                        </CardTitle>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
                            <MoreHorizontalIcon className="size-4" />
                            <span className="sr-only">Open note menu</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem
                                onClick={() => {
                                    deleteNote(note.id);
                                }}
                                variant={note.deleted ? "default" : "destructive"}
                                className="cursor-pointer"
                            >
                                {note.deleted ? (
                                    <ArchiveRestoreIcon className="size-4" />
                                ) : (
                                    <Trash2Icon className="size-4" />
                                )}
                                {note.deleted ? "Undelete" : "Delete"}
                            </DropdownMenuItem>
                            {note.deleted && (
                                <DropdownMenuItem
                                    onClick={() => deleteNoteForEver(note.id)}
                                    className="text-destructive focus:text-destructive cursor-pointer"
                                >
                                    <Trash2Icon className="size-4" />
                                    Delete
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1 rounded-full px-2.5">
                        <FolderIcon className="size-3" />
                        {note.catogry}
                    </Badge>
                    {note.deleted ? (
                        <Badge variant="destructive" className="rounded-full px-2.5">
                            Deleted
                        </Badge>
                    ) : null}
                </div>
            </CardHeader>

            <Link to={`/notes/${note.id}`} className="flex flex-1 flex-col">
                <CardContent className="flex-1 px-5 pb-5">
                    <p className="line-clamp-4 min-h-20 text-sm leading-6 text-muted-foreground">
                        {hasContent ? note.content : "No content yet."}
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
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoteCard from "./NoteCard";
import type { NoteType } from "@/lib/type";
import { useInfo } from "@/stores/notes.store";

export default function NotesGrid() {
    const { notes: beforeIint, currentCategory, searchText } = useInfo();
    const filteredNotes = currentCategory === "all" ? beforeIint : currentCategory === "trash" ? beforeIint.filter(note => note.deleted) : beforeIint.filter(note => note.catogry === currentCategory)
    const filterNotesBySearch = filteredNotes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase()))

    const isSearching = searchText.trim().length > 0
    const notes: NoteType[] = isSearching ? filterNotesBySearch : filteredNotes


    return (
        <section className="space-y-5 px-2 py-4 sm:px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-lg border bg-background shadow-xs">
                            <FileTextIcon className="size-4 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            Notes
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm text-muted-foreground">
                        {isSearching ? (
                            <span>
                                Results for
                                <span className="font-medium text-foreground">
                                    “{searchText.trim()}”
                                </span>
                            </span>
                        ) : (
                            "Recent notes, sorted into a clean workspace."
                        )}
                    </p>
                </div>

                <Badge variant="secondary" className="h-7 rounded-full px-3">
                    {notes.length} note{notes.length === 1 ? "" : "s"}
                </Badge>
            </div>

            <Separator />

            {notes.length === 0 ? (
                <Card className="border-dashed bg-muted/20 shadow-none">
                    <CardHeader className="items-center text-center">
                        <div className="mb-2 flex size-12 items-center justify-center rounded-full border bg-background">
                            <SearchXIcon className="size-5 text-muted-foreground" />
                        </div>
                        <CardTitle>No notes found</CardTitle>
                        <CardDescription>
                            {isSearching
                                ? "Try a different search."
                                : "Create your first note to get started."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2">
                        <div className="h-2 rounded-full bg-muted" />
                        <div className="h-2 rounded-full bg-muted" />
                        <div className="h-2 rounded-full bg-muted" />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            )}
        </section>
    );
}

/* ========================= src/pages/Note/NotePage.tsx ========================= */
import { Separator } from "@base-ui/react";
import { ArrowLeft, Clock, Save } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInfo } from "@/stores/notes.store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TextareaAutosize from 'react-textarea-autosize';

function NotePage() {
    const navigate = useNavigate();
    const { notes, editNote } = useInfo();
    const { id } = useParams();
    const [note] = notes.filter((not) => Number(not.id) === Number(id));
    const [inputValue, setInputValue] = React.useState({
        title: note.title,
        content: note.content,
    });
    function saveNote() {
        editNote(Number(id), inputValue.title, inputValue.content);
        navigate("/");
    }
    return (
        <>
            <Header saveNote={saveNote} />
            <MainSection inputValue={inputValue} setInputValue={setInputValue} />
        </>
    );
}

export default NotePage;

function Header({ saveNote }: { saveNote: () => void }) {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <Badge variant="secondary">Draft</Badge>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>Editing note</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">
                        <Link to="/" className='flex'>
                            <ArrowLeft className="mr-2 size-4" />
                            Cancel
                        </Link>
                    </Button>

                    <Button onClick={saveNote}>
                        <Save className="mr-2 size-4" />
                        Save
                    </Button>
                </div>
            </div>
        </header>
    );
}

function MainSection({
    inputValue,
    setInputValue,
}: {
    inputValue: {
        title: string;
        content: string;
    };
    setInputValue: Dispatch<
        SetStateAction<{
            title: string;
            content: string;
        }>
    >;
}) {
    return (
        <main className="mx-auto w-full max-w-5xl p-6">
            <Card className="shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="text-muted-foreground text-sm">
                        Note Editor
                    </CardTitle>
                </CardHeader>

                <Separator />

                <CardContent className="space-y-6 pt-6">

                    <TextareaAutosize
                        value={inputValue.title}
                        onChange={(e) =>
                            setInputValue((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        rows={1}
                        placeholder="Untitled Note"
                        className="w-full resize-none bg-transparent text-5xl font-bold outline-none placeholder:text-muted-foreground"
                    />

                    <TextareaAutosize
                        value={inputValue.content}
                        onChange={(e) =>
                            setInputValue((prev) => ({
                                ...prev,
                                content: e.target.value,
                            }))
                        }
                        placeholder="Start writing..."
                        className="min-h-[65vh] w-full resize-none bg-transparent text-base leading-8 outline-none placeholder:text-muted-foreground"
                    />
                    <Separator />
                </CardContent>
            </Card>
        </main>
    );
}

/* ========================= NOTE ========================= */
/*
This concatenated file currently includes only the main app shell and pages.
The remaining requested files (src/lib/*, src/stores/*, all ui components in src/components/ui/*,
src/components/*, etc.) were not appended yet due to message size limits.
*/

