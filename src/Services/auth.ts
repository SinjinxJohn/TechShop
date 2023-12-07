import JWT from 'jsonwebtoken';
const secret:string="Hotlinebling1!";

interface Users {
    id: string;
    // salt:string;
    fullname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }

function createTokenForUser(user:Users):string{
    const payload = {
        _id:user.id,
        fullname:user.fullname,
        email:user.email,
        password:user.password,
        phoneNumber:user.phoneNumber,

    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token:string){
    const payload = JWT.verify(token,secret);
}

export interface UserPayload {
    // Define the structure of your user payload here
    _id: string;
    email: string;
    // Add other properties if needed
  }
export { Users, createTokenForUser, validateToken };