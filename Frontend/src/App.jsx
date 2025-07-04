import React from 'react'
import { BrowserRouter as Router, Routes,Navigate, Route } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import Home from './Pages/Dashboard/Home'
import Income from './Pages/Dashboard/Income'
import Expense from './Pages/Dashboard/Expense'
import { UserProvider } from './context/UserContext'
import {Toaster} from"react-hot-toast"
const App = () => {
 
  return (
<UserProvider>

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/income" exact element={<Income/>}/>
          <Route path="/expense" exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px"
      },
    }}
    />
</UserProvider>
  )
}

export default App

const Root=()=>{
  const isAuth=!!localStorage.getItem("token");
  return  isAuth?(<Navigate to="/dashboard"/>):(<Navigate to="/login"/>);
}