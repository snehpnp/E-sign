const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.models.js")(sequelize, Sequelize);
db.packages = require("./packages.models.js")(sequelize, Sequelize);
db.company_packages = require("./comapnyPackages.model.js")(sequelize, Sequelize);
db.systems = require("./systems.model.js")(sequelize, Sequelize);
db.roles = require("./roles.models.js")(sequelize, Sequelize);
db.Userroles = require("./user_roles.models.js")(sequelize, Sequelize);
db.Stamp = require("./stamp.models.js")(sequelize, Sequelize);
db.Transictionhistory = require("./transiction_history.model.js")(sequelize, Sequelize);
db.Fundhistory = require("./fund_history.model.js")(sequelize, Sequelize);
db.adhaarverify = require("./adhaar_verify.model.js")(sequelize, Sequelize);
db.adhaarverifyotp = require("./adhaar_verify_otp.model.js")(sequelize, Sequelize);
db.panverify = require("./pan_verify.model.js")(sequelize, Sequelize);
db.panverify = require("./pan_verify.model.js")(sequelize, Sequelize);
db.adhaarsigne = require("./adhaar_signe.model.js")(sequelize, Sequelize);
db.uniqeid = require("./uniqeid.models.js")(sequelize, Sequelize);
db.templates = require("./template.models.js")(sequelize, Sequelize);
db.usertemplate = require("./user_templates.models.js")(sequelize, Sequelize);
db.variables = require("./variables.models.js")(sequelize, Sequelize);
db.templatevariables = require("./template_variables.models.js")(sequelize, Sequelize);
//db.additionaldetails = require("./additional-details.models.js")(sequelize, Sequelize);

//User Relation with fundhistory 
db.users.hasMany(db.Transictionhistory,{foreignKey:"admin_id"});
db.Transictionhistory.belongsTo(db.users,{foreignKey:"admin_id", as:"admindetails"});

db.users.hasMany(db.Transictionhistory,{foreignKey:"user_id"});
db.Transictionhistory.belongsTo(db.users,{foreignKey:"user_id", as:"userdetails"});

db.templates.hasMany(db.Transictionhistory,{foreignKey:"template_id"});
db.Transictionhistory.belongsTo(db.templates,{foreignKey:"template_id", as:"templatedetails"});

db.users.hasMany(db.company_packages,{foreignKey:"admin_id"});
db.company_packages.belongsTo(db.users,{foreignKey:"admin_id", as:"admindata"});

db.users.hasMany(db.usertemplate,{foreignKey:"user_id"});
db.usertemplate.belongsTo(db.users,{foreignKey:"user_id", as:"userdata"});

db.templates.hasMany(db.usertemplate,{foreignKey:"template_id"});
db.usertemplate.belongsTo(db.templates,{foreignKey:"template_id", as:"templatedata"});

db.users.hasOne(db.Fundhistory,{foreignKey:"admin_id"});
db.Fundhistory.belongsTo(db.users,{foreignKey:"admin_id",as:'userdetails'});

db.packages.hasOne(db.company_packages,{foreignKey:"package_id"});
db.company_packages.belongsTo(db.packages,{foreignKey:"package_id",as:'packagedetails'});
//End Relation with fundhistory
db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["superadmin", "admin", "subadmin", "user"];

module.exports = db;