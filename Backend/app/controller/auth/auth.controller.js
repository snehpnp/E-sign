const db = require("../../models");
const config = require("../../config/auth.config");
require('dotenv').config();
const User = db.users;
const Role = db.roles;
const System = db.systems;
const UserRoles = db.Userroles;
const Stamp = db.Stamp;
const Packages = db.packages
const Op = db.Sequelize.Op;
const Companypackage = db.company_packages;
const Fundhistory = db.Fundhistory;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
const fs = require("fs");
var crypto = require('crypto');

exports.signup = (req, res) => {
    //res.send("okk");
    // return
    // console.log("requestdata  -  ", req.file.document);
    var pass = crypto.randomInt(1000, 10000);
    
    User.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            company_email: req.body.company_email,
            show_password: pass,
            parent_admin_id: req.body.parent_admin_id,
            company_domain: req.body.company_domain,
            personal_contact: req.body.personal_contact,
            company_contact: req.body.company_contact,
            address: req.body.address,
            package_id: req.body.package_id,
            status: 1,
            password: bcrypt.hashSync(pass.toString(), 8),
            fund: req.body.fund,
            adhaar: req.body.adhaar,
            pan: req.body.pan,
            adhaar_sign: req.body.adhaar_sign,
            start_date:new Date()

        })
        .then(user => {
            Fundhistory.create({
                admin_id: user.id,
                fund_added: req.body.fund,
                available_fund:req.body.fund,
                action: "created",
            })
            Packages.update({currently_assigne: 1}, {where: {id: req.body.package_id}});
            if (req.body.e_stamp) {
                req.body.e_stamp.forEach(element => {
                    Stamp.create({
                        stamp: element,
                        user_id: user.id
                    })
                });
            }
            if (req.body.package_id) {
                var expiry = user.createdAt
                Packages.findByPk(req.body.package_id, {
                     })
                .then((packages) => {
                    //console.log("packagesdata", packages.package_validity)
                    console.log("package_validity_datatype", typeof parseInt(packages.package_day_month))
                    if (packages.package_day_month == "Day") {
                      expiry.setDate(expiry.getDate() +  parseInt(packages.package_validity))
                    //   var startdate = expiry
                    //   if(expiry > new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(expiry < new Date()){
                    //     startdate = new Date()
                    //   }
                      Companypackage.create({
                        admin_id:user.id,
                        package_id:req.body.package_id,
                        start_service:new Date(),
                        end_service:expiry
                    })
                    User.update({expiry_date:expiry},{
                        where: { id: user.id },
                        })
                    }else if(packages.package_day_month == "Month"){
                       expiry.setMonth(expiry.getMonth() + parseInt(packages.package_validity))
                    //    var startdate = expiry
                    //   if(expiry > new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(expiry < new Date()){
                    //     startdate = new Date()
                    //   }
                      Companypackage.create({
                        admin_id:user.id,
                        package_id:req.body.package_id,
                        start_service:new Date(),
                        end_service:expiry
                    })
                    User.update({expiry_date:expiry},{
                        where: { id: user.id },
                        })
                    }else if(packages.package_day_month == "Year"){
                      expiry.setFullYear(expiry.getFullYear() +  parseInt(packages.package_validity))
                    //   var startdate = expiry
                    //   if(expiry > new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(expiry < new Date()){
                    //     startdate = new Date()
                    //   }
                      Companypackage.create({
                        admin_id:user.id,
                        package_id:req.body.package_id,
                        start_service:new Date(),
                        end_service:expiry
                    })
                    User.update({expiry_date:expiry},{
                        where: { id: user.id },
                        })
                    }else{
                      expiry.setFullYear(expiry.getFullYear() +  parseInt(packages.package_validity))
                    //   var startdate = expiry
                    //   if(expiry > new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(expiry < new Date()){
                    //     startdate = new Date()
                    //   }
                      Companypackage.create({
                        admin_id:user.id,
                        package_id:req.body.package_id,
                        start_service:user.createdAt,
                        end_service:expiry
                    })
                    User.update({expiry_date:expiry},{
                        where: { id: user.id },
                        })
                    }
                    
                })
                 
               
             }
            var userid = Buffer.from(JSON.stringify(user.id)).toString('base64');
            //var plain = Buffer.from(userid, 'base64').toString('utf8');
            //console.log("PLAINID",plain);
            //console.log("USERID",userid);
            UserRoles.findAll({
                    where: { userId: req.body.parent_admin_id },
                })
                .then((data) => {
                    console.log("requestdata", req.body);
                    if (req.body.roles[0] == "admin") {
                        console.log("Checkinggg SMTP_PORT", process.env.SMTP_PORT)
                        console.log("Checkinggg SMTP_PORT", process.env.SMTP_HOST)
                        console.log("Checkinggg SMTP_PORT", process.env.SMTP_USER)
                        console.log("Checkinggg SMTP_PORT", process.env.SMTP_PORT)
                        
                        const transporter = nodemailer.createTransport({
                            port: process.env.SMTP_PORT,               // true for 465, false for other ports
                            host: process.env.SMTP_HOST,
                               auth: {
                                    user: process.env.SMTP_USER,
                                    pass: process.env.SMTP_PASSWORD,
                                 },
                            secure: true,
                            })
                            // let multilineString = 'Email-'+req.body.email+
                            // '\n Password-'+pass+
                            // '\n Login Link- https://esignaadhaar.com/#/login'
                            var url = "https://180.149.241.128:3010/#/login"
                            
                           //let multilineString = "<h4>Dear "+req.body.username+" </h4><p>Thank you for choosing E-signaadhaar For Digitally E-Sign Documents, </p><p><h4>Login Details:</h4></p><p>Login Url :http://180.149.241.128:3010/#/login</p><p>Your User Name : <b>"+req.body.email+"</b></p><p>Password : <b>"+pass+"</b></p>";
                           let multilineString = "<h4>Dear "+req.body.username+" </h4><p>Thank you for choosing E-signaadhaar For Digitally E-Sign Documents, </p><p><h4>Login Details:</h4></p><p>Login Url :https://app.esignaadhaar.com/#/login</p><p>Your User Name : <b>"+req.body.email+"</b></p><p>Password : <b>"+pass+"</b></p>";
                            
                           //let multilineString = "Dear "+req.body.username+" </p><p>Thank you for choosing E-sing Platform. We are pleased to inform that the password of your <br> E-sign Platform has been resetted as per details mentioned below:</p><p>Login Details:</p><p>User Email / User ID : <b>"+req.body.email+"</b></p><p>Login Password : <b>"+pass+"</b></p><p>Note : Please Change Your Login Password as per your choice.</p><p>Login Url : <a href='https://esignaadhaar.com/#/login'>https://esignaadhaar.com/#/login</a></p>"
                      //     '\n Password-'+pass+
                         //  '\n Login Link- https://esignaadhaar.com/#/login'
                            const mailData = {
                                from: process.env.SMTP_EMAIL,  // sender address
                                  to: req.body.email,   // list of receivers 
                                  subject: 'Login Details',
                                  html: multilineString
                            
                                }
                                transporter.sendMail(mailData, function (err, info) {
                                    if(err)
                                    res.send(err)
                                    else
                                      res.send(info,"Mail send successfully.")
                                 })
                    }
                })


            if (req.body.parent_admin_id == 1) {
                System.create({
                    company_name: "company name",
                    comapny_sort_name: "company sort name",
                    company_logo: "logo",
                    company_favicon: "fav icon",
                    company_email: "company email",
                    company_cc: "company cc email",
                    company_bcc: "bcc email",
                    email_password: "smtp password",
                    smtp_host: "smtp host",
                    smtp_port: "smtp port",
                    admin_id: user.id
                })
            }
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {

                    user.setRoles(roles).then(() => {
                        res.send({ message: "Company was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([2]).then(() => {
                    res.send({ message: "Company was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    expiry_date:user.expiry_date,
                    status_active:user.status,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.forgote_password = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "Email Is Not Register." });
        }
        var userid = Buffer.from(JSON.stringify(user.id)).toString('base64');
        const transporter = nodemailer.createTransport({
            port: process.env.SMTP_PORT, // true for 465, false for other ports
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            secure: true,
        })
        const mailData = {
                from: process.env.SMTP_EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: 'Password Reset Link',
                //text: 'http://180.149.241.128:3010/#/resetpassword/'+userid
                text: 'https://app.esignaadhaar.com/#/resetpassword/'+userid
            }
            //console.log("maildata",)
        transporter.sendMail(mailData, function(err, info) {
            if (err) {
                //console.log("error mail", err)
                res.send(err)
            } else {
                // console.log("info mail", info)
                res.send("Mail send successfully.")
            }
        })
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
    // .catch(err => {
    //     res.status(500).send({
    //         message: "Some thing went wrong"
    //     })
    // })
}

exports.changepassword =   (req, res) => {
     User.findOne({
     where: {
            id: req.body.id
        }
    })
    .then(async (user) =>   {
    const validPassword =  await bcrypt.compare(req.body.old_password.toString(), user.password.toString());
    // console.log('validPassword',validPassword);  
    if (!validPassword) {
        res.send({ success: 'false', message: 'old Password Not Match' });
        return
    } else {   
    User.update({
        password: bcrypt.hashSync(req.body.password.toString(), 8),
        show_password: req.body.password
    },{
        where: { id: req.body.id },
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Password was changed successfully."
            });
        } else {
            res.send({
                message: `Cannot change Password with id=${id}. Maybe Company was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Password with id=" + id
        });
    });
  }

})
.catch(err => {
    res.status(500).send({ message: err.message });
});
}

exports.resetpassword =   (req, res) => {
    User.findOne({
    where: {
           id: req.body.id
       }
   })
   .then(async (user) =>   {
    console.log("userchangepasswordapi", user.id);
    if(user.id){
    User.update({
       password: bcrypt.hashSync(req.body.password.toString(), 8),
       show_password: req.body.password
    },{
       where: { id: req.body.id },
    })
   .then(num => {
       if (num == 1) {
           res.send({
               message: "Password was changed successfully."
           });
       } else {
           res.send({
               message: `Cannot change Password with id=${id}. Maybe Company was not found or req.body is empty!`
           });
       }
   })
   .catch(err => {
       res.status(500).send({
           message: "Error updating Password with id=" + id
       });
   });
  }else{
    res.send({
        message: "User Not Found"
    });
  }

})
.catch(err => {
   res.status(500).send({ message: err.message });
});
}

exports.gotodashboard = (req, res) => {
    User.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            // var passwordIsValid = bcrypt.compareSync(
            //     req.body.password,
            //     user.password
            // );
            // if (!passwordIsValid) {
            //     return res.status(401).send({
            //         accessToken: null,
            //         message: "Invalid Password!"
            //     });
            // }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    expiry_date:user.expiry_date,
                    status_active:user.status,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
