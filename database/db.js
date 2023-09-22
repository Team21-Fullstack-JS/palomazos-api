const { connect, sync } = require('./Connection');
// const { User } = require('../model/User');

// Asociaciones de la tabla 'User' basadas en el diagrama de clases
// User.hasMany(Review, {
//     foreignKey: 'id_user'
// });
// Review.belongsTo(User);

// User.hasMany(Follower, {
//   foreignKey: 'id_user'
// });
// Follower.belongsTo(User);

exports.initDatabase = async () => {
    await connect();
    await sync();
}