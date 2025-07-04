import usermodel from "../models/User.js"
import incomemodel from "../models/Income.js"
import xlsx from "xlsx";



export const addincome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;
        if (!icon || !source || !amount || !date) {
            return res.status(400).json({ message: "all field requied" })
        }
        const newincome = new incomemodel({
            userId, icon, source, amount, date: new Date(date)
        })
        await newincome.save()
        res.status(200).json(newincome)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
export const deleteincome = async (req, res) => {
    try {
        await incomemodel.findByIdAndDelete(req.params.id)
        res.json({ message: "income deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}

export const downloadincome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await incomemodel.find({userId }).sort({ date: -1 })
        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_detail.xlsx")
        res.download("income_detail.xlsx");
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}
export const getallincome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await incomemodel.find({ userId }).sort({ date: -1 })
        res.json(income)
    } catch (error) {
        res.status(500).json({ message: "server error" })

    }
}