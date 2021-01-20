const sequelize = require("../config/db.config");
const User = sequelize.import('../model/user.model');
const bcrypt = require("bcrypt");


async function insert(user) {
  //console.log(JSON.stringify(user));
  const salt = bcrypt.genSaltSync(10);
  user.hashedPassword = bcrypt.hashSync(user.password, salt);
  delete user.password;

  // make a sequelize call to save user in db

    return await User.create(user);
}

async function login(email, password) {
    // find user by email
  let user = await User.findOne({ where: { email: email } });

  if (isUserValid(user, password, user.hashedPassword)) {
   // console.log(user);
    delete user.hashedPassword;
    return user;
  } else {
    return null;
  }
}

async function getUserById(id) {
  let user = await User.findByPk(id);
  if (user) {
    delete user.hashedPassword;
    return user;
  } else {
    return null;
  }
}

function isUserValid(user, password, hashedPassword) {
  return user && bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  insert,
  login,
  getUserById,
};
