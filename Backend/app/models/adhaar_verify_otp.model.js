module.exports = (sequelize, Sequelize) => {
    const Adhaarverifyotp = sequelize.define("adhaar_verify_otp", {
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      adhaar_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      fathername: {
        type: Sequelize.STRING
      },
      reference_id: {
        type: Sequelize.STRING
      }
    });
    return Adhaarverifyotp;
  };