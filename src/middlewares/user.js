"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customDateVerify = exports.AuthUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var moment_1 = __importDefault(require("moment"));
var configJWT_1 = require("../config/configJWT");
/**
 * Funcion que actua como middleware en el cual se debe obtener un token valido, si el token no es valido
 * entonces no se le permite el acceso al controlador
*/
exports.AuthUser = function (req, res, next) {
    // como el token vendra en el header de autorización entonces necesitamos extraerlo de ahi
    var token = req.headers.authorization;
    // si el token viene nulo entonces no se avanza
    if (!token) {
        return res.status(401).json({ mensaje: 'El token no ha sido encontrado' });
    }
    // verificamos si es un token valido
    try {
        var decodedToken = jsonwebtoken_1.verify(token, configJWT_1.secretKey);
        // del token obtenemos el id del usuario
        req.id = decodedToken._id;
        next();
    }
    catch (error) {
        // si el token es invalido
        // si el token ha expirado entonces mandamos un 401
        if (error.expiredAt) {
            return res.status(401).json({ mensaje: 'El token ha expirado' });
        }
        // cualquier otro caso es un token manipulado, etc
        return res.status(401).json({ mensaje: 'Token invalido' });
    }
};
// Middleware customizado para saber si la fecha de inicio es valida o no, esta es una funcion sincrona
// esta funcion sincrona debe retornar false si el valor es invalido
exports.customDateVerify = function (value) {
    var today = moment_1.default().date();
    // // Verificamos que la fecha sea valida
    if (!moment_1.default(value).isValid()) {
        throw new Error('La fecha es inválida');
    }
    //si son validas entonces verificamos que el dia no sea mayor o menor al dia de hoy
    // si el dia es mayor o menos al dia de hoy es un dato invalido
    if (moment_1.default(value).date() > today || moment_1.default(value).date() < today) {
        throw new Error('La fecha debe ser igual al dia de hoy');
    }
    return true;
};
// TODO: Crear un validador para obtener las horas y las fechas
