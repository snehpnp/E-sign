module.exports = (sequelize, Sequelize) => {
    const Variables = sequelize.define("variables", {
        label:{
            type: Sequelize.STRING,
            //unique: true,
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
        
    });
    // Users.hasMany(fund, {
    //     foreignKey: 'admin_id'
    //   });
    return Variables;
  
};