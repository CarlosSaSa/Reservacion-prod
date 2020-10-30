"use strict";
/**
 * Modelo para las reservaciones
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservacionesModel = void 0;
var mongoose_1 = require("mongoose");
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// cremos las opciones del modelo
var ReservacionesOptions = {
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    usuario: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    salon: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Aulas',
        required: true
    }
};
// creamos el esquema
var ReservacionesSchema = new mongoose_1.Schema(ReservacionesOptions);
ReservacionesSchema.plugin(mongoose_paginate_v2_1.default);
// exportamos el modelo
exports.ReservacionesModel = mongoose_1.model('Reservaciones', ReservacionesSchema);
