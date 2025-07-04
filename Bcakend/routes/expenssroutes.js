import express from "express"
import { protect } from "../middleware/authmiddleware.js"
import { addexpense } from "../controllers/expensecontorller.js"
import { getallexpense } from "../controllers/expensecontorller.js"
import { downloadexpense } from "../controllers/expensecontorller.js"
import { deleteexpense } from "../controllers/expensecontorller.js"


const router =express.Router()

router.post("/add",protect,addexpense)
router.get("/get",protect,getallexpense)
router.get("/downloadexpense",protect,downloadexpense)
router.delete("/:id",protect,deleteexpense)

export default router;