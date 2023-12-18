import {
  RegisterInputs,
  TUser,
  TUserEditInput,
  UpdateUserInputs,
} from "../../@types/user";
import {
  addNewUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/reducers/admin/adminUserReducer";
import store from "../../redux/store";
import usersServer from "../../server/userServer";
import { userData } from "../testData/userData";

describe("user reducers", () => {
  test("should fetch all users", async () => {
    await store.dispatch(fetchUsers());
    expect(store.getState().adminUsers.data.length).toBe(3);
  });

  test("should register new user", async () => {
    const data: RegisterInputs = {
      firstName: "test",
      lastName: "user",
      email: "test@gmail.com",
      password: "12345",
      role: "USER",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6355",
    };
    const res = await store.dispatch(addNewUser(data));
    expect(res.meta.arg).toMatchObject({
      firstName: "test",
      lastName: "user",
      email: "test@gmail.com",
      password: "12345",
      role: "USER",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6355",
    });
  });

  test("should update user data", async () => {
    const data: UpdateUserInputs = {
      email: "test@mail.com",
      firstName: "Maria",
      lastName: "stha",
      role: "USER",
      avatar: "https://i.imgur.com/00qWleT.jpeg",
    };
    const res = await store.dispatch(updateUser({ id: "2", data }));
    expect(res.meta.arg).toMatchObject({
      _id: "2",
      email: "test@mail.com",
      firstName: "Maria",
      lastName: "stha",
      role: "USER",
      avatar: "https://i.imgur.com/00qWleT.jpeg",
    });
  });

  test("should delete product by id", async () => {
    const res = store.dispatch(deleteUser({ id: "1" }));
    expect(res.arg.id).toBe(1);
  });
});

beforeAll(() => usersServer.listen());

afterEach(() => usersServer.resetHandlers());

afterAll(() => usersServer.close());
