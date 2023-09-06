import {
    getRepositories
} from '../../models/repositories/index.repository.js';

const {
    productsRepository
} = getRepositories();


export class ViewsController {

    static async login(req, res, next) {

        res.render('login');

    };

    static async register(req, res, next) {

        res.render('register');

    };

    static async profile(req, res, next) {

        res.render('profile');

    };

    static async products(req, res, next) {

        try {

            const {
                page,
                limit,
                sort,
                query
            } = req.query;

            const productsData = await productsRepository.getAll({
                page,
                limit,
                sort,
                query
            });

            productsData.payload.products = productsData.payload.products.map((product) => {

                return {
                    ...JSON.parse(JSON.stringify(product)),
                };

            });

            res.render('products', {

                products: productsData.payload.products,
                hasPrevPage: productsData.hasPrevPage,
                hasNextPage: productsData.hasNextPage,
                prevPage: productsData.prevPage,
                nextPage: productsData.nextPage,

            });

        } catch (error) {

            next(error);
        };

    };

};