import '../styles/globals.css'
import Link from "next/link";
import client from "../graphql/client"
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <div className="w-full md:w-2/3 px-4 md:px-0 mx-auto">
      <menu className="my-4">
        <Link href="/">
          <a><strong>Twist</strong></a>
        </Link>{" "}
        &nbsp; | &nbsp;
        {/* <CurrentUser>{renderUserInfo()}</CurrentUser> */}
      </menu>

      <Component {...pageProps} />
    </div>
  </ApolloProvider>
}

export default MyApp
