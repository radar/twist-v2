import React from "react";

export interface FootnoteProps {
  identifier: string;
  content: string;
}

const Footnote: React.FC<FootnoteProps> = ({ identifier, content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Footnote;
