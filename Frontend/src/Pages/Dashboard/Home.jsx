import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import Infocard from '../../components/card/Infocard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io" 
import { addThousandsSeparator } from '../../utils/helper';
import RecentTrasaction from '../../components/Dashboard/RecentTrasaction';
import Financeoverview from '../../components/Dashboard/Financeoverview';
import ExpenseTransactions from '../../components/charts/ExpenseTransactions';
import Last30DyasExpenses from '../../components/Dashboard/Last30DyasExpenses';
import RecentIncomeWithchart from '../../components/Dashboard/RecentIncomeWithchart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const  navigate=useNavigate()
  const [dashboarddata,setDashboarddata]=useState(null)
const[loading,setloading]=useState(false)

const fetchdashboarddata=async()=>{
  if(loading) return;
  setloading(true)
  try {
    const response=await axiosinstance.get( 
      `${API_PATHS.DASHBOARD.GET_DATA}`
    )
    if(response.data){
      setDashboarddata(response.data)
    }
  } catch (error) {
    console.log("something is wrong please try agin later",error);
  }finally{
    setloading(false)
  }
}
useEffect(()=>{
  fetchdashboarddata();
  return()=>{}
},[])

  return (
    <DashboardLayout
     activeMenu="Dashboard">
      <div className='my-5 mx-auto '>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Infocard icon={<IoMdCard/>} label="Total Balance"
          value={addThousandsSeparator(dashboarddata?.totalbalance||0)}
          color="bg-primary"
          />
          <Infocard icon={<IoMdCard/>} label="Total Income"
          value={addThousandsSeparator(dashboarddata?.totalincome||0)}
          color="bg-orange-500"
          />
          <Infocard icon={<IoMdCard/>} label="Total Expense"
          value={addThousandsSeparator(dashboarddata?.totalexpense||0)}
          color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTrasaction 
          transaction={dashboarddata?.recenttransaction} onSeemore={()=>navigate("/expense")}/>
          <Financeoverview totalbalance={dashboarddata?.totalbalance||0} totalincome={dashboarddata?.totalincome||0}
          totalexpense={dashboarddata?.totalexpense||0}   />
          <ExpenseTransactions transactions={dashboarddata?.last30dayexpense?.transaction||[]}
          onSeeMore={()=>navigate("/expense")}/>
        <Last30DyasExpenses
        data={dashboarddata?.last30dayexpense?.transaction||[]}
        />
        <RecentIncomeWithchart
        data={dashboarddata?.last60daysincome?.transaction?.slice(0,4)||[]}
        totalIncome={dashboarddata?.totalincome||0}
        />
        <RecentIncome
        transaction={dashboarddata?.last60daysincome?.transaction ||[0]}
        onSeeMore={()=>navigate("/income")}/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
