"use strict";
/**
 * Funcion para 'subir' propiedades de nivel
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenArray = void 0;
exports.flattenArray = function (array) {
    var arrayMod = array.map(function (data) {
        return flattenObject(data);
    });
    return arrayMod;
};
var flattenObject = function (obj, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return Object.keys(obj).reduce(function (acc, k) {
        var pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object')
            Object.assign(acc, flattenObject(obj[k], pre + k));
        else
            acc[pre + k] = obj[k];
        return acc;
    }, {});
};
