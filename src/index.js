"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var configDB_1 = require("./config/configDB");
var moment_1 = __importDefault(require("moment"));
require("moment/locale/es-mx");
moment_1.default.locale('es-mx');
var PORT = process.env.PORT || 8080;
// Cambiando el puerto
app_1.default.set('port', PORT);
// Conectando se la base de datos
mongoose_1.default.connect(configDB_1.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function () {
    // Si la conexion es exitosa entonces iniciamos el servidor
    app_1.default.listen(app_1.default.get('port'), function () {
        console.log("Escuchando en el puerto: " + app_1.default.get('port'));
    });
})
    .catch(function (error) {
    throw new Error(error);
});
