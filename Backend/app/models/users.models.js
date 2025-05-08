module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        email: {
            type: Sequelize.STRING
        },
        company_email: {
            type: Sequelize.STRING
        },
        company_domain: {
            type: Sequelize.STRING
        },
        personal_contact: {
            type: Sequelize.STRING
        },
        company_contact: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        package_id: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        show_password: {
            type: Sequelize.STRING
        },
        // user_roles: {
        //     type: Sequelize.STRING
        // },
        //   roleId: {
        //     type: Sequelize.INTEGER
        //   },
        parent_admin_id: {
            type: Sequelize.INTEGER
        },
        fund: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        adhaar: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        pan: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        pan: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        adhaar_sign: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        adhaar_verify_with_otp: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        client_stamp: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        document: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.TEXT('long'),
            defaultValue: null
        },
        start_date: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        expiry_date: {
            type: Sequelize.DATE,
            defaultValue: null
        },
        sign_status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        otpbased: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        otp: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        signeddocument: {
            type: Sequelize.TEXT('long'),
            defaultValue: 0
        },
        client_id:{
            type: Sequelize.TEXT('long'),
            defaultValue: 0
        },
        kycdocument: {
            type: Sequelize.TEXT('long'),
            defaultValue: 0
        },
    
        alternate_number: {
            type: Sequelize.STRING
        },

        linkexpires: {
            type: Sequelize.STRING,
            defaultValue: null
        },

        pan_status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },

        aadhaar_status: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        maillink: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        documentstatus: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        smtp_status: {
            type: Sequelize.STRING,
            defaultValue: 0
        },
        template_id:{
            type: Sequelize.INTEGER
        }
        
    });
    // Users.hasMany(fund, {
    //     foreignKey: 'admin_id'
    //   });
    return Users;
  
};