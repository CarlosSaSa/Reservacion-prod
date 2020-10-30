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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
var User_1 = require("../models/User");
var express_validator_1 = require("express-validator");
var bcrypt_1 = require("bcrypt");
var jwt_1 = require("../utils/jwt");
var converts_1 = require("../utils/converts");
exports.Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nombre, apellido, correo, password, errors, User, UserExist, _b, _c, nombre_1, apellido_1, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, nombre = _a.nombre, apellido = _a.apellido, correo = _a.correo, password = _a.password;
                errors = express_validator_1.validationResult(req);
                // para obtener ese arreglo de errores usamos la funcion array(), para comprobar que esta vacio podenos usar la funcion
                // isEmpty()
                // entonces si el array de errores no esta vacio mandamos los mensajes de errores
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'Verifique bien sus datos', errores: errors.array() })];
                }
                User = new User_1.UserModel({
                    nombre: nombre, apellido: apellido, correo: correo, password: password
                });
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.UserModel.findOne({ correo: correo }).exec()];
            case 2:
                UserExist = _d.sent();
                // si existe el elemento entonces el usuario ya existe
                if (UserExist) {
                    return [2 /*return*/, res.status(406).json({ mensaje: 'El usuario ya esta registrado' })];
                }
                // Si no esta registrado entonces lo guardamos, hay que encriptar la contraseña
                _b = User;
                return [4 /*yield*/, bcrypt_1.hash(User.password, 10)];
            case 3:
                // Si no esta registrado entonces lo guardamos, hay que encriptar la contraseña
                _b.password = _d.sent();
                return [4 /*yield*/, User.save()];
            case 4:
                _c = _d.sent(), nombre_1 = _c.nombre, apellido_1 = _c.apellido;
                return [2 /*return*/, res.status(201).json({ mensaje: 'Usuario guardado con exito', Usuario: { nombre: nombre_1 + " " + apellido_1 } })];
            case 5:
                error_1 = _d.sent();
                // si ha ocurrido un error
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error al registrar un usuario', error: error_1 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Funcion para el login de usuario
exports.Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, correo, password, errors, UserExist, IsSamePassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, correo = _a.correo, password = _a.password;
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'Verifique bien sus datos', errores: errors.array() })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User_1.UserModel.findOne({ correo: correo })];
            case 2:
                UserExist = _b.sent();
                // si el variable UserExist es null entonces el usuario no esta registradi en caso contrario ya esta registrado
                if (!UserExist) {
                    return [2 /*return*/, res.status(406).json({ mensaje: 'El usuario y/o contraseña no son correctos' })];
                }
                return [4 /*yield*/, bcrypt_1.compare(password, UserExist.password)];
            case 3:
                IsSamePassword = _b.sent();
                // si la variable anterior es true entonces la contraseña es correcta
                if (!IsSamePassword) {
                    return [2 /*return*/, res.status(400).json({ mensaje: 'El usuario y/o contraseña no son correctos' })];
                }
                return [4 /*yield*/, jwt_1.generarJWT(converts_1.ConvertToPayload(UserExist))];
            case 4:
                token = _b.sent();
                // hasta este punto la autenticacion ha sido un exito entonces procedemos a enviar el JWT
                return [2 /*return*/, res.status(200).json({ mensaje: 'Login correcto', token: token })];
            case 5:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ mensaje: 'Ha ocurrido un error al iniciar sesion', error: error_2 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
