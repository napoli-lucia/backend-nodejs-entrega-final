import ProductRepositoryDao from "./products.repository.js";
import CartRepositoryDao from "./carts.repository.js";
import UserRepositoryDao from "./users.repository.js";
import MessageRepositoryDao from "./messages.repository.js";

import ProductServiceDao from "../dao/mongodb/products.service.js"
import CartServiceDao from "../dao/mongodb/carts.service.js";
import UserServiceDao from "../dao/mongodb/users.service.js";
import MessageServiceDao from "../dao/mongodb/messages.service.js";

export const productService = new ProductRepositoryDao(new ProductServiceDao());
export const cartService = new CartRepositoryDao(new CartServiceDao());
export const userService = new UserRepositoryDao(new UserServiceDao());
export const messageService = new MessageRepositoryDao(new MessageServiceDao());