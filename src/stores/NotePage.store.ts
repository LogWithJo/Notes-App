import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TNotePageDataStore {

}

const useNotePageData = create<TNotePageDataStore>()(
    devtools(
        persist(((set) => ({
            
        })), {name: "NotePage-Storage"})
    )
)