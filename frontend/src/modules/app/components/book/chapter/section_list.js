// @flow
import * as React from 'react'

type SubsectionProps = {
  id: string,
  title: string,
  link: string
}

type SectionProps = {
  id: string,
  title: string,
  link: string,
  subsections: Array<SubsectionProps>
}

class Section extends React.Component<SectionProps> {
  render() {
    const { title, subsections } = this.props

    return (
      <li className="major">
        {title}
        <ul className="section_listing">
          {subsections.map(section => <Subsection {...section} key={section.id} />)}
        </ul>
      </li>
    )
  }
}

class Subsection extends React.Component<SubsectionProps> {
  render() {
    return <li className="minor">{this.props.title}</li>
  }
}

type SectionListProps = {
  sections: Array<SectionProps>
}

export default class SectionList extends React.Component<SectionListProps> {
  render() {
    const { sections } = this.props
    return (
      <ul className="section_listing">
        {sections.map(section => <Section {...section} key={section.id} />)}
      </ul>
    )
  }
}
