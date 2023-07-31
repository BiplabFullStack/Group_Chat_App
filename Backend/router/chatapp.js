const express=require('express');
const router=express.Router();
const {postmessage, getmessage} = require('../controller/chatapp')
const { authenticate } = require('../middleware/auth')

router.post('/message', authenticate, postmessage);
router.get('/getmessage',authenticate, getmessage);

module.exports = router;