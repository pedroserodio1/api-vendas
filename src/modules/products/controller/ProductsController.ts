import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listProducts = new ListProductService();

        const products = await listProducts.execute();

        return res.status(200).json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const showProduct = new ShowProductService();

        const { id } = req.params;

        const product = await showProduct.execute({ id });

        return res.status(200).json(product);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const createProduct = new CreateProductService();

        const { name, price, quantity } = req.body;

        const product = await createProduct.execute({ name, price, quantity });

        return res.status(201).json(product);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const updateProduct = new UpdateProductService();

        const { name, price, quantity } = req.body;
        const { id } = req.params;

        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        return res.status(200).json(product);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const deleteProduct = new DeleteProductService();

        const { id } = req.params;

        await deleteProduct.execute({ id });

        return res.status(204).json([]);
    }
}
