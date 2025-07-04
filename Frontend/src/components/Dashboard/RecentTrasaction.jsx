import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import momement from "moment"
import TransactionInfocard from '../card/TransactionInfocard'

const RecentTrasaction = ({transaction,onSeemore}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between ">
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className="card-btn" onClick={onSeemore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transaction?.slice(0,5).map((item)=>{
             return    <TransactionInfocard key={item._id} title={item.type=="expense"? item.category:item.source} icon={item.icon} date={momement(item.date).format('Do MMM YYY')}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn/>
            })}
        </div>
    </div>
  )
}

export default RecentTrasaction
