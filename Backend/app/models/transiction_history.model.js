module.exports = (sequelize, Sequelize) => {
    const Transictionhistory = sequelize.define("transiction_history", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      package_id: {
        type: Sequelize.INTEGER
      },
      sign_charge: {
        type: Sequelize.INTEGER
      },
      sign_type: {
        type: Sequelize.STRING
      },
      fund: {
        type: Sequelize.INTEGER
      },
      fundremain: {
        type: Sequelize.INTEGER
      },
      template_id: {
        type: Sequelize.INTEGER
      },
    });
    return Transictionhistory;
  };