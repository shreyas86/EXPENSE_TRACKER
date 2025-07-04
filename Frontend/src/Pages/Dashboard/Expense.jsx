import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosinstance from '../../utils/axiosinstance';
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import Modal from '../../components/Modal';
import Addexpenseformo from '../../components/expense/Addexpenseformo';
import toast from 'react-hot-toast';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from '../../components/layout/DeleteAlert';

const Expense = () => {
  useUserAuth();

  const [expensedata, setExpensedata] = useState([])
  const [loading, setLoading] = useState(false)
  const [opnedeletealert, setOpendeletealert] = useState({
    show: false,
    data: null,
  })
  const [openAddexpenseModal, setOpenAddexpenseModal] = useState(false)


  const fetchExpensedetail = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosinstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpensedata(response.data)
      }
    } catch (error) {
      console.log("something went wrong.please try agin later", error);
    } finally {
      setLoading(false)
    }
  }

  const handleaddExpense = async (expense) => {
    const { category, amount, date, icon } = expense
    if (!category.trim) {
      toast.error("category is required.")
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be  a valid number greater then 0")
      return 0;
    }
    if (!date) {
      toast.error("date is Required")
      return;
    }
    try {
      await axiosinstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })
      setOpenAddexpenseModal(false)
      toast.success("Expense added Successfully")
     fetchExpensedetail()
    } catch (error) {
      console.error("error adding expense", error.response?.data?.message || error.message);

    }
  }

    const handledeleteexpense=async(id)=>{
    try {
      await axiosinstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpendeletealert({show:false,data:null});
      toast.success("Expense details deleted successfully")
      fetchExpensedetail()
    } catch (error) {
      console.error(
        "Error delteting expense:",error.response?.data?.message||error.message
      ); 
    }
  }

const handleDownloadExpenseDetail = async () => {
  try {
    const response = await axiosinstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Expense_details.xlsx"); // ✅ corrected
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => window.URL.revokeObjectURL(url), 100); // ✅ safer timing
  } catch (error) {
    console.error("Error downloading expense:", error);
    toast.error("Failed to download expense details, please try again");
  }
};
  useEffect(() => {
    fetchExpensedetail()
  }, [])

  return (
    <DashboardLayout
      activeMenu="Expense">
      <div className='my-5 mx-auto '>
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
            <ExpenseOverview
              transactions={expensedata}
              onExpenseincome={() => { setOpenAddexpenseModal(true) }}
            />
          </div>
          <ExpenseList
          transactions={expensedata}
          onDelete={(id)=>{
            setOpendeletealert({
              show:true,
              data:id
            });
          }}
          onDownload={handleDownloadExpenseDetail}
          />
        </div>
        <Modal
          isopen={openAddexpenseModal}
          onclose={() => setOpenAddexpenseModal(false)}
          title="Add Expense"
        >
          <Addexpenseformo onAddeEpense={handleaddExpense} />
        </Modal>
         <Modal
    isopen={opnedeletealert.show}
    onclose={()=>setOpendeletealert({
      show:false,data:null
    })}
    title="Delete Expense"
    >
      <DeleteAlert
      content="Are you sure you want to delete this income detail?"
      onDelete={()=>handledeleteexpense(opnedeletealert.data)}
      />
      </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
