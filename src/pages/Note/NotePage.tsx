import { useParams } from "react-router-dom"
import { useNotePageData } from "@/hooks/useNotePageData.hook"
import LoadingPage from "./LoadingPage"
import NoteEditorHeader from "./NoteEditorHeader"
import NoteEditorMain from "./NoteEditorMain"
import { useNotePage } from "@/stores/notePage.store"

function NotePage() {
  const { showLoadingPage } = useNotePage()
  const { id } = useParams()
  useNotePageData(Number(id))
  return (
    <>
      {showLoadingPage && <LoadingPage />}

      <NoteEditorHeader />

      <NoteEditorMain />
    </>
  )
}

export default NotePage
