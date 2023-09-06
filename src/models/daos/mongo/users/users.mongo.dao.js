import {
      MongoManager
} from "../../../manager/mongo/mongo.manager.js";
import usersModel from "../../../schemas/users.schema.js";

export class UsersMongoDAO {

      constructor() {

            MongoManager.start();

      };

      async getOne(payload) {

            if (payload.email) {

                  return await usersModel.findOne({
                        email: payload.email
                  }).lean();

            } else if (payload.id) {

                  return await usersModel.findOne({
                        _id: payload.id
                  }).lean();

            };

      };

      async addOne(payload) {

            return await usersModel.create(payload);

      };

      async updateOne(email, payload) {

            return await usersModel.findOneAndUpdate({
                  email: email
            }, payload, {
                  new: true
            });

      };

      async deleteOne(payload) {

            return await usersModel.findOneAndDelete(
                  payload.email
            );

      };

};