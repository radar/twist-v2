import * as React from "react";

type SubsectionProps = {
  id: string;
  title: string;
  link: string;
};

type SectionProps = {
  id: string;
  title: string;
  link: string;
  subsections: Array<SubsectionProps>;
};

class Section extends React.Component<SectionProps> {
  renderSubsections() {
    const { subsections } = this.props;

    if (subsections.length === 0) {
      return null;
    }

    return (
      <ul className="section_listing">
        {subsections.map(section => (
          <Subsection {...section} key={section.id} />
        ))}
      </ul>
    );
  }

  render() {
    const { title, id } = this.props;

    return (
      <li className="major">
        <a href={`#${id}`}>{title}</a>
        {this.renderSubsections()}
      </li>
    );
  }
}

class Subsection extends React.Component<SubsectionProps> {
  render() {
    const { title, id } = this.props;

    return (
      <li className="minor">
        <a href={`#${id}`}>{title}</a>
      </li>
    );
  }
}

type SectionListProps = {
  sections: Array<SectionProps>;
};

export default class SectionList extends React.Component<SectionListProps> {
  render() {
    const { sections } = this.props;

    return (
      <ul className="section_listing">
        {sections.map(section => (
          <Section {...section} key={section.id} />
        ))}
      </ul>
    );
  }
}
