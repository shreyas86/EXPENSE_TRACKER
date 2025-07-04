import incomemodel from "../models/Income.js";
import expensemodel from "../models/Expenss.js";
import { isValidObjectId,Types } from "mongoose";



export const getdashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userobjectid = new Types.ObjectId(String(userId));

    // Total income
    const totalincome = await incomemodel.aggregate([
      { $match: { userId: userobjectid } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Total expense
    const totalexpense = await expensemodel.aggregate([
      { $match: { userId: userobjectid } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Last 60 days income
    // const last60daysDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const last60daysincometranscation = await incomemodel.find({
      userId:userobjectid,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
    }).sort({ date: -1 });

    const incomelast60days = last60daysincometranscation.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 30 days expense
    // const last30daysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // fixed incorrect exponentiation
    const last30dayexpenseTransacton = await expensemodel.find({
      userId:userobjectid,
      date: { $gte:new  Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
    }).sort({ date: -1 });

    const expenselast30days = last30dayexpenseTransacton.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Recent transactions
    const lastincometxn = await incomemodel.find({ userId: userobjectid }).sort({ date: -1 }).limit(5);
    const lastexpensetxn = await expensemodel.find({ userId: userobjectid }).sort({ date: -1 }).limit(5);

    // const lasttransaction = [
    //   ...lastincometxn.map(txn => ({ ...txn.toObject(), type: "income" })),
    //   ...lastexpensetxn.map(txn => ({ ...txn.toObject(), type: "expense" }))
    // ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // Sorted and limited to latest 5 total
 const lasttransaction = [
  ...(await incomemodel.find({userId}).sort({date:-1}).limit(5)).map(
    (txn)=>({
      ...txn.toObject(),
      type:"income"
    })
  ),
...(await expensemodel.find({userId}).sort({date:-1}).limit(5)).map(
  (txn)=>({
    ...txn.toObject(),
    type:"expense",
  })
)
].sort((a,b)=>b.date-a.date)
    res.json({
      totalbalance: (totalincome[0]?.total || 0) - (totalexpense[0]?.total || 0),
      totalincome: totalincome[0]?.total || 0,
      totalexpense: totalexpense[0]?.total || 0,
      last30dayexpense: {
        total: expenselast30days,
        transaction: last30dayexpenseTransacton,
      },
      last60daysincome: {
        total: incomelast60days,
        transaction: last60daysincometranscation,
      },
      recenttransaction: lasttransaction
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

