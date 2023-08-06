const express=require('express');
const router=express.Router();

const { authenticate } = require('../middleware/auth')
const { creategroup , addmember , showGroups , showAllChat , showAllUsers} = require('../controller/group')

router.post('/create-group', authenticate , creategroup);
router.post('/group/invite-friend', authenticate, addmember);
router.get('/show-all-groups', authenticate , showGroups);
router.get('/show-all-chat/:groupname',authenticate, showAllChat)
router.get('/get-all-username/:groupname',authenticate, showAllUsers)

module.exports = router;
