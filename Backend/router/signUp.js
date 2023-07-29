const express=require('express');
const router=express.Router();
const{signUpPostData} = require('../controller/signUp')


router.post('/postdata', signUpPostData);

module.exports = router;
