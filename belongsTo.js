const Sequelize = require('sequelize');
const dbUrl = process.env.DATABASE_URL || 'postgres://localhost/testdb';
const db = new Sequelize(dbUrl, {logging: true});
const utils = require('./utils');
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        get: function(){
            // Database will not get 'GetModified', but when you retrieve user.name, you will get "GetMOdified name"
            return  "GetModified " + this.getDataValue('name');
        },
        set: function(name){
            // Database would now have  user's name as 'name SetModified'
            this.setDataValue('name', name + " SetModified" );
        }
    }
})

const Project = db.define('project', {
    name: Sequelize.STRING,
})

// BelongsTo
// Many user to one project
User.belongsTo(Project);

User.belongsTo(User, {as: 'manager'}); // Creates managerId in the user table
User.hasMany(User, {as: 'worker', foreignKey: 'managerId'}); // No table change, since we defined a foreignKey

var user1, project1, worker1, worker2;

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

        console.log(`project.addUser ${project.addUser}`); // Undefined
        console.log(`project.addUsers ${project.addUsers}`); // Undefined

        // For the self-association
        console.log(`user.getManager ${user.getManager}`); // defined
        console.log(`user.getManagers ${user.getManagers}`); // Undefined
        console.log(`user.setManager ${user.setManager}`); // defined
        console.log(`user.setManagers ${user.setManagers}`); // Undefined

        console.log(`user.getWorker ${user.getWorker}`); // defined
        console.log(`user.getWorkers ${user.getWorkers}`); // Undefined
        console.log(`user.setWorker ${user.setWorker}`); // defined
        console.log(`user.setWorkers ${user.setWorkers}`); // Undefined

        user.name = 'UserX';
        return user.save()

    }).then((user) => {
        user1 = user;

        utils.inform(user1.name);

        var project = Project.build({})
        project.name = "Project 1";
        // return user1.setProject(project1); // No project ID inserted
        return project.save()

    }).then(project => {
        return user1.setProject(project); // Now works
    }).then(user => {
        utils.inform(user.name); // user1.setProject(project) returns user1 sequelize object
        return user.getProject();
    }).then(project => {
        utils.inform(project.name); // user.getProject returns a sequelize object for project
    }).then(() => {
        return User.create({
            name: "Worker1"
        })
    }).then(user => {
        worker1 = user;
        return User.create({
            name: 'Worker2'
        })
    }).then(user => {
        worker2 = user;

        return worker2.setManager(user1); // Sets worker2's managerId to user1
    }).then(() => {
        console.log('=======================================')
        return user1.setWorker(worker1);
    }).then(() => {
        console.log('=======================================')
        return user1.setWorker(worker2);
    }).then(() => {
        console.log('=======================================')
        return worker1.setManager(user1);
    })
    .catch(err => {
        throw err;
    })

