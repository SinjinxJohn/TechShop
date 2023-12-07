"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = require("crypto");
const auth_1 = require("../Services/auth");
const dblink = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.cb2py79.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(dblink).then(function (db) {
    console.log("mongoose connected");
}).catch(function (err) {
    console.log(err);
});
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
}, { timestamps: true });
userSchema.statics.matchPassword = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (!user)
            throw new Error('User not found');
        if (!user.salt) {
            throw new Error('Salt is undefined');
        }
        const hashedpassword = user.password;
        const userProvided = (0, crypto_1.createHmac)('sha256', user.salt).update(password).digest('hex');
        if (hashedpassword !== userProvided) {
            throw new Error('Password is incorrect');
        }
        const token = (0, auth_1.createTokenForUser)(user);
        return token;
    });
};
userSchema.pre('save', function (next) {
    const user = this;
    if (this.password !== this.confirmPassword) {
        throw new Error("Passwords do not match");
    }
    const salt = (0, crypto_1.randomBytes)(16).toString();
    const hashedPassword = (0, crypto_1.createHmac)('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});
const UserModel = mongoose_1.default.model('UserModel', userSchema);
exports.default = UserModel;
//# sourceMappingURL=userModels.js.map