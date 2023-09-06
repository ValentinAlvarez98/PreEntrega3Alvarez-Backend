import {
      createHash,
      compareHash
} from "../../../utils/bcrypt/bcrypt.utils.js";

const validEmail = (email) => {

      const emailRegex = /^\w+([\.-]?\w+)*@(?:hotmail|outlook|gmail|coder|github)\.(?:|com|es)+$/i;

      return emailRegex.test(email);

};

export class GetUserDTO {

      constructor(payload) {

            const errors = [];

            if (!validEmail(payload)) errors.push("Se requiere un email valido");

            this.email = payload ? payload : '';
            this.id = payload.id ? payload.id : '';
            errors.length > 0 ? this.errors = errors : null;

      }

};

export class LoadUserDTO {

      constructor(payload, user) {

            const errors = [];

            for (const key in payload) {

                  if (!payload[key]) errors.push(`Se requiere ${key}`);

            };

            if (!payload.password) errors.push("Se requiere una contraseña");

            if (!user) errors.push("El usuario no existe");

            const executeValidation = payload.password && user ? true : false;

            if (executeValidation) {

                  const compare = compareHash(payload.password, user);

                  if (!compare) errors.push("Contraseña incorrecta");

            };

            this.email = user.email;
            this.id = user._id;
            this.age = user.age;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.phone = user.phone;
            this.role = user.role;
            errors.length > 0 ? this.errors = errors : null;

      };

};

export class SaveUserDTO {

      constructor(payload) {

            const errors = [];

            for (const key in payload) {

                  if (!payload[key] && key !== "phone") errors.push(`Se requiere ${key}`);

            };

            if (payload.password && payload.password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres");

            if (payload.password !== payload.confirm_password) errors.push("Las contraseñas no coinciden");

            if (!validEmail(payload.email)) errors.push("Se requiere un email valido");

            const hashedPassword = createHash(payload.password);

            this.first_name = payload.first_name;
            this.last_name = payload.last_name;
            this.email = payload.email;
            this.age = payload.age;
            this.password = hashedPassword;
            this.role = payload.role;
            this.phone = payload.phone;
            errors.length > 0 ? this.errors = errors : null;

      };

};

export class UpdateUserDTO {

      constructor(updatedPayload, payloadToUpdate) {

            const errors = [];

            if (updatedPayload.email && !validEmail(updatedPayload.email)) errors.push("Se requiere un email valido");

            if (updatedPayload.password && updatedPayload.password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres");

            if (updatedPayload.password && updatedPayload.password !== updatedPayload.confirm_password) errors.push("Las contraseñas no coinciden");

            if (updatedPayload.password) updatedPayload.password = createHash(updatedPayload.password);

            for (const key in updatedPayload) {

                  if (updatedPayload[key]) payloadToUpdate[key] = updatedPayload[key];

            };

            if (payloadToUpdate.password && payloadToUpdate.password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres");

            this.first_name = payloadToUpdate.first_name;
            this.last_name = payloadToUpdate.last_name;
            this.email = payloadToUpdate.email;
            this.age = payloadToUpdate.age;
            this.password = payloadToUpdate.password;
            this.role = payloadToUpdate.role;
            this.phone = payloadToUpdate.phone;
            errors.length > 0 ? this.errors = errors : null;

      }

}

export class DeleteUserDTO {

      constructor(payload) {

            const errors = [];

            if (!validEmail(payload.email)) errors.push("Se requiere un email valido");

            if (payload.password !== payload.confirm_password) errors.push("Las contraseñas no coinciden");

            this.email = payload.email;
            this.password = payload.password;
            errors.length > 0 ? this.errors = errors : null;

      }

};

export class LoadAdminDTO {

      constructor(payload, admin) {

            const errors = [];

            for (const key in payload) {

                  if (!payload[key]) errors.push(`Se requiere ${key}`);

            };

            if (payload.email !== admin.email) errors.push("El usuario no existe");

            const executeValidation = payload.password && admin ? true : false;

            if (executeValidation) {

                  const compare = compareHash(payload.password, admin);

                  if (!compare) errors.push("Contraseña incorrecta");

            };

            this.email = admin.email;
            this.role = admin.role;
            this.first_name = admin.first_name;
            this.last_name = admin.last_name;
            errors.length > 0 ? this.errors = errors : null;

      };

};