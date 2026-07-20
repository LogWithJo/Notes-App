# TODO

## Fixes
- [x] - Add a confirmation (AlertDialog from shadcn works well here) before permanent delete.
- [x] - Turn the category Input into a Select/combobox populated from existing categories (plus an "add new" option) to prevent fragmentation.
- [x] - Add autosave (debounced write on change) or at least a dirty-state check with a confirm-on-navigate for NotePage.
- [ ] - Add basic tests around the store logic (create/edit/delete/restore) since that's the part most likely to regress silently.
- [ ] - Make the sideBar links with a react router
- [ ] - enhance side bar for mobile view


## Enhancements
- [ ] - Undo toast after delete ("Note deleted — Undo") instead of relying solely on the trash/restore flow.
- [ ] - Sort options for the grid (last edited, title A–Z, category).
- [ ] - Pin/favorite notes.
- [ ] - Markdown or basic rich-text support in the note editor.
- [ ] - Export/import notes (JSON or plain text) for backup.
- [ ] - Keyboard shortcuts (⌘K search, ⌘N new note, ⌘S save while editing).
- [ ] - Word/character count in the editor.
- [ ] - Empty-trash action (bulk permanent delete) with confirmation.
- [ ] - Persist store to localStorage/IndexedDB if it isn't already, so notes survive a refresh.

## Future Enhancements
- [ ] - Add an Inline Compiler for tasks, lists, etc...

## Docs
- [x] - Update README.md to match the actual React/Vite/Zustand project scope.
- [x] - Fix README preview image links.