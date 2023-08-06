
const chatdb = require('../model/message')
const Group = require('../model/group')

const postmessage = async (req, res) => {
    try {
        const { message , groupname } = req.body;
        console.log(message , groupname);
        const group = await Group.findOne({where:{groupname}})
        //console.log("Group id is ", group.id);
      
        const msgdetails = await chatdb.create({
            message,
            username:req.user.firstName,
            userId: req.user.id,
            groupId: group.id
        })
        console.log("message store successfully into db");
        res.status(201).json(msgdetails);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, err: "Something went wrong" })
    }
}

const getmessage = async(req, res) => {
    try{
        const result = await chatdb.findAll({where:{userId:req.user.id}})
    

        return res.status(200).json(result)
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false, err:"Something is wrong"})
    }
}

module.exports = { postmessage , getmessage };