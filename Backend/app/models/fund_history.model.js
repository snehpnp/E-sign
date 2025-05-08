
const Users = require('./users.models.js')
module.exports = (sequelize, Sequelize) => {
    const Fundhistory = sequelize.define("fund_history", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      required_fund: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      fund_added: {
        type: Sequelize.INTEGER
      },
      available_fund: {
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING
      }
    });
    // Fundhistory.belongsTo(Users);
    return Fundhistory;
  };