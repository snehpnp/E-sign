module.exports = (sequelize, Sequelize) => {
    const Usertemplate = sequelize.define("user_templates", {
      template_id: {
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.STRING
      },
      sign_status: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      maillink: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
    linkexpires: {
      type: Sequelize.STRING,
      defaultValue: null
  },
  generate_sign: {
    type: Sequelize.TINYINT,
    defaultValue: 0
  }
      
    });
    return Usertemplate;
  };