const dataType=require('sequelize');

const sequelize=require('../database/db');

const archivedChat = sequelize.define('archived',{
    id:{
        type:dataType.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    message:{
        type:dataType.STRING,
        allowNull:false
    },
    username:{
        type:dataType.STRING,
        allowNull:false
    },
    userId:{
        type:dataType.STRING,
        allowNull:false
    },
    groupId:{
        type:dataType.STRING,
        allowNull:false
    }
})

module.exports.archivedChat = archivedChat;