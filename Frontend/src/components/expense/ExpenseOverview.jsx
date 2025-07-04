import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenselinechartDate } from '../../utils/helper';
import Customlinechart from '../charts/Customlinechart';
const ExpenseOverview = ({transactions,onExpenseincome}) => {
    const[chardata,setChartdata]=useState([]);
    useEffect(()=>{
        const result=prepareExpenselinechartDate(transactions)
        setChartdata(result)
    },[transactions])
  return (
    <div className='card'>
        <div className=" flex items-center justify-between">
            <div className="">
                <h5 className=" text-lg">Expense Overview</h5>
                <p className="text-x5 text-gray-400 mt-0.5"> Track your spending trends over time and gain insights into where your money goes.</p>
            </div>
            <button className="add-btn" onClick={onExpenseincome}>
                <LuPlus className='text-lg'/>Add Expense
            </button>
        </div>
        <div className="mt-10">
            <Customlinechart data={chardata}/>
                    </div>
      
    </div>
  )
}

export default ExpenseOverview
