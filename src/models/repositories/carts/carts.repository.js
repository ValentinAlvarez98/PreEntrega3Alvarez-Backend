import {
    getDAOS
} from "../../daos/index.daos.js";
import {
    getDTOS
} from "../../dtos/index.dtos.js";

const {
    GetCartDTO,
    SaveCartDTO,
    AddProductDTO,
    UpdateProductQuantityDTO,
    DeleteProductDTO,
    PurchaseCartDTO
} = getDTOS();

const {
    cartsMongoDAO
} = getDAOS();

export class CartsRepository {

    constructor() {

        this.dao = cartsMongoDAO;

    };

    async getAll() {

        return await this.dao.getAll();

    };

    async getOne(payload) {

        const cartPayload = new GetCartDTO(payload);

        if (cartPayload.errors) throw new Error(JSON.stringify(cartPayload.errors));

        const cart = await this.dao.getOne(cartPayload);

        return cart;

    };

    async saveOne(user) {

        const dto = new SaveCartDTO(user);

        const preparedCart = await dto.prepareData();

        return await this.dao.saveOne(preparedCart);

    };

    async addProduct(code, productId, quantity) {

        const dto = new AddProductDTO(code, productId, quantity);

        const preparedCart = await dto.prepareData();

        return await this.dao.addProduct(code, preparedCart);

    };

    async deleteProduct(payload) {

        const payloadToDelete = new DeleteProductDTO(payload);

        return await this.dao.deleteProduct(payloadToDelete);

    };

    async purchaseCart(code) {

        const dto = new PurchaseCartDTO(code);

        const result = await dto.prepareData();

        return result;

    };

};