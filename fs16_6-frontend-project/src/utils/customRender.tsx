import { RenderOptions, render } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//redux
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Router>
        <Provider store={store}> {children} </Provider>
      </Router>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
};

export default customRender;
