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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.signup = void 0;
const userModels_1 = __importDefault(require("../Models/userModels"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password, confirmPassword, phoneNumber } = req.body;
        if (!email || !password)
            return res.status(400).json({
                message: "email and/or password is required"
            });
        const existingUser = yield userModels_1.default.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        else {
            const user = yield userModels_1.default.create({
                fullname,
                email,
                password,
                confirmPassword,
                phoneNumber
            });
            if (user) {
                return res.status(201).json({
                    user
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    ;
    try {
        const token = yield userModels_1.default.matchPassword(email, password);
        // If the password matches, you can return a success response or perform additional actions.
        // For example, you can generate a token for authentication and send it back in the response.
        // Return a success response with a token or other information.
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Signin successful', token });
    }
    catch (error) {
        // If the password does not match or the user is not found, return an error response.
        res.status(401).json({ message: 'Signin failed', error: error.message });
    }
});
exports.signin = signin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token');
    res.json({
        message: "Logged Out Successfully"
    });
});
exports.logout = logout;
//# sourceMappingURL=userControllers.js.map