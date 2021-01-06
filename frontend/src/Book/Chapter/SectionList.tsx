import * as React from "react";
import { Section as SectionType } from "../../graphql/types";

type SubsectionProps = {
  id: string;
  title: string;
  link: string;
};

class Section extends React.Component<SectionType> {
  renderSubsections() {
    const { subsections } = this.props;

    if (subsections.length === 0) {
      return null;
    }

    return (
      <ul className="section_listing">
        {subsections.map((section) => (
          <Subsection {...section} key={section.id} />
        ))}
      </ul>
    );
  }

  render() {
    const { title, link } = this.props;

    return (
      <li className="major">
        <a href={`#${link}`}>{title}</a>
        {this.renderSubsections()}
      </li>
    );
  }
}

class Subsection extends React.Component<SubsectionProps> {
  render() {
    const { title, link } = this.props;

    return (
      <li className="minor">
        <a href={`#${link}`}>{title}</a>
      </li>
    );
  }
}

type SectionListProps = {
  sections: Array<SectionType>;
};

export default class SectionList extends React.Component<SectionListProps> {
  render() {
    const { sections } = this.props;

    return (
      <ul className="section_listing">
        {sections.map((section) => (
          <Section {...section} key={section.id} />
        ))}
      </ul>
    );
  }
}
