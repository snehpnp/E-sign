module.exports = (sequelize, Sequelize) => {
    const UniqeId = sequelize.define("uniqeid", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      uniqekey: {
        type: Sequelize.STRING
      },
      imagename: {
        type: Sequelize.STRING
      }
    });
    return UniqeId;
  };