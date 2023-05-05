import gql from "graphql-tag";

export default gql`
  mutation updateNoteMutation($id: ID!, $text: String!) {
    updateNote(input: { id: $id, text: $text }) {
      id
      text
      state
    }
  }
`;
