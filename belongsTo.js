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
var user1, project1;

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

        // project.name = 'Project X';
        user.name = 'User X';
        // return user.setProject(project);
        return user.save()

    }).then((user) => {
        user1 = user;
        var project = Project.build({})
        project.name = "Project 1";
        // return user1.setProject(project1); // No project ID inserted
        return project.save()

    }).then(project => {
        return user1.setProject(project); // Now works
    }).catch(err => {
        throw err;
    })

