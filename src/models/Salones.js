"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AulasModel = void 0;
var mongoose_1 = require("mongoose");
// Creamos la definicion del esquema
var AulasSchema = {
    nombreSalon: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    }
};
// Creamos el esquema
var Aulas = new mongoose_1.Schema(AulasSchema);
// Creamos el modelo
exports.AulasModel = mongoose_1.model('Aulas', Aulas);
