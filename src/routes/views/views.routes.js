import { Router} from "express";

import { ViewsController } from "../../controllers/views/views.controller.js";

const viewsRouter = Router();

viewsRouter.get('/login', ViewsController.login);
viewsRouter.get('/register', ViewsController.register);
viewsRouter.get('/profile', ViewsController.profile);
viewsRouter.get('/products', ViewsController.products);

export default viewsRouter;