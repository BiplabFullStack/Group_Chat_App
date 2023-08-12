const Group = require('../model/group')
const Chat = require('../model/message')
const { updatedToS3 } = require('../service/s3service')


const sendFile = async (req, res) => {
    try{

    const groupname = req.params.groupname;
    const groupDetails = await Group.findOne({where:{groupname}})

    if(!req.file){
        return res.status(400).json({success: false, msg: "Please select file"})
    }
    let type = (req.file.mimetype.split('/'))[1];
    const file = req.file.buffer
    const file2 = req.file.buffer.toString();
    //console.log(file2);
    const filename = `Groupchat/${new Date()}.${type}`
    
    const fileUrl = await updatedToS3(file, filename)
    console.log(' ----> ',fileUrl);

    const chat = await Chat.create({
        message:fileUrl,
        username:req.user.firstName,
        userId:req.user.id,
        groupId:groupDetails.id
    })
    res.status(200).json(chat)
}
catch(err){
    console.log(err.message);
    res.status(400).json(err)
}
}

module.exports.sendFile = sendFile;