"use strict";
// funcion para retornar un objeto del tipo payload
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToPayload = void 0;
exports.ConvertToPayload = function (Usuario) { return ({
    _id: Usuario._id.toString(),
    nombre: Usuario.nombre,
    apellido: Usuario.apellido,
    correo: Usuario.correo
}); };
