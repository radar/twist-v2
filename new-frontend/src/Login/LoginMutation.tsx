import gql from 'graphql-tag'

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      error
    }
  }
`

export default loginMutation
