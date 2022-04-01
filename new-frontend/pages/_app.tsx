import "../styles/globals.css";
import Link from "next/link";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import useSWR from "swr";
import CurrentUser from "components/CurrentUser";
import CurrentUserContext, {
  CurrentUserType,
} from "components/CurrentUser/context";

type User = Exclude<CurrentUserType, null | undefined>;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="w-full md:w-2/3 px-4 md:px-0 mx-auto">
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </div>
  );
}

const fetcher = (info: RequestInfo) => fetch(info).then((res) => res.json());

function Auth({ children }) {
  const { data, error } = useSWR("/api/who", fetcher);

  if (data && data.token) {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: data.token ? `Bearer ${data.token}` : "",
        },
      };
    });

    const httpLink = createHttpLink({
      uri: process.env.NEXT_PUBLIC_API_HOST + "/graphql",
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    const renderUserInfo = () => {
      const UserInfo = ({ githubLogin, email }: User) => {
        return <span>Signed in as {githubLogin || email}</span>;
      };

      return (
        <CurrentUserContext.Consumer>
          {(user: CurrentUserType) =>
            user ? <UserInfo {...user} /> : <Link href="#">Sign in</Link>
          }
        </CurrentUserContext.Consumer>
      );
    };

    return (
      <ApolloProvider client={client}>
        <menu className="my-4">
          <Link href="/">
            <a>
              <strong>Twist</strong>
            </a>
          </Link>{" "}
          &nbsp; | &nbsp;
          <CurrentUser>{renderUserInfo()}</CurrentUser>
        </menu>
        <CurrentUser>{children}</CurrentUser>
      </ApolloProvider>
    );
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="flex">
      <div className="m-auto h-screen p-4">
        You must first{" "}
        <Link href="/api/auth/signin">
          <a>sign in</a>
        </Link>{" "}
        to use this application.
      </div>
    </div>
  );
}

export default MyApp;
