import productsRouter from '@modules/products/routes/Products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

export default routes;
