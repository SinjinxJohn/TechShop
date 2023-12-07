import mongoose, { Schema, Document, Model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { Users, createTokenForUser } from "../Services/auth";

const dblink: string =
    "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.cb2py79.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dblink).then(
    function (db) {
        console.log("mongoose connected");
    },
).catch(
    function (err) {
        console.log(err);
    },
);

interface User extends Document {
    id: string,
    fullname: string;
    email: string;
    password: string;
    confirmPassword: any;
    phoneNumber: string;
    salt: string;
}

interface UserModel extends Model<User> {
    matchPassword(email: string, password: string): Promise<string>;
}

const userSchema = new Schema<User, UserModel>({
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

userSchema.statics.matchPassword = async function (
    this: UserModel,
    email: string,
    password: string,
): Promise<string> {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    if (!user.salt) {
        throw new Error('Salt is undefined');
    }

    const hashedpassword = user.password;
    const userProvided = createHmac('sha256', user.salt).update(password).digest('hex');

    if (hashedpassword !== userProvided) {
        throw new Error('Password is incorrect');
    }

    const token = createTokenForUser(user);

    return token;
};

userSchema.pre('save', function (next) {
    const user = this;
    if (this.password !== this.confirmPassword) {
        throw new Error("Passwords do not match");
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

const UserModel = mongoose.model<User, UserModel>('UserModel', userSchema);

export default UserModel;
