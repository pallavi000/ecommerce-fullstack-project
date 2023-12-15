import { bannerFactory } from "./factory/bannerFactory";
import { categoryFactory } from "./factory/categoryFactory";
import { permissionFactory } from "./factory/permissionFactory";
import { productFactory } from "./factory/productFactory";
import { settingFactory } from "./factory/settingFactory";
import { sizeFactory } from "./factory/sizeFactory";
import { userFactory } from "./factory/userFactory";

export async function appSeeder() {
  await settingFactory();
  await bannerFactory();
  await categoryFactory();
  await sizeFactory();
  await productFactory();
  await permissionFactory();
  await userFactory();
}
