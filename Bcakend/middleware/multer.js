import multer from 'multer';
import { storage } from './Cloudinary.js';
const upload = multer({ storage });

export default upload;
