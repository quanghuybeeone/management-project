import express from "express";
import multer from 'multer';
import appRoot from 'app-root-path';
const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        // console.log(appRoot);
        // if (file.fieldname == 'prd_img') {
        //     cb(null, appRoot + "/public/uploads/products");
        // } else if (file.fieldname == 'avatar') {
        //     cb(null, appRoot + "/public/uploads/users");
        // } else {
        cb(null, appRoot + "/public/uploads/");
        // }
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file.originalname);
        // + path.extname(file.originalname)
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadOneFile = multer({ storage: storage, fileFilter: imageFilter }).single('one_image');
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 5);

//UPLOAD IMG
router.post("/upload", uploadOneFile, (req, res) => {
    res.status(200).send({filename: req.file.filename, message: "Upload successful"});
});
router.post("/uploads", uploadMultipleFiles, (req, res) => {
    res.status(200).send("Upload successful");
});

export default router;