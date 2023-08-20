
const UserGroup = require('../model/usergroup')

//Show all groups 
const showAllGroups = async (req, res) => {
    try{
        const groups = await UserGroup.findAll({where:{userId:req.user.id}})
        if(!groups){
            return res.status(400).json({Success: false, err:"Something went wrong"})
        }
        res.status(200).json({groups})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({err})
    }
}

module.exports.showAllGroups = showAllGroups;