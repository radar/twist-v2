import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    token(email: $email, password: $password)
  }
`

export default compose(graphql(loginMutation, { name: 'loginMutation' }))
