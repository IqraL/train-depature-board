import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Board from "./Board";
const client = new ApolloClient({
  uri: "https://api.uk-train-times.com/graphql",
  cache: new InMemoryCache(),
});

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
