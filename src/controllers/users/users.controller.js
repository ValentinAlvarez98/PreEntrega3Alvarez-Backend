import {
      successResponse
} from '../../utils/responses/responses.utils.js';

import {
      getRepositories
} from '../../models/repositories/index.repository.js';

import {
      generateJWT
} from '../../utils/JWT/jwt.utils.js';

import CONFIG from '../../config/environment/config.js';

const {
      usersRepository
} = getRepositories();

export class UsersController {

      static async loginOne(req, res, next) {

            try {

                  const payload = req.body;

                  const user = await usersRepository.loginOne(payload);

                  if (!user && payload.email) throw new Error(`El usuario ${payload.email ? payload.email : payload.id}, no existe`);

                  const response = successResponse(user);
                  if (response.payload.password) response.payload.password = undefined;

                  const token = generateJWT(response.payload);

                  res.cookie('auth', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1000,
                  });

                  res.status(200).json({
                        message: `Usuario ${payload.email ? payload.email : payload.id}, encontrado correctamente`,
                        response,
                        token: token
                  });

            } catch (error) {

                  next(error);

            };

      };

      static async addOne(req, res, next) {

            try {

                  const payload = req.body;

                  try {

                        const exist = await usersRepository.getOne(payload.email);

                        if (exist) throw new Error(`El usuario ${payload.email}, ya existe`);

                        const newUser = await usersRepository.addOne(payload);

                        const response = successResponse(newUser);

                        if (response.payload.password) response.payload.password = undefined;

                        res.status(201).json({
                              message: `Usuario ${payload.email}, creado correctamente`,
                              response
                        });

                  } catch (error) {

                        next(error);

                  };

            } catch (error) {

                  next(error);

            };

      };

      static async updateOne(req, res, next) {

            try {

                  const {
                        email
                  } = req.params;

                  const payload = req.body;

                  const exist = await usersRepository.getOne(email);

                  if (!exist) throw new Error(`El usuario ${email}, no existe`);

                  const updatedUser = await usersRepository.updateOne(email, payload);

                  const response = successResponse(updatedUser);

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        message: `Usuario ${email}, actualizado correctamente`,
                        response
                  });

            } catch (error) {

                  next(error);

            };

      };

      static async deleteOne(req, res, next) {

            try {

                  const payload = req.body;

                  const user = await usersRepository.getOne(payload.email);

                  if (!user) throw new Error(`El usuario ${payload.email}, no existe`);

                  const deletedUser = await usersRepository.deleteOne({
                        email: user.email
                  });

                  const response = successResponse(deletedUser);

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        message: `Usuario ${deletedUser.email}, eliminado correctamente`,
                        response
                  });

            } catch (error) {

                  next(error);

            };

      };

      static async loginAdmin(req, res, next) {

            try {

                  const payload = req.body;

                  const admin = await usersRepository.loginAdmin(payload);

                  const response = successResponse(admin);

                  if (!response.payload) throw new Error(`El usuario ${payload.email ? payload.email : payload.id}, no existe`);

                  if (response.payload.password) response.payload.password = undefined;

                  const token = generateJWT(response.payload);

                  res.cookie('auth', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1000,
                  });

                  res.status(200).json({
                        message: `Usuario ${payload.email ? payload.email : payload.id}, encontrado correctamente`,
                        response,
                        token: token
                  });

            } catch (error) {

                  next(error);

            };

      };

      static async loginGithub(req, res, next) {
            try {

                  const user = req.user;

                  const response = successResponse(user);

                  if (!response.payload) throw new Error(`El usuario ${user.email}, no existe`);

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        message: `Usuario ${user.email}, encontrado correctamente`,
                        response
                  });

            } catch (error) {

                  next(error);

            }

      }

      static async loginGithubCallback(req, res, next) {

            try {

                  if (req.user) {
                        res.redirect('/profile');
                  } else {
                        res.redirect('/login');
                  }

            } catch (error) {

                  next(error);

            };

      };

};