import gql from "graphql-tag";

export default gql`
  fragment elementWithInfo on Element {
    id
    content
    tag
    image {
      path
      caption
    }
    chapter {
      title
      part
      position
      commit {
        sha
        branch {
          name
        }
      }
    }
  }
`;
