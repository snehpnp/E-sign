module.exports = (sequelize, Sequelize) => {
    const Templatevariables = sequelize.define("template_variables", {
        template_id:{
            type: Sequelize.INTEGER
        },
        variables: {
            type: Sequelize.STRING
        }
        
    });
    // Users.hasMany(fund, {
    //     foreignKey: 'admin_id'
    //   });
    return Templatevariables;
  
};