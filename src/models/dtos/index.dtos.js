import {
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
} from "./users/users.dto.js";

import {
      GetProductsDTO
} from "./products/products.dto.js";

import {
      GetCartDTO,
      SaveCartDTO,
      AddProductDTO,
      DeleteProductDTO,
      PurchaseCartDTO
} from "./carts/carts.dto.js";

export const getDTOS = () => ({
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
      GetProductsDTO,
      GetCartDTO,
      SaveCartDTO,
      AddProductDTO,
      DeleteProductDTO,
      PurchaseCartDTO
});