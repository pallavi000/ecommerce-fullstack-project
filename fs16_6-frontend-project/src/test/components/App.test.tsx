// import { render, screen, waitFor } from "@testing-library/react"
// import { Provider } from "react-redux"
// import store from "../shared/store"
// import App from "../../App"
// import appRender from "./appRender"
// import userServer from "../servers/userServer"

import { waitFor, screen } from "@testing-library/react";
import App from "../../App";
import appRender from "./appRender";

// beforeAll(() => userServer.listen())
// afterAll(() => userServer.close())

describe("Test App component", () => {
  test("Should layout match snapshot", async () => {
    /* const { asFragment } = render(
            <Provider store={store}>
                <App />
            </Provider>
        ) */
    //const {baseElement, findByText} = appRender(<App />)
    // expect(baseElement).toMatchSnapshot()
    // expect(screen.getAllByText("Create new user").length).toBe(1)
    // appRender(<App />);
    // await waitFor(() => screen.getAllByText(/logo/i));
    // expect(screen.getAllByText(/logo/i).length).toBe(1);
  });
});
