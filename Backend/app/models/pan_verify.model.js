module.exports = (sequelize, Sequelize) => {
    const Panverify = sequelize.define("pan_verify", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      pan_number: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }
    });
    return Panverify;
  };