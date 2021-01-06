import gql from "graphql-tag";

export default gql`
  fragment elementWithInfo on Element {
    id
    content
    tag
    image {
      id
      path
      caption
    }
    chapter {
      title
      part
      position
      permalink
      commit {
        sha
        branch {
          name
        }
      }
    }
  }
`;
