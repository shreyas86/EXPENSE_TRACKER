import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS=["#875CF5","#FA2C37","#FF6900"]
const Financeoverview = ({ totalbalance,totalincome,totalexpense}) => {
    const balancedata=[
        {name:"Total Balance",amount:totalbalance},
        {name:"Total Expense",amount:totalexpense},
        {name:"Total Income",amount:totalincome}
    ];

  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>
      <CustomPieChart
      data={balancedata}
      label="Total balance"
      totalamount={`$${totalbalance}`}
      colors={COLORS}
      showTextAnchor />
    </div>
  )
}

export default Financeoverview
