import {
      getDAOS
} from "../../daos/index.daos.js";

import {
      getDTOS
} from "../../dtos/index.dtos.js";

const {
      SaveUserDTO,
      LoadUserDTO,
      GetUserDTO,
      UpdateUserDTO,
      DeleteUserDTO,
      LoadAdminDTO,
} = getDTOS();

const {
      usersMongoDAO,
      usersMemoryDAO
} = getDAOS();

export class UsersRepository {

      constructor() {

            this.dao = usersMongoDAO;
            this.dao.memory = usersMemoryDAO;

      };

      async getOne(payload) {

            const userPayload = new GetUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            const user = await this.dao.getOne(userPayload);

            return user;

      };

      async loginOne(payload) {

            const user = await this.dao.getOne(payload);

            const userPayload = new LoadUserDTO(payload, user);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

      async addOne(payload) {

            const userPayload = new SaveUserDTO(payload);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return await this.dao.addOne(userPayload);

      };

      async updateOne(email, payload) {

            const user = new GetUserDTO(email);

            const userToUpdate = await this.dao.getOne(user);

            const updatedPayload = new UpdateUserDTO(payload, userToUpdate);

            if (updatedPayload.errors) throw new Error(JSON.stringify(updatedPayload.errors));

            return await this.dao.updateOne(email, updatedPayload);

      };

      async deleteOne(payload) {

            const payloadToDelete = new DeleteUserDTO(payload);

            return await this.dao.deleteOne(payloadToDelete);

      };

      async loginAdmin(payload) {

            const admin = await this.dao.memory.getAdmin();

            const userPayload = new LoadAdminDTO(payload, admin);

            if (userPayload.errors) throw new Error(JSON.stringify(userPayload.errors));

            return userPayload;

      };

}