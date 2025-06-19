import { apiConnecter } from "../apicontecter";
import { FeedBackEndPoints } from "../apiEndPoints";

const {
    SUBMIT_FEEDBACK_API,
    GET_ALL_FEEDBACK_API,
    GET_FEEDBACK_STATS_API,
    GET_PAPULAR_FEEDBACK_API
} = FeedBackEndPoints ;

type submitData = {
    productId: string,
    name : string,
    email : string,
    review : string,
    rating : Number
}

export const submitFeedBack = async ({productId, name, email, review, rating} : submitData) => {
    try{
        const response = await apiConnecter({
            method : "POST", 
            url : SUBMIT_FEEDBACK_API,
            data : {productId, name, email, review, rating},
            headers : {}
        })

        if(!response){
            throw new Error
        }

        return response
    }
    catch(err){
        console.log(err);
    }
}

export const getAllFeedback = async (token : string) => {
    try{

        const response = await apiConnecter({
            method : "GET", 
            url : GET_ALL_FEEDBACK_API,
            data : {},
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if(!response){
            throw new Error
        }

        return response;

    }
    catch(error){
        console.log(error);
    }
}

export const getFeedbackStats = async (token : string) => {
    try{

        const response = await apiConnecter({
            method : "GET", 
            url : GET_FEEDBACK_STATS_API, 
            data : {},
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if(!response){
            throw new Error
        }

        return response
    }
    catch(err){
        console.log(err);
    }
}

export const getPapularFeedback = async (sortType : "rating" | "count", token : string) => {
    try{

        const response = await apiConnecter({
            method : "GET", 
            url : `${GET_PAPULAR_FEEDBACK_API}?sort=${sortType}`,
            data : {},
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })

        if(!response){
            throw new Error
        }

        return response

    }
    catch(err){
        console.log(err);
    }
}
