const express=require('express');
const router=express.Router();
const { login , userdetails } = require('../controller/login');
const { authenticate } = require('../middleware/auth')

router.post( '/login', login );
router.get('/getusername',authenticate, userdetails)

module.exports = router;
