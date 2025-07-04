import { API_PATHS } from "./apiPaths";
import axiosinstance from "./axiosinstance";

export const uplodImage=async(imageFile)=>{
    const formData=new FormData();
    formData.append("image",imageFile)
    try {
        const response=await axiosinstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                "content-Type":"multipart/form-data",
            }
        })
        
        return response.data;
    } catch (error) {
        console.error("error uploding file",error);
        throw error;
        
    }
}