import { BareElementProps } from "../Chapter/Element"

export type CommitProps = {
  sha: string,
  branch: {
    name: string
  }
}

export type ChapterProps = {
  part: string,
  position: string,
  title: string,
  commit: CommitProps
}

type User = {
  id: string,
  email: string,
}

export type Note = {
  id: string,
  text: string,
  user: User,
}

export type ElementWithInfoProps = BareElementProps & {
  className?: string,
  chapter: ChapterProps
}

export type ElementWithNotesProps = ElementWithInfoProps & {
  bookPermalink: string,
  notes: Note[]
}
