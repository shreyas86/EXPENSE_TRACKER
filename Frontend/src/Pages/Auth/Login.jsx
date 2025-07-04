import React, { useContext, useState } from 'react'
import Authlayout from '../../components/layout/Authlayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
import axiosinstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {

   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[error,setError]=useState("")

   const {updateUser}=useContext(UserContext)
   
   const Navigate=useNavigate()
   const handleLogin=async(e)=>{
  e.preventDefault();
  if(!validateEmail(email)){
    setError("Please enter valid Email address")
    return;
  }
  if (!password){
    setError("please enter passowrd")
    return;
  }
  setError("")
  try {
    const response=await axiosinstance.post(API_PATHS.AUTH.LOGIN,{
      email,
      password,
    })
    const{token,user}=response.data;
    if(token){
      localStorage.setItem("token",token)
      updateUser(user)
      Navigate("/dashboard")
    }
  } catch (error) {
    if(error.response && error.response.data.message){
      setError(error.response.data.message)
    }else{
      setError("something went wrong")
    }
  }

  }
   return (
    <Authlayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl  font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px md-6]'>please enter your details to log in</p>
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={({target}) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" />
        <Input value={password} onChange={({target}) => setPassword(target.value)} label="Password" placeholder="Min 8 character" type="password" />
    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }
    <button type='submit' className='btn-primary'>LOGIN</button>
    <p className='text-[13px]'>Don't have an account?{" "}
      <Link className="font-medium text-primary underline"  to="/signup">Signup</Link>
    </p>
      </form>
    </div>
    </Authlayout>
    
  )
}

export default Login;
