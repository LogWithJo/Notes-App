# 📝 Notes-App

A minimal notes web app built with **React + TypeScript + Vite**. Notes are stored locally in the browser (via **Zustand** persistence).

![Preview 1](./public/Preview-1.png)
![Preview 2](./public/Preview-2.png)


![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- Create notes with **title** and optional **category**
- View notes in a **grid**
- **Search** notes by title
- Filter by **category** (including a trash view)
- Open a note at `/notes/:id` and edit its content
- Delete notes (toggle to trash) and permanently delete from the trash
- Persist data across refreshes (offline-friendly)

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Routing:** react-router-dom
- **State management:** Zustand (+ `persist` to local storage)
- **UI components:** shadcn/ui + lucide-react

## Getting Started

### Prerequisites
- Node.js (recommended: ≥ 18)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL shown in your terminal (Vite typically uses `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure (high-level)

```
src/
├── components/                 # shared UI components
├── pages/
│   ├── main/                  # notes list UI (grid, header, dialogs)
│   └── Note/                  # single note page
├── stores/
│   └── notes.store.ts         # Zustand store + persistence
├── lib/                        # shared types/utilities
└── App.tsx                     # routes
```

## Roadmap

See [`TODO.md`](./TODO.md) for current planned fixes/enhancements.

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## License

MIT (see `LICENSE` for details).

