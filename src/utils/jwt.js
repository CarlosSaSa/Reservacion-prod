"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
// funcion para generar el token dado un payload
var jsonwebtoken_1 = require("jsonwebtoken");
var configJWT_1 = require("../config/configJWT");
exports.generarJWT = function (usuarioPayload) {
    var options = {
        // tiempo de expiracion del token
        expiresIn: '1h'
    };
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.sign(usuarioPayload, configJWT_1.secretKey, options, function (err, token) {
            if (err) {
                return reject(err);
            }
            // si no hay un error
            return resolve(token);
        });
    });
};
