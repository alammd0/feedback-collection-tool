import { apiConnecter } from "../apicontecter";
import { AdminEndPoints } from "../apiEndPoints";

const {
    LOGIN_API,
    FORGET_PASSWORD_API
} = AdminEndPoints


export const loginAdmin = async (email : string, password : string) => {
    try{
        const response = await apiConnecter({
            method : "POST",
            url : LOGIN_API,
            data : {email, password},
            headers : {}
        })

        if(!response){
           throw new Error
        }

        return response;
    }
    catch(err){
        console.log(err);
        return {
            success : false ,
            message : "Login failed"
        }
    }
}

export const forgetPassword = async (email: string, newPassword: string) => {
    try{

        const response = await apiConnecter({
            method : "PUT", 
            url : FORGET_PASSWORD_API,
            data : {email, newPassword},
            headers: {
            }
        })

        if(!response){
            throw new Error;
        }

        return response;
    }
    catch(err){
        console.log(err);
        return {
            success : false,
            message : "Forget-password error"
        }
    }
}