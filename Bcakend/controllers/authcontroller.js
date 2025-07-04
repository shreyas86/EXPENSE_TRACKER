import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import usermodel from "../models/User.js"
dotenv.config()

const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

// export const registeruser = async (req, res) => {
//     const { fullname, email, password, profileimgurl } = req.body;
//     if (!fullname || !email || !password) {
//         return res.status(400).json({ message: "all fields are required" })
//     }
//     try {
//         const existinguser = await usermodel.findOne({ email })
//         if (existinguser) {
//             return res.status(400), json({ essage: "user already exists" })
//         }
//         const user = await usermodel.create({
//             fullname, email, password, profileimgurl
//         })
//         res.status(201).json({
//             id: user._id,
//             user,
//             token: generatetoken(user._id)
//         })


//     } catch (error) {
//         res.status(500).json({ message: "error registering user", error: error.message })
//     }
// }
export const registeruser = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Get image URL from Cloudinary
  const profileimgurl = req.file?.path;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await usermodel.create({
      fullname,
      email,
      password,
      profileimgurl, // ✅ store Cloudinary URL
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generatetoken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};


export const loginuser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "all firld are requied" })
    }
    try {
        const user = await usermodel.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "inavalid credential" })
        }
        res.status(200).json({ id: user._id, user, token: generatetoken(user._id) })
    } catch (error) {
        res.status(500).json({ message: "error registering user", error: error.message })
    }
}

export const getuserinfo = async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(400).json({ message: " user not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "error registering user", error: error.message })
    }
}