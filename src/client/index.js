import React from "react";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./components/app";

function init() {
  ReactDOM.render(<App />, document.getElementById("app"));
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("app"),
  )
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/app', () => init());
}