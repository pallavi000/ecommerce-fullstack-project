import { screen, fireEvent } from "@testing-library/react";

import SignIn from "../../pages/SignIn";
import customRender from "../../utils/customRender";

describe("test the SignIn component", () => {
  test("render a sign in form with a button that triggers navigation", async () => {
    customRender(<SignIn />);
    const button = screen.getByRole("button", { name: "Sign In" });
    const emailInput = screen.getByLabelText("Enter Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "john@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "changeme" } });
    expect(emailInput.value).toBe("john@mail.com");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
