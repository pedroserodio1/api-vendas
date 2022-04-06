import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        const productExists = await productRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError('There is already one product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
