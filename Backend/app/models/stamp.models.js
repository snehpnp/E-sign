module.exports = (sequelize, Sequelize) => {
    const Stamp = sequelize.define("stamps", {
      stamp: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
    });
    return Stamp;
  };