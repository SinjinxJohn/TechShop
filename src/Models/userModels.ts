import mongoose, { Schema, Document, model } from "mongoose";
import { createHmac,randomBytes } from "crypto";
import {User,createTokenForUser} from "../Services/auth"
const dblink:string = "mongodb+srv://sinjinhotlinebling:<password>@cluster0.cb2py79.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(dblink).then(function (db){
    console.log("mongoose connected");

}).catch(function (err){
    console.log(err);
})


interface Users extends Document{
    fullname:string;
    email:string;
    password:string;
    confirmPassword:any;
    phoneNumber:string;
    salt:string;
}

const userSchema = new Schema<Users>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt: {
        type: String,
        // required: true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    },
    phoneNumber:{
        type:String
    }

    
},{timestamps:true});



userSchema.statics.matchPassword =async function (email:string,password:string){
    const user:User = await this.findOne({email});
    if(!user) throw new Error("User does not exist");


    const salt = user.salt;
    const hashedPassword=user.password;
    const userProvided = createHmac('sha256',salt).update(password).digest('hex');
    if(userProvided!=hashedPassword) throw new Error("Username/password do not match");
    const token = createTokenForUser(user);
    return token;

}




userSchema.pre('save',function(next){

    const user=this;
    if(this.password !== this.confirmPassword){
        throw new Error("Passwords do not match");
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
    this.confirmPassword=undefined;
    next();

});

const UserModel = model<Users>('UserModel',userSchema);
export default UserModel;







