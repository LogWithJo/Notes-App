# TODO

## Fixes
- [x] - Add a confirmation (AlertDialog from shadcn works well here) before permanent delete.
- [x] - Turn the category Input into a Select/combobox populated from existing categories (plus an "add new" option) to prevent fragmentation.
- [x] - Add autosave (debounced write on change) or at least a dirty-state check with a confirm-on-navigate for NotePage.
- [x] - Make the sideBar links with a react router
- [ ] - Add basic tests around the store logic (create/edit/delete/restore) since that's the part most likely to regress silently.no
- [ ] - enhance ui for mobile

## Bugs
- [x] - fix uncategriezed bug
- [ ] - fix untitled or uncontent note bug
- [ ] - save preferd lang

## Enhancements
- [x] - Undo toast after delete ("Note deleted — Undo") instead of relying solely on the trash/restore flow.
- [x] - Pin/favorite notes.
- [x] - Word/character count in the editor.
- [x] - Make the app exists in arabic and english
- [ ] - make a color pallete for the website
- [ ] - Sort options for the grid (last edited, title A–Z).// take care of sorting pins
- [ ] - Markdown or basic rich-text support in the note editor.
- [ ] - Export/import notes (JSON or plain text) for backup.
- [ ] - Keyboard shortcuts (⌘K search, ⌘N new note, ⌘S save while editing).
- [ ] - Empty-trash action (bulk permanent delete) with confirmation.

## Future Enhancements
- [ ] - Add an Inline Compiler for tasks, lists, etc...

## Docs
- [x] - Update README.md to match the actual React/Vite/Zustand project scope.
- [x] - Fix README preview image links.