const chatdb = require('../model/chatapp')

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

module.exports.postmessage = postmessage;