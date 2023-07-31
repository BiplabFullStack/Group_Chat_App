const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const chalk = require('chalk');
const sequelize = require('./database/db')




const signUpRoute = require('./router/signUp');
const loginRouter = require('./router/login');
const chatappRouter = require('./router/chatapp');
const User = require('./model/signUp')
const chat = require('./model/chatapp')


const app = new express();
app.use(bodyParser.json());
app.use(cors());
app.use(signUpRoute);
app.use(loginRouter);
app.use(chatappRouter);



User.hasMany(chat)
chat.belongsTo(User)



sequelize.sync().then(result=>{
    console.log(chalk.green.inverse('Database Connected ....'))
    app.listen(process.env.PORT,()=>{
        console.log(chalk.magenta.inverse( `Server running on port ${process.env.PORT} `));
    });
}).catch(err=>{
    console.log(chalk.red(err.message));
});



app.use('/*',(req, res)=>{
    res.status(404)
    .send('<h1  style ="text-align: center;">Page Not Found !!!</h1>')
})