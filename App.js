import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store";
import HomeScreen from "./components/HomeScreen";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <HomeScreen />
    </ReduxProvider>
  );
}
