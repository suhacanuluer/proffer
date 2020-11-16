require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: 3306,
        dialect: "mysql",
        reconnect: reconnectOptions || true
    }
);

sequelize
    .sync()
    .then( () => {
        console.log("connect success");
    })
    .catch( (e) => {
        console.log("cannot connect", e);
    });

    var reconnectOptions = {
        max_retries: 999,
        onRetry: (count) => {
            console.log("connection lost, trying to reconnect (" + count + ")");
        },
    };

    module.exports = {
        sequelize,
    };