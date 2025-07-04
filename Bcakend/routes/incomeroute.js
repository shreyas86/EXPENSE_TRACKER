import express from "express"
import { protect } from "../middleware/authmiddleware.js"
import { addincome } from "../controllers/incomecontorller.js"
import { getallincome } from "../controllers/incomecontorller.js"
import { downloadincome } from "../controllers/incomecontorller.js"
import { deleteincome } from "../controllers/incomecontorller.js"


const router =express.Router()

router.post("/add",protect,addincome)
router.get("/get",protect,getallincome)
router.get("/downloadincome",protect,downloadincome)
router.delete("/:id",protect,deleteincome)

export default router;