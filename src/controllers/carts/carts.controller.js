import {
    successResponse
} from '../../utils/responses/responses.utils.js';
import {
    getRepositories
} from '../../models/repositories/index.repository.js';

const {
    cartsRepository
} = getRepositories();

export class CartsController {

    static async getAll(req, res, next) {

        try {

            const carts = await cartsRepository.getAll();
            res.send(successResponse(carts));

        } catch (error) {

            next(error);

        };

    };

    static async getOne(req, res, next) {

        try {

            const {
                code
            } = req.params;

            const cart = await cartsRepository.getOne(
                code
            );

            res.send(successResponse(cart));

        } catch (error) {

            next(error);

        };

    };

    static async saveOne(req, res, next) {

        try {

            const user = req.body.userId;
            const result = await cartsRepository.saveOne(user);
            res.send(successResponse(result));

        } catch (error) {

            next(error);

        };

    };

    static async addProduct(req, res, next) {

        try {

            const {
                code,
                productId,
                quantity
            } = req.body;

            const result = await cartsRepository.addProduct(code, productId, quantity);

            res.send(successResponse(result));

        } catch (error) {

            next(error);

        };

    };

    static async deleteProduct(req, res, next) {

        try {
            const {
                code,
                productId
            } = req.body;

            const result = await cartsRepository.deleteProduct(code, productId);

            res.send(successResponse(result));

        } catch (error) {

            next(error);

        };

    };


    static async purchaseCart(req, res, next) {

        try {

            const {
                code
            } = req.params;

            const result = await cartsRepository.purchaseCart(code);

            res.send(successResponse(result));

        } catch (error) {

            next(error);

        };

    };

};