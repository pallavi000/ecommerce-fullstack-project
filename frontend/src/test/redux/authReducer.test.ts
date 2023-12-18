import usersServer from "../../server/userServer";
import store from "../../redux/store";
import { loginUser } from "../../redux/reducers/authReducer";
import { LoginInputs } from "../../@types/user";

beforeAll(() => usersServer.listen());

afterEach(() => usersServer.resetHandlers());

afterAll(() => usersServer.close());

describe("auth reducers", () => {
  test("should test login user", async () => {
    const data: LoginInputs = {
      email: "john@mail.com",
      password: "changeme",
    };
    const res = await store.dispatch(loginUser(data));
    expect(res.meta.arg).toMatchObject({
      email: "john@mail.com",
      password: "changeme",
    });
  });
});
