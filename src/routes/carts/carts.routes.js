import {
    Router
} from 'express';
import {
    CartsController
} from '../../controllers/carts/carts.controller.js';

const cartsRouter = Router();

cartsRouter.get('/', CartsController.getAll);
cartsRouter.get('/:code', CartsController.getOne);
cartsRouter.post('/', CartsController.saveOne);
cartsRouter.post('/:code/purchase', CartsController.purchaseCart);
cartsRouter.put('/', CartsController.addProduct);
cartsRouter.delete('/products', CartsController.deleteProduct);

export default cartsRouter;