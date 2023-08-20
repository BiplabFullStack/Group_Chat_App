const archivedChat = require('../model/archivedChat');
const Chat = require('../model/message');
const CronJob = require("cron").CronJob;

const job = new CronJob(
    '1 * * * * *',
    async function() {
        try {
            const data = await Chat.findAll();
            data.foreach(async (ele) => {
                console.log('ele', ele);
                await archivedChat.create({
                    id: ele.id,
                    message: ele.message,
                    username: ele.username,
                    userId: ele.userId,
                    groupId: ele.groupId
                })
            })
    
            await Chat.destroy()
        }
        catch (err) {
            console.log(err.message);
    
        }
    },
    null,
    true,
);



module.exports = { job }