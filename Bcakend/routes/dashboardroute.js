import express from "express"
import { protect } from "../middleware/authmiddleware.js"
import {getdashboard} from "../controllers/dashboardcontoller.js"

const router=express.Router()

router.get("/",protect,getdashboard)
export default router;