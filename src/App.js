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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var react_1 = require("react");
var parser_1 = require("@typescript-eslint/parser");
var sodium_universal_1 = require("sodium-universal");
var WebAuthnEncryption = function () {
    var _a = (0, react_1.useState)(""), encryptedText = _a[0], setEncryptedText = _a[1];
    var _b = (0, react_1.useState)(""), decryptedText = _b[0], setDecryptedText = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var handleEncrypt = function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, keyMaterial, encryptedBuffer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, window.navigator.credentials.get({ publicKey: {} })];
                case 1:
                    credential = _a.sent();
                    keyMaterial = generateKey("AES-GCM", Buffer.from(credential.rawId, "base64"), Buffer.from(credential.response.userHandle), credential.response.signCount);
                    return [4 /*yield*/, (0, sodium_universal_1.encryptAesGcm)(keyMaterial, parser_1.parse.parseTextIntoAst(encryptedText).body.expression.elements[0].elements[1].elements[1].elements[0].elements[0].elements[0].value)];
                case 2:
                    encryptedBuffer = _a.sent();
                    setEncryptedText("Encrypted Text: ".concat(Buffer.from(encryptedBuffer).toString("base64")));
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDecrypt = function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, keyMaterial, decryptedBuffer, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, window.navigator.credentials.get({ publicKey: {} })];
                case 1:
                    credential = _a.sent();
                    keyMaterial = generateKey("AES-GCM", Buffer.from(credential.rawId, "base64"), Buffer.from(credential.response.userHandle), credential.response.signCount);
                    return [4 /*yield*/, (0, sodium_universal_1.decryptAesGcm)(keyMaterial, Buffer.from(encryptedText.split(":")[1], "base64"))];
                case 2:
                    decryptedBuffer = _a.sent();
                    setDecryptedText("Decrypted Text: ".concat(decryptedBuffer.toString()));
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("label", null,
            "Enter text to encrypt:",
            react_1["default"].createElement("textarea", { value: encryptedText })),
        react_1["default"].createElement("button", { onClick: handleEncrypt, disabled: loading }, "Encrypt Text"),
        react_1["default"].createElement("label", null,
            "Decrypted Text:",
            react_1["default"].createElement("textarea", { value: decryptedText })),
        react_1["default"].createElement("button", { onClick: handleDecrypt, disabled: loading || !encryptedText }, "Decrypt Text")));
};
exports["default"] = WebAuthnEncryption;
