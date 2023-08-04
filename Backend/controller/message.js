const chatdb = require('../model/message')

const postmessage = async (req, res) => {
    try {
        const { message } = req.body;
        //console.log(message);

        await chatdb.create({
            message,
            userId: req.user.id
        })
        console.log("message store successfully into db");
        res.status(201).json({ success: true, msg: "message store successfully into db" });
    }
    catch (err) {
        console.log(err.message);
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