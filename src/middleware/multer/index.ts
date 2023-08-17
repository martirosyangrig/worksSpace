import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, dile, cb) => {
    cb(null, path.resolve(__dirname, "../../../Images"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
