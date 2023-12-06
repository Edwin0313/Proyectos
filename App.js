import React from "react";
import AppContainer from "./src/navigation/AppContainer";
import PokeState from "./src/store/PokeState";

export default function App() {
  return (
    <PokeState>
      <AppContainer />
    </PokeState>
  );
}
