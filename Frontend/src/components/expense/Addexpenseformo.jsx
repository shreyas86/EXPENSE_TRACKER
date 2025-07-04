import React, { useState } from 'react'
import EmojiPickerPopup from '../layout/EmojiPickerPopup'
import Input from '../input/Input'
 

const Addexpenseformo = ({onAddeEpense}) => {
const[income,setIncome]=useState({
  category:"",
  amount:"",
  date:"",
  icon:'',
})
 const handlechange=(key,value)=>{
        setIncome({...income,[key]:value})
    }
  return (
       <div>
        <EmojiPickerPopup icon={income.icon}
        onSelect={(selectedIcon)=>handlechange("icon",selectedIcon)}
        />
      <Input
      value={income.source}
      onChange={({target})=>handlechange("category",target.value)}
      label="Category"
      placeholder="Rent, Groceries, etc"
      type="text"
      />
      <Input
      value={income.amount}
      onChange={({target})=>handlechange("amount",target.value)}
      label="Amount"
      placeholder=""
      type="number"
      />
      <Input
      value={income.date}
      onChange={({target})=>handlechange("date",target.value)}
      label="Date"
      placeholder=""
      type="date"
      />
      <div className="flex justify-end mt-6">
        <button className="add-btn add-btn-fill" type='button' onClick={()=>onAddeEpense(income)}>Add Expense</button>
      </div>
    </div>
  )
}

export default Addexpenseformo
