const Sequelize = require("sequelize");
const { sequelize } = require("../Database/Database");
module.exports = (sequelize, DataTypes) => {
    return (User = sequelize.define(
        "user",
        {
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            token: {
                type: Sequelize.STRING,
            },
            facebook_user_id: {
                type: Sequelize.STRING,
            },
            photo_url: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
        },
        { freezeTableName: true, timestamps:false }
    ));
};