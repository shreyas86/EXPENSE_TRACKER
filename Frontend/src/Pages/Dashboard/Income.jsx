import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Incomeoverview from '../../components/Income/Incomeoverview'
import axiosinstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import axios from 'axios'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/layout/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
    useUserAuth();
  
  const [incomedata,setIncomedata]=useState([])
  const[loading,setLoading]=useState(false)
  const[opnedeletealert,setOpendeletealert]=useState({
    show:false,
    data:null,
  })
  const[openAddIncomeModal,setOpenAddIncomeModal]=useState(false)

  const fetchincomedetail=async()=>{ 
    if(loading) return;
    setLoading(true);
    try {
      const response=await axiosinstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if(response.data){
setIncomedata(response.data)
      }
    } catch (error) {
      console.log("something went wrong.please try agin later",error);      
    }finally{
      setLoading(false)
    }
   }

  const handleaddincome=async(income)=>{
    const{source,amount,date,icon}=income
    if(!source.trim){
      toast.error("source is required.")
      return;
    }
    if(!amount || isNaN(amount)|| Number(amount)<=0){
      toast.error("Amount should be  a valid number greater then 0")
      return 0;
  }
  if(!date){
    toast.error("date is Required")
    return;
  }
  try {
    await axiosinstance.post(API_PATHS.INCOME.ADD_INCOME,{
      source,
      amount,
      date,
      icon
    })
    setOpenAddIncomeModal(false)
    toast.success("Income added Successfully")
    fetchincomedetail()
  } catch (error) {
    console.error("error adding income",error.response?.data?.message||error.message);
    
  }
}

  const handledeleteincome=async(id)=>{
    try {
      await axiosinstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpendeletealert({show:false,data:null});
      toast.success("Income details deleted successfully")
      fetchincomedetail()
    } catch (error) {
      console.error(
        "Error delteting income:",error.response?.data?.message||error.message
      );
      
      
    }
  }
 const  handleDownloadIncomeDetail=async()=>{
   try {
    const response = await axiosinstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Income_details.xlsx"); // ✅ corrected
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => window.URL.revokeObjectURL(url), 100); // ✅ safer timing
  } catch (error) {
    console.error("Error downloading incomer:", error);
    toast.error("Failed to download income details, please try again");
  }
 }

 useEffect(()=>{
  fetchincomedetail()
 },[])
  return (
   <DashboardLayout
     activeMenu="Income">
      <div className='my-5 mx-auto '>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <Incomeoverview
            transaction={incomedata}
            onAddIncome={()=>{setOpenAddIncomeModal(true)}}
            />
          </div>
          <IncomeList
          transactions={incomedata}
          onDelete={(id)=>{
            setOpendeletealert({show:true,data:id});
          }}
          onDownload={handleDownloadIncomeDetail}
          />
        </div>
    <Modal
    isopen={openAddIncomeModal}
    onclose={()=>setOpenAddIncomeModal(false)}
    title="Add income">
      <AddIncomeForm onAddIncome={handleaddincome}/>      
    </Modal>
    <Modal
    isopen={opnedeletealert.show}
    onclose={()=>setOpendeletealert({
      show:false,data:null
    })}
    title="Delete Income"
    >
      <DeleteAlert
      content="Are you sure you want to delete this income detail?"
      onDelete={()=>handledeleteincome(opnedeletealert.data)}
      />

      </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Income
