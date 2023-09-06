import {
    getDAOS
} from "../../daos/index.daos.js";
import {
    getDTOS
} from "../../dtos/index.dtos.js";

const {
    SaveProductDTO,
    LoadProductDTO,
    GetProductDTO,
    UpdateProductDTO,
    DeleteProductDTO
} = getDTOS();

const {
    productsMongoDAO
} = getDAOS();

export class ProductsRepository {

    constructor() {

        this.dao = productsMongoDAO;

    };

    async getAll({
        limit = 10,
        page = 1,
        sort,
        query
    }) {

        return await this.dao.getAll({
            limit,
            page,
            sort,
            query
        })

    };

    async getById(id) {

        return await this.dao.getById(id);

    };

    async addOne(product) {

        return await this.dao.saveProduct(product);

    };

    async updateOne(id, product) {

        return await this.dao.updateById(id, product);

    };

    async deleteOne(id) {

        return await this.dao.deleteById(id);

    };

}