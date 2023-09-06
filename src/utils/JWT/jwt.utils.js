import jwt from "jsonwebtoken";

import {
      errorResponse,
      HTTP_STATUS
} from "../responses/responses.utils.js";

const KEY = process.env.KEY;

export const generateJWT = (payload) => {

      const token = jwt.sign({
            payload
      }, KEY, {
            expiresIn: '12h'
      })

      return token;

};

export const verifyJWT = (token) => {

      const decoded = jwt.verify(token, KEY);

      return decoded;

};

export const authToken = (req, res, next) => {

      try {

            const headerAuth = req.headers.authorization;

            if (!headerAuth) {

                  return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

            };

            const token = headerAuth.split(' ')[1];

            const decoded = verifyJWT(token);

            req.user = decoded.payload;

            next();

      } catch (error) {

            throw error;

      };

};

export const authAdmin = (req, res, next) => {

      try {

            const headerAuth = req.headers.authorization;

            if (!headerAuth) {

                  return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No se ha enviado el token de autenticación'));

            };

            const token = headerAuth.split(' ')[1];

            const decoded = verifyJWT(token);

            if (decoded.payload.role !== 'admin') {

                  return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorResponse('No está autorizado para acceder a este recurso'));

            };

            req.user = decoded.payload;

            next();

      } catch (error) {

            throw error;

      };

};