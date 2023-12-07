"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./Routers/userRouter"));
const authhelper_1 = require("./middlewares/authhelper");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, authhelper_1.checkforAuthCookie)("token"));
app.use('/users', userRouter_1.default);
app.listen(port, () => {
    console.log(`Server running on https:\\localhost:${port}`);
});
//# sourceMappingURL=index.js.map