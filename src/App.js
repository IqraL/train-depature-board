import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Board from "./Board";
const client = new ApolloClient({
  uri:
    process.env.REACT_APP_ENV === "dev"
      ? process.env.REACT_APP_DEV_URI
      : process.env.REACT_APP_PRODUCTION_URI,
  cache: new InMemoryCache(),
});

console.log(process.env.ENV);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Board />
      </div>
    </ApolloProvider>
  );
}

export default App;
