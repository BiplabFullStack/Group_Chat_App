const Group = require('../model/group')
const UserGroup = require('../model/usergroup')
const User = require('../model/signUp')
const Chat = require('../model/message')



// -----------------------------------------------  Post Message --------------------------------------------------

const postmessage = async (req, res) => {
    try {
        const { message , groupname } = req.body;
        console.log(message , groupname);
        const group = await Group.findOne({where:{groupname}})
        //console.log("Group id is ", group.id);
      
        const msgdetails = await Chat.create({
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




// -----------------------------------------------  Show all Message  --------------------------------------------------

const showAllChat = async (req, res) => {
    try{
    const groupname = req.params.groupname;
    const group = await Group.findOne({where:{groupname}})
    const chat = await Chat.findAll({where:{groupId:group.id}})
    const usergroup = await UserGroup.findAll({where:{groupId:group.id , userId:req.user.id}})

    res.status(200).json({chat, usergroup})
    }
    catch(err){
        console.log(err.message);
    }
}



// -----------------------------------------------  Show all Users  --------------------------------------------------

const showAllUsers = async ( req, res ) => {
    try{
        const groupname = req.params.groupname;
        const response = await UserGroup.findAll({where:{groupname}})
       // console.log(response.firstName);
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    }
}



// -----------------------------------------------  Invite into another user  --------------------------------------------------

const addmember = async (req, res ) => {
    try{
    const {email, groupname} = req.body;
    const member = await User.findOne({where:{email}})
    if(!member){
        console.log('Email-Id not valid');
        return res.status(400).json({success:false, msg: "Email-Id not valid"})
    }
    const usergroup1 = await UserGroup.findOne({where:{userId:member.id, groupname:groupname}})
    if(usergroup1){
        return res.status(400).json({Success:false, msg:"User allready have in this group"})
    }
    const group = await Group.findOne({where:{groupname}})
    const usergroup = await UserGroup.create({groupname, name:member.firstName , groupId:group.id, userId:member.id})
    res.status(201).json({success:true, msg:"member join in this group"});
    console.log("member join in this group");
    }
    catch(err){
        console.log(err.message);
    }
}



// -----------------------------------------------  Make admin   --------------------------------------------------

const makeAdmine =async (req, res ) => {
    try{
    const {email , groupname} = req.body;
    const userdetails = await User.findOne({where:{email}})
    if(!userdetails){
        console.log("User not valid");
        return res.status(404).json({success: false, msg :"User not valid"})
    }
    const findadmin = await UserGroup.findOne({where:{userId:userdetails.id, groupname}})
    if(findadmin.isAdmine == true){
        console.log("User already admin");
        return res.status(403).json({success: false, msg :"User already admin"})
    }
    const updatedData = await UserGroup.update({isAdmine:true},{where:{userId:userdetails.id}})
    res.status(200).json(updatedData);
    console.log("Successfully make admin");
    }
    catch(err){
        console.log("error gyse");
        res.status(400).json({err})
    }

}




// -----------------------------------------------  Exports  --------------------------------------------------

module.exports = { postmessage , showAllChat , showAllUsers , addmember , makeAdmine }

