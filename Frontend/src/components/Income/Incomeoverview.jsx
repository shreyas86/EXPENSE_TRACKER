import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart'
import { prepareIncomebarchartdata } from '../../utils/helper'
const Incomeoverview = ({transaction,onAddIncome}) => {
      const [chartdata,setChartdata]=useState([])
  useEffect(()=>{
    const result=prepareIncomebarchartdata(transaction);
    setChartdata(result)
  },[transaction])
  return (
    <div className='card'>
      <div className=" flex  items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">Track Your Earning Over time and analyze your income trend</p>
           </div>
           <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className='text-lg'/>Add Income
           </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartdata}/>
      </div>
      
    </div>
  )
}

export default Incomeoverview
