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
// Many user to one project
User.belongsTo(Project);

db.sync({force: true})
    .then(() => {
        utils.inform('Database Sync');

        var user = User.build({});
        console.log(`user.getProject ${user.getProject}`); // Defined
        console.log(`user.setProject ${user.setProject}`); // Defined

        var project = Project.build({})
        console.log(`project.getUsers ${project.getUsers}`); // Undefined
        console.log(`project.getUser ${project.getUser}`); // Undefined
        console.log(`project.setUsers ${project.setUsers}`); // Undefined
        console.log(`project.setUser ${project.setUser}`); // Undefined

    }).catch(err => {
        throw err;
    })

