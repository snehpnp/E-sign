module.exports = (sequelize, Sequelize) => {
    const Adhaarverify = sequelize.define("adhaar_verify", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.STRING
      },
      age_rang: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      adhaar_number: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      mobile_last_digit: {
        type: Sequelize.STRING
      }
    });
    return Adhaarverify;
  };