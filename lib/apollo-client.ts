import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

export default client;
