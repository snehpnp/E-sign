module.exports = (sequelize, Sequelize) => {
    const Templates = sequelize.define("templates", {
        name:{
            type: Sequelize.STRING
        },
        html: {
            type: Sequelize.TEXT('long')
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        
    });
    // Users.hasMany(fund, {
    //     foreignKey: 'admin_id'
    //   });
    return Templates;
  
};