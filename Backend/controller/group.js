const Group = require('../model/group')
const UserGroup = require('../model/usergroup')
const sequelize = require('../database/db')

const creategroup = async (req, res ) => {
    try{
       // const t = sequelize.transaction();
        const {groupname} = req.body;
        const creategroup = await Group.create({groupname});
        const usergroup = await UserGroup.create({groupname,name:req.user.firstName, isAdmine: true, groupId: creategroup.id , userId:req.user.id});
        res.status(201).json({creategroup , success: true, msg:"Successfully Create your Group"})
        console.log("Grouup Created");
       // await t.commit()
    }
    catch(err){
        console.log(err.message);
       // await t.rollback();
        res.status(500).json({Success: false , err:"Something went wrong"})
    }
}

module.exports.creategroup = creategroup;