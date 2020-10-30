"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var home_1 = __importDefault(require("./routes/home"));
var admin_1 = __importDefault(require("./routes/admin"));
var user_1 = __importDefault(require("./routes/user"));
// Inicializacion
var app = express_1.default();
// Middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
// Rutas
app.use('/home', home_1.default);
app.use('/admin', admin_1.default);
app.use('/user', user_1.default);
exports.default = app;
