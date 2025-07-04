import React, { useEffect, useState } from 'react'
import { prepareExpenseBarchartDate } from '../../utils/helper'
import CustomBarChart from '../charts/CustomBarChart'

const Last30DyasExpenses = ({data}) => {
    const[chartData,setChartData]=useState([])

    useEffect(()=>{
        const result=prepareExpenseBarchartDate(data)
        setChartData(result)
        return()=>{};
    },[data])
  return (
    <div className='card col-span-1'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>      
            <CustomBarChart data={chartData}/>
    </div>
  )
}

export default Last30DyasExpenses
