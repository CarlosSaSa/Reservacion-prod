"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Register_1 = require("../controllers/Register");
var express_validator_1 = require("express-validator");
var app = express_1.Router();
// array de validaciones
var validacionesRegistro = [
    express_validator_1.check('nombre').notEmpty().withMessage('El nombre no puede ser vacio'),
    express_validator_1.check('apellido').notEmpty().withMessage('El apellido no puede ser vacio'),
    express_validator_1.check('correo').isEmail().withMessage('Debe ser un email válido'),
    express_validator_1.check('password').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];
// Array de validaciones para el login
var validacionesLogin = [
    express_validator_1.check('correo').isEmail().withMessage('Debe ser un email válido'),
    express_validator_1.check('password').notEmpty().withMessage('La contraseña es obligatoria')
];
// Registro
app.post('/register', validacionesRegistro, Register_1.Register);
// Login
app.post('/login', validacionesLogin, Register_1.Login);
exports.default = app;
