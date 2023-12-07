"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../Controllers/userControllers");
const userRouter = express_1.default.Router();
userRouter.use(express_1.default.json());
userRouter.post('/signup', userControllers_1.signup);
userRouter.post('/login', userControllers_1.signin);
userRouter.get('/logout', userControllers_1.logout);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map