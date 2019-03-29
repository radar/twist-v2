import * as React from "react"
import { RouteComponentProps } from "react-router"
import ReactMarkdown from "react-markdown"

import QueryWrapper from "../../QueryWrapper"

import Header from "../Notes/Header"
import NoteQuery from "./NoteQuery"
import NoteBox from "../Notes/Note"
import { ElementWithInfoProps, Note as NoteType } from '../Notes/types'
import ElementWithInfo from "../Notes/ElementWithInfo"

type NoteProps = NoteType & {
  element: ElementWithInfoProps,
  bookPermalink: string
}

class Note extends React.Component<NoteProps> {
  render() {
    const {id, bookPermalink, element} = this.props
    return (
      <div className="main col-md-10">
        <Header permalink={bookPermalink} noteId={id} />
        <ElementWithInfo {...element} />
        <NoteBox {...this.props} />
      </div>
    )
  }
}

interface WrappedNoteMatchParams {
  id: string
  bookPermalink: string
}

interface WrappedNoteProps extends RouteComponentProps<WrappedNoteMatchParams> {}

export default class WrappedNote extends React.Component<WrappedNoteProps> {
  render() {
    const {id, bookPermalink} = this.props.match.params;

    return (
      <QueryWrapper query={NoteQuery} variables={{id: id, bookPermalink: bookPermalink}}>
      {({note}) => {
        return (
          <Note bookPermalink={bookPermalink} {...note} />
        )
      }}
      </QueryWrapper>
    )
  }
}
