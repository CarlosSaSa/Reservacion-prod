"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserDefinition = {
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date
    },
    fecha_actualizacion: {
        type: Date,
    }
};
// definiendo el esquema
var userSchema = new mongoose_1.Schema(UserDefinition, { timestamps: { createdAt: 'fecha_creacion', updatedAt: 'fecha_actualizacion' } });
// Creando el modelo
exports.UserModel = mongoose_1.model('Usuarios', userSchema);
