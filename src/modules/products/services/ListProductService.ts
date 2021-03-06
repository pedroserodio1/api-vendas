import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);

        const products = await productRepository.find();

        if (!products) {
            throw new AppError('No products found', 404);
        }

        return products;
    }
}

export default ListProductService;
