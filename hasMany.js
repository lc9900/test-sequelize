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
Project.hasMany(User);

db.sync({force: true})
    .then(() => {
        utils.inform('Database Sync');

        var user = User.build({});
        console.log(`user.getProject ${user.getProject}`); // Undefined
        console.log(`user.setProject ${user.setProject}`); // Undefined

        var project = Project.build({})
        console.log(`project.getUsers ${project.getUsers}`); // Defined
        console.log(`project.getUser ${project.getUser}`); // Undefined
        console.log(`project.setUsers ${project.setUsers}`); // Defined
        console.log(`project.setUser ${project.setUser}`); // Undefined
    }).catch(err => {
        throw err;
    })
