const multer = require('multer');
const {initializeApp} = require("firebase/app");
const {getStorage, getDownloadURL, ref, uploadBytesResumable} = require("firebase/storage");
const {FirebaseConfig} = require("../config/firebase_config");
const {ApiError} = require("../utils/response_handel/error_handeler");


// Initialize Firebase
const app = initializeApp(FirebaseConfig);


// Configure multer for handling file uploads
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});


// Define the upload middleware
exports.uploadFile = async (req, res, next, fileName, typeFiled = ["jpg", "png", "jpeg", "png"]) => {
    upload.single(fileName)(req, res, (err) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        const file = req.file;
        if (file == null) {
            return next(new ApiError("No file provided", 400))
        }

        if (!typeFiled.includes(req.file["originalname"].toString().split(".")[1].toLocaleLowerCase())) {
            return next(new ApiError("File type not supported", 400))
        }

        // Create a bucket reference
        const storageRef = ref(storage, `files/${Date.now()}${req.file["originalname"]}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file["mimetype"],
        };

        // Upload the file to the bucket storage
        const uploadTask = uploadBytesResumable(storageRef, req.file["buffer"], metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.error(error);
                res.status(500).json({error: 'Something went wrong'});
            },
            async () => {
                // File upload completed successfully
                req.body[fileName] = await getDownloadURL(storageRef)
                next();
            }
        );
    });
};