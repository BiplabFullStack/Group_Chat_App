const Group = require('../model/group')
const UserGroup = require('../model/usergroup')
const sequelize = require('../database/db')
const User = require('../model/signUp')
const Chat = require('../model/message')

//Create new group 
const creategroup = async (req, res ) => {
    try{
       // const t = sequelize.transaction();
        const {groupname} = req.body;

        const validgroup = await UserGroup.findOne({where:{groupname}})
        if(validgroup){
            res.status(200).json({Success: false, msg:"groupname already created"})
            console.log("groupname already created");
        }else{

        const creategroup = await Group.create({groupname});
        const usergroup = await UserGroup.create({groupname,name:req.user.firstName, isAdmine: true, groupId: creategroup.id , userId:req.user.id});
        res.status(201).json({creategroup , success: true, msg:"Successfully Create your Group"})
        console.log("Grouup Created");
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({Success: false , err:"Something went wrong"})
    }
}

//invite friend 
const addmember = async (req, res ) => {
    try{
    const {email, groupname} = req.body;
    console.log(email, groupname);
    const member = await User.findOne({where:{email}})
    const usergroup1 = await UserGroup.findOne({where:{userId:member.id, groupname:groupname}})
    if(usergroup1){
        return res.status(400).json({Success:false, msg:"User allready have in this group"})
    }
    const group = await Group.findOne({where:{groupname}})
    const usergroup = await UserGroup.create({groupname, name:member.firstName , groupId:group.id, userId:member.id})
    res.status(201).json({success:true, msg:"member added onto this group"});
    console.log("member added onto this group");
    }
    catch(err){
        console.log(err.message);
    }
}

//Show groups
const showGroups = async (req, res) => {
    try{
        const groups = await UserGroup.findAll({where:{userId:req.user.id}})
        res.status(200).json({groups})
    }
    catch(err){
        console.log(err.message);
    }
}

//Show all message from perticular group
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

module.exports ={ creategroup, addmember , showGroups , showAllChat , showAllUsers};