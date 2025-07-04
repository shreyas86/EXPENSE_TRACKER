import React, { useEffect, useState } from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const  COLORS=["#875CF5","#FA2C37","#FF6900","#4f39f6"]
const RecentIncomeWithchart = ({data,totalIncome}) => {
    const [chartdata,setChartdata]=useState([])
    const preparechartdata=()=>{
        const dataarr=data?.map((item)=>({
            name:item?.source,
            amount:item?.amount
        }))
        setChartdata(dataarr)
        
    }
    useEffect(()=>{
        preparechartdata()
        return()=>{}
    },[data])
 

  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Income</h5>
      </div>
      <CustomPieChart
      data={chartdata}
      label="Total Income"
      totalamount={`${totalIncome}`}
      showTextAnchor
      colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithchart
