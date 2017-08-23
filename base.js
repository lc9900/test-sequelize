// const db = require('../models');
// const User = db.models.User;
// const Award = db.models.Award;
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


///////////////////////////////////////////////////////////////////////////////


// db.syncAndSeed().then(() => {
//     // User.findOne({
//     //     where: {
//     //         id: 3
//     //     }
//     // }).then(user => {
//     //     return user.getMentor();
//     // }).then(mentor => {
//     //     console.log(mentor.name)
//     // })

//     User.findOne({
//         where: {
//             id: 1
//         }
//     }).then(user => {
//         console.log(user.name);
//         return user.getMentees()
//     }).then(mentees => {
//         console.log(mentees);
//         mentees.forEach((mentee) => {
//             console.log(mentee.name);
//         })
//     })

// }).catch((err) => {
//     throw err;
// })

//////////////////////////////////////////////////////////////////////////////

// A project can have multiple users
// A user can only belong to one project
// testUser.belongsTo(testProject);

// testUser.hasMany(testUser, { as: 'mentees'}); // creates testuserId column


// hasMany
// Project.hasMany(User, {as: 'Workers'}); // Adds projectId to User
// db.sync({force: true})
//     .then(() => {
//         console.log('Synced');
//          console.log('============================================');
//         return Project.create({
//             name: 'Project 1',
//             user: [{name: 'User1'}, {name: 'User2'}]
//         }, {
//             include: [{
//                 model: User,
//                 as: 'Workers'
//             }]
//         });
//         // return User.create({
//         //     name: 'User1',
//         //     project: {name: 'Project 1'}
//         // }, { include: [Project]});
//     }).then(project => {
//         // console.log('============================================');
//         // return project.setWorkers({name: 'User1'});
//     }).catch(err => {
//         throw err;
//     });



