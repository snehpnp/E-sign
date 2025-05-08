const config = require("../config/auth.config");
const User = require("./users.models.js");
const Role = require("./roles.models.js");
 module.exports = (sequelize, Sequelize) => {
    const Userroles = sequelize.define("user_roles", {
      roleId: {
        type: Sequelize.INTEGER,
        references: {
        model: Role, 
        key: 'id'
      }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
        model: User, 
        key: 'id'
      }
      },
     });
     return Userroles;
   };