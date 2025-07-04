import React, { useState } from 'react'
import Input from '../input/Input'
import EmojiPickerPopup from '../layout/EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {
    const[income,setIncome]=useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
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
      onChange={({target})=>handlechange("source",target.value)}
      label="Income Source"
      placeholder="Freelance, salary, etc"
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
        <button className="add-btn add-btn-fill" type='button' onClick={()=>onAddIncome(income)}>Add Income</button>
      </div>
    </div>
  )
}

export default AddIncomeForm
