"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createTokenForUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "Hotlinebling1!";
function createTokenForUser(user) {
    const payload = {
        _id: user.id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret);
    return token;
}
exports.createTokenForUser = createTokenForUser;
function validateToken(token) {
    const payload = jsonwebtoken_1.default.verify(token, secret);
}
exports.validateToken = validateToken;
//# sourceMappingURL=auth.js.map