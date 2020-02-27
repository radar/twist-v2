import React from "react";

export interface FootnoteProps {
  identifier: string;
  content: string;
}

export default class Footnote extends React.Component<FootnoteProps> {
  render() {
    const { identifier, content } = this.props;

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}
