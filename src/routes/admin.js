"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var Admin_1 = require("../controllers/Admin");
// Creamos las rutas para que se puedan crear cosas de administrador
var app = express_1.Router();
// Array de validaciones
var validacionesRegistro = [express_validator_1.check('nombreSalon').notEmpty().withMessage('El campo es obligatorio')];
// Ruta para crear un salon
app.post('/crearSalon', validacionesRegistro, Admin_1.CrearSalon);
exports.default = app;
