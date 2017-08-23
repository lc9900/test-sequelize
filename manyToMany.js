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

User.belongsToMany(User, { as: 'follower', through: 'followTable' });
// User.hasMany(User, { as: 'following', foreignKey: 'followerId' })


let user1, user2, user3, user4;
db.sync({force: true})
  .then(() => {
    utils.inform('Database Sync');
  }).then(()=> {
    user1 = User.build({ name: 'user1' });
    console.log(`getFollower ${user1.getFollower}`);
    console.log(`setFollower ${user1.setFollower}`);
    return user1.save();
  }).then((user)=> {
    user1 = user;
    return User.create({ name: 'user2' });
  }).then(user=> {
    user2 = user;
    return User.create({ name: 'user3 '})
  }).then(user=> {
    user3 = user;
    return User.create({ name: 'user4 '})
  }).then((user)=> {
    user4 = user;
    return Promise.all([
      user1.setFollower(user3),
      user1.setFollower(user2),
      user1.setFollower(user4),
      user2.setFollower(user3),
      user3.setFollower(user1),
      user3.setFollower(user2),
    ])
  }).then((stuff)=> {
    return user1.setFollower([user2, user4]);
  }).then(result=> {
    // return user1.removeFollowers(user2);
  }).catch(err => {
      throw err;
  })
