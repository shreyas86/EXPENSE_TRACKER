import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"uploads/");
    },
    filename:(req,file,cd)=>{
        cd(null, `${Date.now()}-${file.originalname}`);
    }
})

const filefilter=(req,file,cd)=>{
    const allowedTypes=['image/jpeg','image/png',"image/jpg"]
    if(allowedTypes.includes(file.mimetype)){
        cd(null,true)
    }else{
        cd(new Error("only .jpeg and .png formats are allowed" ),false)
    }
}

const uploads =multer({storage,filefilter})
export default uploads