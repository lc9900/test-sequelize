const Sequelize = require('sequelize');

const dbUrl = process.env.DATABASE_URL || 'postgres://localhost/testdb';
const db = new Sequelize(dbUrl, {logging: true});
const utils = require('./utils');




const User = db.define('user', {
    name: Sequelize.STRING
})

const Project = db.define('project', {
    name: Sequelize.STRING
})


// BelongsTo
User.belongsTo(Project);
db.sync({force: true})
    .then(() => {
        utils.inform('Database Sync');
    }).catch(err => {
        throw err;
    })
