const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { postmessage , showAllChat , showAllUsers , addmember , makeAdmine } = require('../controller/groupchat')


router.post('/message', authenticate, postmessage);
router.get('/show-all-chat/:groupname',authenticate, showAllChat)
router.get('/get-all-username/:groupname',authenticate, showAllUsers)
router.post('/group/invite-friend', authenticate, addmember);
router.post('/make-admin',authenticate, makeAdmine);

module.exports = router;






