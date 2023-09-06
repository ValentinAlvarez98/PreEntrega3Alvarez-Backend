import {
      Router
} from 'express';

import usersRouter from './users/users.routes.js';
import productsRouter from './products/products.routes.js';
import cartsRouter from './carts/carts.routes.js';
import viewsRouter from './views/views.routes.js';

import {
      authFromHeader as authMiddleware
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/api/users', usersRouter);
router.use('/api/products', authMiddleware, productsRouter);
router.use('/api/carts', authMiddleware, cartsRouter);

export default router;