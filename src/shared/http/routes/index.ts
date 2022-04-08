import productsRouter from '@modules/products/routes/products.routes';
import sessionRoutes from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRoutes);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

export default routes;
