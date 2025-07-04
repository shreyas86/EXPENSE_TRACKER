import usermodel from "../models/User.js"
import expensemodel from "../models/Expenss.js"
import xlsx from "xlsx";



export const addexpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        if (!icon || !category || !amount || !date) {
            return res.status(400).json({ message: "all field requied" })
        }
        const newexpense = new expensemodel({
            userId, icon, category, amount, date: new Date(date)
        })
        await newexpense.save()
        res.status(200).json(newexpense)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
export const deleteexpense = async (req, res) => {
    try {
        await expensemodel.findByIdAndDelete(req.params.id)
        res.json({ message: "expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}

export const downloadexpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await expensemodel.find({userId }).sort({ date: -1 })
        const data = expense.map((item) => ({
            category: item.category,
            amount: item.amount,
            date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, "expense_detail.xlsx")
        res.download("expense_detail.xlsx");
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}
export const getallexpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await expensemodel.find({ userId }).sort({ date: -1 })
        res.json(expense)
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}