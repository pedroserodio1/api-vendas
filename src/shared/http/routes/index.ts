import productsRouter from '@modules/products/routes/products.routes';
import passwordRoutes from '@modules/users/routes/password.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRoutes);
routes.use('/password', passwordRoutes);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

export default routes;
