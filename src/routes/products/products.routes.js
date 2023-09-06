import { Router } from "express";
import { ProductsController } from "../../controllers/products/products.controller.js";

const productsRouter = Router();

productsRouter.get('/', ProductsController.getAll);
productsRouter.get('/:id', ProductsController.getById);
productsRouter.post('/', ProductsController.addOne);
productsRouter.put('/:id', ProductsController.updateOne);
productsRouter.delete('/:id', ProductsController.deleteOne);

export default productsRouter;