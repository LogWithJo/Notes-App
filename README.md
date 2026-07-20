# 📝 Notes-App

A lightweight, local-first notes web app built with **React + TypeScript + Vite**. All notes are stored in your browser — no signup, no server, no data leaving your device.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-black)
![Zustand](https://img.shields.io/badge/Zustand-5-7B2D8E)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📸 Previews

| Home Grid | Note Editor |
|---|---|
| ![Preview 1](./public/Preview-1.png) | ![Preview 2](./public/Preview-2.png) |
| ![Notes Overview](./public/notes.png) | ![Pencil Edit](./public/pencil.png) |

---

## 🚀 Version History & Features

### v0.1.0 — Initial Release
- **Create notes** with a title and optional category
- **Grid view** of all notes with card layout
- **Inline search** to quickly filter notes by title
- **Category filtering** — view notes by category (sidebar)
- **Trash system** — soft-delete notes; restore or permanently delete
- **Local persistence** — notes survive page refreshes via Zustand + localStorage
- **Dark/light mode** support
- **Responsive design** — works on mobile, tablet, and desktop

### v0.2.0 — Categories & Confirmation Dialogs
- ✅ **Category Select** — category input replaced with a combobox populated from existing categories (prevents fragmentation)
- ✅ **Add new category** — inline option to create a new category directly from the dialog
- ✅ **Delete confirmation dialog** — permanent delete now requires explicit confirmation via AlertDialog
- ✅ **Sidebar categories** — dynamic sidebar listing all used categories for quick filtering
- ✅ **Categories management** — centralized `categories` array in store with `addNewCategory` utility
- 🖼️ New preview images (`notes.png`, `pencil.png`)

### v0.3.0 — Auto-Save & Note Editor Polish
- ✅ **Auto-save with debounce** — notes are automatically saved 3 seconds after the last keystroke
- ✅ **Save status indicator** — real-time "Saving..." / "Saved" badge in the note editor header
- ✅ **Draft badge** — visual indicator that you're editing a draft
- ✅ **Optimized note editor** — expanded `NotePage` with header + editor layout
- ✅ **React Router navigation** — seamless navigation between home and note pages
- ✅ **New stores** — `FilterNotes.store.ts` (dialog form state) & `NotePage.store.ts` (editor state scaffolding)
- ✅ **Custom hooks** — extracted reusable logic (`useFilterNotes`, `useNotePageData`, etc.)

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19, TypeScript 6 |
| **Bundler** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **UI Library** | shadcn/ui + @base-ui/react |
| **Icons** | lucide-react |
| **State** | Zustand 5 (with `persist` middleware) |
| **Routing** | react-router-dom 7 |
| **Font** | Inter Variable (via @fontsource) |
| **Editor** | react-textarea-autosize |

---

## 🏗️ Getting Started

### Prerequisites
- Node.js ≥ 18
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── AppSidebar.tsx       # sidebar with category navigation
│   └── theme-provider.tsx   # dark/light mode toggle
├── pages/
│   ├── main/                # notes list (grid, header, search, dialogs)
│   │   ├── NotesGrid.tsx
│   │   ├── NoteCard.tsx
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── AddNoteDialog.tsx
│   │   ├── Select.tsx
│   │   ├── AlertDialog.tsx
│   │   └── NotesAppHomePage.tsx
│   └── Note/                # single note page (editor)
│       ├── NotePage.tsx
│       ├── NoteEditorHeader.tsx
│       └── NoteEditorMain.tsx
├── stores/
│   ├── notes.store.ts       # main notes data + CRUD operations
│   ├── FilterNotes.store.ts # dialog form state
│   └── NotePage.store.ts    # editor page state (scaffolding)
├── hooks/
│   └── hooks.ts             # reusable custom hooks
├── lib/
│   ├── type.ts              # TypeScript interfaces
│   └── utils.ts             # utility functions
├── App.tsx                  # route definitions
├── Layout.tsx               # layout wrapper with sidebar
└── main.tsx                 # entry point
```

---

## 🗺️ Roadmap

| Status | Feature |
|---|---|
| ✅ | Create / edit / delete notes |
| ✅ | Category filter & management |
| ✅ | Search by title |
| ✅ | Trash & permanent delete with confirmation |
| ✅ | Auto-save with status indicator |
| ✅ | Responsive layout |
| ✅ | Dark/light mode |
| 🔜 | Undo toast on delete |
| 🔜 | Sort options (date, title, category) |
| 🔜 | Pin / favorite notes |
| 🔜 | Markdown / rich-text editor |
| 🔜 | Export / import notes |
| 🔜 | Keyboard shortcuts |
| 🔜 | Word / character count |
| 🔜 | Empty trash action |

See [`TODO.md`](./TODO.md) for the full up-to-date task list.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.
