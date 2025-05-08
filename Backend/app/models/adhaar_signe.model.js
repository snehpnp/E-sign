module.exports = (sequelize, Sequelize) => {
    const Adhaarsigne = sequelize.define("adhaar_signe", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.STRING
      }
    });
    return Adhaarsigne;
  };