const express=require('express');
const multer = require('multer');
const router=express.Router();
const upload = multer();



const { authenticate } = require('../middleware/auth')
const {sendFile} = require('../controller/multimediachat')

router.post('/file/sendfile/:groupname',upload.single('file'), authenticate, sendFile)

module.exports = router;