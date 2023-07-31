const express=require('express');
const router=express.Router();
const {postmessage} = require('../controller/chatapp')
const { authenticate } = require('../middleware/auth')

router.post('/message', authenticate, postmessage);

module.exports = router;