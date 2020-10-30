"use strict";
/**
 * Rutas para crear recursos de los usuarios
*/
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var User_1 = require("../controllers/User");
var user_1 = require("../middlewares/user");
// Creamos una instancia de route
var app = express_1.Router();
// Creacion del array de middlewares usando express validator
var arrayValidator = [express_validator_1.body('salon').notEmpty().withMessage('El id del salon es requerido'),
    express_validator_1.body(['fecha_inicio', 'fecha_fin']).custom(user_1.customDateVerify).
        withMessage('Verifique el formato de las fechas o que la fecha no sea igual o menor a la de hoy'),
    user_1.AuthUser
];
// metodo para poder insertar un registro de un evento es decir una reservacion
app.post('/crearReservacion', arrayValidator, User_1.crearReservacion);
app.get('/obtenerReservaciones', user_1.AuthUser, User_1.obtenerReservaciones);
app.get('/getAllReservations', User_1.getAllReservations);
app.get('/obtenerSalon/:id', User_1.getClassRoomById);
app.get('/obtenerSalones', User_1.getAllClassRoom);
app.get('/obtenerHorarioPersonal', user_1.AuthUser, User_1.getReservationsPersonal);
app.put('/updateReservation', arrayValidator, User_1.updateReservation);
app.delete('/deleteReservation/:id', user_1.AuthUser, User_1.deleteReservation);
exports.default = app;
