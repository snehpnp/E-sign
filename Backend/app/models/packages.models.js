module.exports = (sequelize, Sequelize) => {
    const Packages = sequelize.define("packages", {
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      package_validity: {
        type: Sequelize.STRING
      },
      package_day_month: {
        type: Sequelize.STRING
      },
      adhar_sign_price: {
        type: Sequelize.STRING
      },
      adhar_verify_price: {
        type: Sequelize.STRING
      },
      pan_verify_price: {
        type: Sequelize.STRING
      },
      package_details: {
        type: Sequelize.STRING
      },
      currently_assigne:{
        type: Sequelize.TINYINT,
        defaultValue: 0
    }
    });
    return Packages;
  };