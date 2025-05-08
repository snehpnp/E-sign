module.exports = (sequelize, Sequelize) => {
    const System = sequelize.define("systems", {
        company_name: {
            type: Sequelize.STRING
        },
        comapny_sort_name: {
            type: Sequelize.STRING
        },
        company_logo: {
            type: Sequelize.STRING
        },
        company_favicon: {
            type: Sequelize.STRING
        },
        company_email: {
            type: Sequelize.STRING
        },
        company_cc: {
            type: Sequelize.STRING
        },
        company_bcc: {
            type: Sequelize.STRING
        },
        email_password: {
            type: Sequelize.STRING
        },
        smtp_host: {
            type: Sequelize.STRING
        },
        smtp_port: {
            type: Sequelize.STRING
        },
        admin_id: {
            type: Sequelize.STRING
        },
    });
    return System;
};