const Group = require('../model/group')
const UserGroup = require('../model/usergroup')

//Create new group 

const creategroup = async (req, res ) => {
    try{
        const {groupname} = req.body;

        const creategroup = await Group.create({groupname});
        const usergroup = await UserGroup.create({groupname,name:req.user.firstName, isAdmine: true, groupId: creategroup.id , userId:req.user.id});
        res.status(201).json({creategroup , success: true, msg:"Successfully Create your Group"})
        console.log("Grouup Created");
        }
    
    catch(err){
        console.log(err.message);
        res.status(500).json({Success: false , err:"Something went wrong"})
    }
}

module.exports.creategroup = creategroup