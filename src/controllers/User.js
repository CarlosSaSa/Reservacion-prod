"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationsPersonal = exports.getClassRoomById = exports.getAllClassRoom = exports.getAllReservations = exports.obtenerReservaciones = exports.crearReservacion = void 0;
var express_validator_1 = require("express-validator");
var Reservaciones_1 = require("../models/Reservaciones");
var flattenObject_1 = require("../utils/flattenObject");
var Salones_1 = require("../models/Salones");
var moment_1 = __importDefault(require("moment"));
require("moment/locale/es-mx");
moment_1.default.locale('es-mx');
// Controlador para crear una reservacion
exports.crearReservacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fecha_inicio, fecha_fin, salon, id, errors, overlapsDate, ReservacionEvent, Reservacion, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fecha_inicio = _a.fecha_inicio, fecha_fin = _a.fecha_fin, salon = _a.salon;
                id = req.id;
                errors = express_validator_1.validationResult(req);
                // si hay errores
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'Verifique bien los datos', errors: errors.array() })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.find({ salon: { $eq: salon }, fecha_inicio: { $lt: fecha_fin }, fecha_fin: { $gt: fecha_inicio } }).exec()];
            case 2:
                overlapsDate = _b.sent();
                // si la consulta devuelve datos entonces no podemos insertar
                if (overlapsDate.length > 0) {
                    return [2 /*return*/, res.status(406).json({ mensaje: 'Las fechas estan traslapadas con otro evento' })];
                }
                ReservacionEvent = new Reservaciones_1.ReservacionesModel({ fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, usuario: id, salon: salon });
                return [4 /*yield*/, ReservacionEvent.save()];
            case 3:
                Reservacion = _b.sent();
                return [2 /*return*/, res.status(201).send({ mensaje: 'Evento creado con exito', Reservacion: Reservacion })];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error mientras se registraba el evento' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.obtenerReservaciones = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salon, page, limit, Reservaciones, _i, Reservaciones_2, i, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                salon = req.query.salon;
                page = parseInt(req.query.page);
                limit = parseInt(req.query.limit);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.
                        paginate({ salon: { $eq: salon } }, { select: '-_id -__v', page: page, limit: limit, populate: { path: 'salon usuario', select: '-__v -fecha_creacion -fecha_actualizacion -password' },
                        lean: true, leanWithId: false })];
            case 2:
                Reservaciones = (_a.sent()).docs;
                if (Reservaciones.length > 0) {
                    for (_i = 0, Reservaciones_2 = Reservaciones; _i < Reservaciones_2.length; _i++) {
                        i = Reservaciones_2[_i];
                        i.usuario._id = i.usuario._id.toString();
                        i.salon._id = i.salon._id.toString();
                        i.fecha_inicio = moment_1.default.utc(i.fecha_inicio).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                        i.fecha_fin = moment_1.default.utc(i.fecha_fin).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                    }
                }
                return [2 /*return*/, res.status(200).json({ mensaje: 'Peticion correcta', Reservaciones: flattenObject_1.flattenArray(Reservaciones) })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error del servidor' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Controlador para obtener todas las reservaciones es decir sin el filtro del salon
exports.getAllReservations = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, pagina, limite, Reservaciones, _i, Reservaciones_3, i, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, page = _a.page, size = _a.size;
                pagina = parseInt(page, 10);
                limite = parseInt(size, 10);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.paginate({}, {
                        select: '-__v',
                        populate: { path: "usuario salon", select: '-_id -__v -password' },
                        page: pagina,
                        limit: limite,
                        sort: { fecha_inicio: 'asc' },
                        lean: true,
                        leanWithId: false
                    })];
            case 2:
                Reservaciones = (_b.sent()).docs;
                if (Reservaciones.length > 0) {
                    for (_i = 0, Reservaciones_3 = Reservaciones; _i < Reservaciones_3.length; _i++) {
                        i = Reservaciones_3[_i];
                        i._id = i._id.toString();
                        if (i.fecha_inicio && i.fecha_fin) {
                            i.fecha_inicio = moment_1.default.utc(i.fecha_inicio).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                            i.fecha_fin = moment_1.default.utc(i.fecha_fin).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                        }
                    }
                }
                return [2 /*return*/, res.status(200).json({ mensaje: 'Listo!', Reservaciones: flattenObject_1.flattenArray(Reservaciones) })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error', error: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllClassRoom = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Salones, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Salones_1.AulasModel.find({}, '-__v').sort({ nombreSalon: 1 })];
            case 1:
                Salones = _a.sent();
                return [2 /*return*/, res.status(200).json({ mensaje: 'Listo!', Salones: Salones })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClassRoomById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, salon, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Salones_1.AulasModel.findById(id, '-__v').exec()];
            case 2:
                salon = _a.sent();
                // si no existe el salon o es null
                if (!salon) {
                    return [2 /*return*/, res.status(200).json({ mensaje: 'Salón no disponible' })];
                }
                return [2 /*return*/, res.status(200).json({ mensaje: 'Salon Ok', salon: salon })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error', error: error_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReservationsPersonal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, page, limit, pagina, limite, docs, _i, docs_1, index, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.id;
                _a = req.query, page = _a.page, limit = _a.limit;
                pagina = parseInt(page, 10) || 1;
                limite = parseInt(limit, 10) || 10;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.paginate({ usuario: id }, {
                        select: '-__v',
                        populate: { path: 'usuario salon', select: "-password -correo -fecha_creacion -fecha_actualizacion -__v" },
                        page: pagina,
                        limit: limite,
                        lean: true,
                        leanWithId: false,
                    })];
            case 2:
                docs = (_b.sent()).docs;
                if (docs.length > 0) {
                    for (_i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
                        index = docs_1[_i];
                        index._id = index._id.toString();
                        index.fecha_inicio = moment_1.default.utc(index.fecha_inicio).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                        index.fecha_fin = moment_1.default.utc(index.fecha_fin).local().format('dddd, D [de] MMMM [de] YYYY h:mm:ss a');
                        if (index.usuario && index.salon) {
                            index.usuario._id = index.usuario._id.toString();
                            index.salon._id = index.salon._id.toString();
                        }
                    }
                }
                // convertir fechas a datos locales asi como los ids a strings
                return [2 /*return*/, res.status(200).json({ mensaje: 'Datos obtenido correctamente', Reservaciones: flattenObject_1.flattenArray(docs) })];
            case 3:
                error_6 = _b.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error del servidor' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
// funcion para actualizar un documento
exports.updateReservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idReservacion, _a, fecha_inicio, fecha_fin, salon, errors, Reservacion, overlapsDate, ReservationUpdated, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idReservacion = req.query.idReservacion;
                _a = req.body, fecha_inicio = _a.fecha_inicio, fecha_fin = _a.fecha_fin, salon = _a.salon;
                errors = express_validator_1.validationResult(req);
                // si hay errores
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'Verifique bien los datos', errors: errors.array() })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.findById(idReservacion).exec()];
            case 2:
                Reservacion = _b.sent();
                // si es nulo entonces no existe la reservacion
                if (!Reservacion) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'La reservacion no existe' })];
                }
                // si el id del usuario de la reservacion es diferente al id del token entonces no puede edutat
                if (Reservacion.usuario != req.id) {
                    return [2 /*return*/, res.status(403).json({ mensaje: 'La reservacion no existe' })];
                }
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.find({ _id: { $ne: idReservacion }, salon: { $eq: salon }, fecha_inicio: { $lt: fecha_fin }, fecha_fin: { $gt: fecha_inicio } }).exec()];
            case 3:
                overlapsDate = _b.sent();
                if (overlapsDate.length > 0) {
                    return [2 /*return*/, res.status(406).json({ mensaje: 'Las fechas estan traslapadas con otro evento' })];
                }
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.findByIdAndUpdate(idReservacion, { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, salon: salon }, { new: true })];
            case 4:
                ReservationUpdated = _b.sent();
                return [2 /*return*/, res.status(201).json({ mensaje: 'Evento actualizado', ReservationUpdated: ReservationUpdated })];
            case 5:
                error_7 = _b.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
// funcion para eliminar una reservacion
exports.deleteReservation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Reservacion, userDeleted, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.findById(id).exec()];
            case 2:
                Reservacion = _a.sent();
                if (!Reservacion) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'No es posible encontrar el id' })];
                }
                // si existe la reservacion pero el id del usuario que esta en el token no coindice con el id del usuario
                if (req.id !== Reservacion.usuario.toString()) {
                    return [2 /*return*/, res.status(403).json({ mensaje: 'No puede borrar una reservación que no es suya' })];
                }
                return [4 /*yield*/, Reservaciones_1.ReservacionesModel.findByIdAndDelete(id)];
            case 3:
                userDeleted = _a.sent();
                return [2 /*return*/, res.status(200).json({ mensaje: 'Usuario eliminado', userDeleted: userDeleted })];
            case 4:
                error_8 = _a.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error mientras se realizaba la operación' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
