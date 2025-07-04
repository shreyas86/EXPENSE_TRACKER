import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import axiosinstance from "../utils/axiosinstance"
import { API_PATHS } from "../utils/apiPaths"
import { useNavigate } from "react-router-dom"

export  const useUserAuth=()=>{
    const {user,updateUser,clearUser}=useContext(UserContext)
    const navigate=useNavigate()
useEffect(()=>{
    if(user)return;
    let ismounted=true;
    const  fetchuserifo=async()=>{
        try {
            const response=await axiosinstance.get(API_PATHS.AUTH.GET_USER_INFO)
            if(ismounted && response.data){
                updateUser(response.data)
            }
        } catch (error) {
            console.error("failed tetch user deatail");
            if(ismounted){
                clearUser()
                navigate("/login")
            }
            
        }
    }
    fetchuserifo()
    return()=>{
        ismounted=false
    }
},[updateUser,clearUser,navigate])
}
