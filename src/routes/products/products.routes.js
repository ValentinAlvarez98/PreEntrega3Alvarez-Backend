import {
    Router
} from "express";
import {
    ProductsController
} from "../../controllers/products/products.controller.js";

import {
    authAdmin as adminMiddleware,
} from "../../middlewares/auth.middleware.js";

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAll);
productsRouter.get('/:id', ProductsController.getById);
productsRouter.post('/', adminMiddleware, ProductsController.addOne);
productsRouter.put('/:id', adminMiddleware, ProductsController.updateOne);
productsRouter.delete('/:id', adminMiddleware, ProductsController.deleteOne);

export default productsRouter;