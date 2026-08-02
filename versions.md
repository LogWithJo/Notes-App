# 📦 Versions History & Enhancements

> All versions of **Notes-App** with their enhancements, release dates, and git references.

---

## v0.6.2 — Bug Fixes
**Date:** 2026-08-01 · **Commit:** `5a157f6` (`fix issue (undefined)`)

- 🐛 Fixed the **undefined issue** in the note editor flow (`AddNoteDialog`, `LangToggle`, `NotesGrid`)
- ✅ More robust rendering when note fields are missing

---

## v0.6.1 — SEO / Google Insights
**Date:** 2026-08-01 · **Commit:** `3b1f970` (`enhancing for google insights`)

- 🚀 Added **SEO meta tags** to `index.html` for better search-engine visibility
- 🔍 Optimized the app for **Google Insights / Lighthouse**
- 🛠️ Minor tweaks to the language toggle

---

## v0.6.0 — Full Arabic & English (i18n) Support
**Date:** 2026-08-01 · **Commit:** `bdd03a0` (`add lang change`)

- 🌐 **Full internationalization** with `i18next` + `react-i18next`
- 🇦🇪 **Arabic (AR)** and 🇺🇸 **English (EN)** translation files (`messages/ar.json`, `messages/en.json`, `src/i18n`)
- ↔️ **RTL/LTR layout switching** — the whole UI flips direction when switching to Arabic
- 🔘 **Language toggle button** in the header (`LangToggle`)
- 🌍 **URL-based language routing** (`/notes/:lang/:category`)
- 🧠 **Browser language detection** (`i18next-browser-languagedetector`)
- 🗂️ Sidebar, search, dialogs, editor, and cards all fully translated

---

## v0.5.0 — Pin / Favorite Notes
**Date:** 2026-07-28 · **Commit:** `94ed9c9` (`add Pin`)

- 📌 **Pin up to 3 notes** — a max-pin guard shows a toast ("only 3") when exceeded
- ⬆️ **Pinned notes always sort to the top** of the grid
- 🎯 Pin toggle per note card (pin/unpin)
- ⚙️ Extended `NoteType` with `isPin` field and `togglePin` action in the store

---

## v0.4.0 — React Router + Undo Toast
**Date:** 2026-07-26 → 2026-07-27 · **Commits:** `23a3b9e` (`add react-router`), `30a1c40` (`add undo toast feature`)

- 🧭 **React Router navigation** — sidebar links fully routed (`/notes/:lang/:category`, note detail at `/notes/:id`)
- ↩️ **Undo toast on delete** — "Note deleted — Undo" with a 5s window to restore the note instantly
- 🔔 **Sonner toast system** integrated for all notifications
- 🧩 Refactored all UI primitives to the latest **shadcn/ui** (`@base-ui/react`, `sonner`, `sidebar`, etc.)

---

## v0.3.0 — Auto-Save & Note Editor Polish
**Date:** 2026-07-24 · **Commit:** `c37ef05` (`v-4`)

- 💾 **Auto-save with debounce** — notes are automatically saved **3 seconds** after the last keystroke
- ✅ **Save status indicator** — real-time "Saving…" / "Saved" badge in the note editor header
- 📝 **Draft badge** — visual indicator that you're editing a draft
- 🎨 **Optimized note editor** — expanded `NotePage` with a dedicated header + editor layout
- 🧩 **New stores** — `addNoteDialog.store.ts` (dialog form state) & `notePage.store.ts` (editor state)
- ⚙️ **Custom hooks** — extracted reusable logic (`useFilterNotes`, `useNotePageData`, `useAddNoteDialogOnSubmit`, `useAddCategoryFieldData`, `useHandleDeleteNote`)
- 🛡️ **Validation** — duplicate-title detection and "title is required" checks
- 🗑️ **Delete confirmation dialog** (`AlertDialog`) before permanent delete

---

## v0.2.0 — Categories & Confirmation Dialogs
**Date:** 2026-07-20 · **Commits:** `da8f6b6` / `bda2411` / `381efa4` (`-v3`)

- 🎯 **Category Select** — category input replaced with a **combobox** populated from existing categories (prevents fragmentation)
- ➕ **Add new category** — inline option to create a new category directly from the dialog
- 🗑️ **Delete confirmation dialog** — permanent delete now requires explicit confirmation via `AlertDialog`
- 📂 **Sidebar categories** — dynamic sidebar listing all used categories for quick filtering
- 🗃️ **Categories management** — centralized `categories` array in the store with `addNewCategory` utility
- 🖼️ New preview images (`notes.png`, `pencil.png`)

---

## v0.1.0 — Initial Release
**Date:** 2026-07-06 → 2026-07-15 · **Commits:** `35b956b` (`feat: initial commit`) → `4401721` (`final commit`)

- ✍️ **Create notes** with a title and optional category
- 🗂️ **Grid view** of all notes with card layout
- 🔍 **Inline search** to quickly filter notes by title
- 🏷️ **Category filtering** — view notes by category
- 🗑️ **Trash system** — soft-delete notes; restore or permanently delete
- 💾 **Local persistence** — notes survive page refreshes via Zustand + localStorage
- 🌙 **Dark/light mode** support
- 📱 **Responsive design** — works on mobile, tablet, and desktop

---

## 🧠 Summary

| Version | Focus | Status |
|---|---|---|
| v0.1.0 | Initial release | ✅ |
| v0.2.0 | Categories & confirmation dialogs | ✅ |
| v0.3.0 | Auto-save & editor polish | ✅ |
| v0.4.0 | React Router & undo toast | ✅ |
| v0.5.0 | Pin / favorite notes | ✅ |
| v0.6.0 | Arabic & English (i18n + RTL) | ✅ |
| v0.6.1 | SEO / Google Insights | ✅ |
| v0.6.2 | Bug fixes | ✅ |

See [`README.md`](./README.md) and [`TODO.md`](./TODO.md) for the full roadmap and upcoming features.

