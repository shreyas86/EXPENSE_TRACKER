import express from "express"
import {registeruser,loginuser,getuserinfo} from "../controllers/authcontroller.js"
import { protect } from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const router =express.Router();

// router.post("/register",registeruser)
// router.post("/login",loginuser)
// router.get("/getuser",protect,getuserinfo)
// router.post("/uplodimg",uploads.single("image"),(req,res)=>{
//     if(!req.file){
//         return res.status(400).json({message:"no file uploded"})
//     }
//     const imageurl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//              res.status(200).json({imageurl})

//     })
router.post("/register", upload.single("profileimg"), registeruser);
router.post("/login", loginuser);
router.get("/getuser", protect, getuserinfo);

// ✅ Manual image upload endpoint (if needed)
router.post("/uploadimg", upload.single("profileimg"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // ✅ Cloudinary gives you the full URL at req.file.path
  const imageurl = req.file.path;
  res.status(200).json({ imageurl });
});

export default router