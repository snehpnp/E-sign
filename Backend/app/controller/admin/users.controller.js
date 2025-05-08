const db = require('../../models');
const User = db.users;
const Op = db.Sequelize.Op;
const Stamp = db.Stamp;
const Role = db.roles;
const Fundhistory = db.Fundhistory;
const CompanyPes = db.company_packages;
const Transictionhistory = db.Transictionhistory;
const Packages = db.packages;
var System = db.systems;
const adhaarverify = db.adhaarverifyotp;
const panverify = db.panverify;
const CompanyPackages = db.company_packages;
var { isUuid } = require('uuidv4');
const path = require('path');
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var axios = require('axios');
var moment = require('moment');
const multer = require("multer");
const Uniqeid = db.uniqeid;
require('dotenv').config();
const express = require("express");
const app = express();
var datetime = require('node-datetime');
var fs = require('fs-extra');
var fetch = require('node-fetch');
const Template = db.templates
const Adhaarsigne = db.adhaarsigne
const Adhaarsigneotp = db.adhaarverifyotp
const Usertemplate = db.usertemplate
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const { log } = require('console');


// Add Client from adminstamp

exports.AddClient = (req, res) => {
    var uniqkey = app.get("uniqekey");
    // console.log("appp settted keyy check",uniqkey);
    // // return
    // console.log('Url of third party -', req.body.url);
    // var d_file = Buffer.from(JSON.stringify(req.file)).toString('base64');
    // if (req.file == undefined) {
    //     return res.status(400).send({ message: `You must select a file.` });
    // }
    User.findAll({
        where: { id: req.body.parent_admin_id },
    })
        .then((admindata) => {
            Packages.findAll({
                where: { id: admindata[0].package_id },
            })
                .then((pkgdata) => {
                    User.findAll({
                        where: { parent_admin_id: req.body.parent_admin_id, pan: 1, adhaar_sign: 1 },
                    }).then((allclient) => {
                        // console.log("allclientttttttt", allclient
                        var total = 0
                        var otpsignetotal = 0
                        var total1 = [];
                        var psignetotal = 0
                        var total2 = [];
                        var asignetotal = 0
                        var total3 = [];
                        var apsignetotal = 0
                        var total4 = [];
                        allclient.forEach(element => {
                            //console.log("inside lopppp nilesh");

                            if (element.linkexpires != null) {
                                if (new Date(element.linkexpires) > new Date() && element.sign_status == 0) {

                                    //console.log("Bolo Tara rara");
                                    if (element.otpbased == 1) {
                                        otpsignetotal = 0
                                        otpsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                                        console.log("otpsignetotal", otpsignetotal)
                                        total1.push(otpsignetotal);
                                    } else {
                                        if (element.pan == 1 && element.adhaar_verify_with_otp == 0) {
                                            psignetotal = 0
                                            psignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].pan_verify_price))
                                            console.log("psignetotal", psignetotal)
                                            total2.push(psignetotal);
                                        } else if (element.pan == 0 && element.adhaar_verify_with_otp == 1) {
                                            asignetotal = 0
                                            asignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price))
                                            console.log("asignetotal", asignetotal)
                                            total3.push(asignetotal);
                                        } else if (element.pan == 1 && element.adhaar_verify_with_otp == 1) {
                                            apsignetotal = 0
                                            apsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                                            console.log("apsignetotal", apsignetotal)
                                            total4.push(apsignetotal);
                                        }
                                    }
                                }
                            }


                            //total1 += otpsignetotal 
                            // total2 += psignetotal
                            // total3 += asignetotal
                            // total4 += apsignetotal
                        });
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total1arayy', total1.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total1', total1);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total2arayy', total2.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total2', total2);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total3arayy', total3.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total3', total3);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total4arayy', total4.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total4', total4);
                        total = total1.reduce((a, b) => a + b, 0) + total2.reduce((a, b) => a + b, 0) + total3.reduce((a, b) => a + b, 0) + total4.reduce((a, b) => a + b, 0)

                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total', total);
                        var fundcheck = admindata[0].fund - total;
                        packagepricetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        // console.log('total value  fundcheck ', fundcheck);
                        // console.log('total value  packagepricetotal ', packagepricetotal);
                        // if (fundcheck >= packagepricetotal) {
                        // Uniqeid.findAll({ 
                        //     where: { imagename: req.file.originalname },
                        // })
                        // .then((unikeid) => {
                        System.findAll({
                            where: { admin_id: req.body.parent_admin_id },
                        })
                            .then((smtp) => {

                                var smtpmail = smtp[0].company_email
                                console.log("databasemail", smtp[0].company_email)
                                console.log("envsemail", smtp[0].company_email)
                                console.log("databaseport", smtp[0].smtp_port)
                                console.log("envport", process.env.SMTP_PORT)
                                console.log("databasehost", smtp[0].smtp_host)
                                console.log("envhost", process.env.SMTP_HOST)
                                console.log("databaseusr", smtp[0].company_email)
                                console.log("envuser", process.env.SMTP_USER)
                                console.log("databasepassword", smtp[0].email_password)
                                console.log("envpassword", process.env.SMTP_PASSWORD)
                                // if (smtpmail.includes("@")) {
                                User.create({
                                    username: req.body.username,
                                    fullname: req.body.fullname,
                                    email: req.body.email,
                                    personal_contact: req.body.personal_contact,
                                    pan: req.body.pan,
                                    adhaar: req.body.adhaar,
                                    adhaar_sign: req.body.adhaar_sign,
                                    client_stamp: req.body.client_stamp,
                                    password: bcrypt.hashSync(req.body.password, 8),
                                    parent_admin_id: req.body.parent_admin_id,
                                    // document: req.file.originalname,
                                    otpbased: req.body.otpbased,
                                    // blobdocument: fs.readFileSync(
                                    //     imagepath + "images/" + 'e_sign-' + req.file.originalname
                                    // ),
                                    adhaar_verify_with_otp: req.body.aadhar_verify_with_otp,
                                    // sign_status:3
                                    // linkexpires: req.body.linkexpiry

                                }).then((userdata) => {
                                    var obj = { user_id: userdata.id, admin_id: userdata.parent_admin_id };
                                    var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                                    // sendmailurl = "http://180.149.241.128:7070/#/user/" + userid;
                                    // User.update({ maillink: sendmailurl }, {
                                    //     where: { id: userdata.id }
                                    // })
                                    //     .then(num => {
                                    var imagepath = path.join(__dirname, '../../');
                                    var imagepath1 = path.join(__dirname, '../../../../');
                                    var imagepathhh = path.join(__dirname, '../');
                                    // fs.rename(imagepath + "images/" + `e_sign-${req.file.originalname}`, imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, function(err) {
                                    //     if ( err ) console.log('ERROR: ' + err);
                                    // });
                                    //fs.move(imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, imagepath1 + "app.esignaadhaar.com/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function (err) {
                                    // fs.move(imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function (err) {
                                    //     if (err) {
                                    //         console.log("failed to delete local image:" + err);
                                    //     } else {
                                    //         console.log('successfully deleted local image');
                                    //     }
                                    // });

                                    // fs.rename(imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `e_sign-${req.file.originalname}`, imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function(err) {
                                    //     if ( err ) console.log('ERROR: ' + err);
                                    // });
                                    //    await User.update({
                                    //         blobdocument:  fs.readFileSync(
                                    //             imagepath1 + "images/" + req.file.originalname
                                    //       )
                                    //     },{
                                    //         where: { id: userdata.id }
                                    //     })


                                    User.findAll({
                                        where: { id: userdata.parent_admin_id },
                                    })
                                        .then((parent_id_details) => {
                                            // const transporter = nodemailer.createTransport({
                                            //     port: smtp[0].smtp_port,               
                                            //     host: smtp[0].smtp_host,
                                            //     auth: {
                                            //             user: smtp[0].company_email,
                                            //             pass: smtp[0].email_password,
                                            //         },
                                            //     secure: true,
                                            //     })
                                            //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";

                                            //     let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>http://180.149.241.128:3010/#/user/"+userid+"</p>";
                                            // const mailData = {
                                            //     from: smtp[0].company_email, // sender address
                                            //     to: req.body.email, // list of receivers
                                            //     subject: 'Verification Link',
                                            //     //text: 'https://app.esignaadhaar.com/#/user/' + userid
                                            //     html: multilineString
                                            // }
                                            // transporter.sendMail(mailData, function (mailerr, info) {
                                            //     if (mailerr){
                                            //         var dirname = path.join(__dirname, '../../');
                                            //         var filePath = path.join(dirname + '/emaillogs', userdata.id + '.txt');

                                            //         var directoryfilePath = path.join(dirname + '/emaillogs');
                                            //         console.log(directoryfilePath);


                                            //           //console.log('filePath -' ,filePath);
                                            //           var paneltxtentry = 0;

                                            //           fs.readdir(directoryfilePath, function (err1, files) {

                                            //         console.log("filess-", files);

                                            //               //handling error
                                            //               if (err1) {

                                            //               }

                                            //               //console.log('dd',item +'.txt');           
                                            //               //listing all files using forEach
                                            //               files.forEach(function (file) {
                                            //                   // Do whatever you want to do with the file
                                            //                   //console.log('files loop -',file);     

                                            //                   if (file == userdata.id + '.txt') {
                                            //                       // console.log('ifff');
                                            //                       paneltxtentry = 1;
                                            //                       //console.log('paneltxtentry123 -',paneltxtentry);        
                                            //                   }
                                            //               });


                                            //               if (paneltxtentry) {
                                            //                   fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(mailerr) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("Data created");
                                            //                   });

                                            //               } else {

                                            //                   fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(mailerr) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("The file was saved!");
                                            //                   });

                                            //               }

                                            //            })
                                            //         res.send(mailerr)
                                            //     }
                                            //     else {
                                            //         console.log("Mail Sended successfully ", info);
                                            //         var dirname = path.join(__dirname, '../../');
                                            //         var filePath = path.join(dirname + '/emaillogs', userdata.id + '.txt');

                                            //         var directoryfilePath = path.join(dirname + '/emaillogs');
                                            //         console.log(directoryfilePath);


                                            //           //console.log('filePath -' ,filePath);
                                            //           var paneltxtentry = 0;

                                            //           fs.readdir(directoryfilePath, function (err1, files) {

                                            //         console.log("filess-", files);

                                            //               //handling error
                                            //               if (err1) {

                                            //               }

                                            //               //console.log('dd',item +'.txt');           
                                            //               //listing all files using forEach
                                            //               files.forEach(function (file) {
                                            //                   // Do whatever you want to do with the file
                                            //                   //console.log('files loop -',file);     

                                            //                   if (file == userdata.id + '.txt') {
                                            //                       // console.log('ifff');
                                            //                       paneltxtentry = 1;
                                            //                       //console.log('paneltxtentry123 -',paneltxtentry);        
                                            //                   }
                                            //               });


                                            //               if (paneltxtentry) {
                                            //                   fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(info) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("Data created");
                                            //                   });

                                            //               } else {

                                            //                   fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(info) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("The file was saved!");
                                            //                   });

                                            //               }

                                            //            })

                                            //     }
                                            //     // res.send(info, "Mail send successfully.")
                                            // })
                                            if (req.body.roles) {
                                                // Role.findAll({
                                                //     where: {
                                                //         name: {
                                                //             [Op.or]: req.body.roles
                                                //         }
                                                //     }
                                                // }).then(roles => {
                                                //     console.log("roless", req.body.roles);

                                                userdata.setRoles([4]).then(() => {
                                                    res.status(200).send({ message: "Client Added Successfully!", 'user_id': userdata.id, 'otpbased': userdata.otpbased });
                                                });
                                                // })
                                            }

                                            //  console.log("lnewDate",newDate)
                                            // User.update({linkexpires:newDate}, {
                                            //     where: { id: userdata.id }
                                            // })
                                        })
                                    // })
                                })
                                    .catch(err => {
                                        res.status(500).send({ message: err.message });
                                    });
                                // } else {
                                //     res.send({
                                //             message: "Invalid SMTP Details"
                                //     });
                                // }

                            })
                            .catch(err => {
                                res.status(500).send({ message: err.message });
                            });
                        // })
                        // .catch(err => {
                        //     res.status(500).send({ message: err.message });
                        // });

                        // } else {
                        //     res.send({ message: "Insufficient Fund" });
                        // }
                    })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

// Retrieve all Users from the database.

exports.findAll = (req, res) => {
    const parent_admin_id = req.query.parent_admin_id
    var condition = parent_admin_id ? {
        parent_admin_id: {
            [Op.like]: `%${parent_admin_id}%`,
        },
    } :
        null
    User.findAll({
        order: [
            ["id", "DESC"]
        ],
        attributes: {
            exclude: ['password', 'show_password'],
        },
        where: condition,
    })
        .then((data) => {

            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Users.',
            })
        })
}

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id, {
        attributes: {
            exclude: ['password', 'show_password'],
        },
    })
        .then((data) => {
            if (data) {
                res.send({ data: data })
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with id=' + id,
            })
        })
}

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if (req.file) {
        var imagepath = __dirname.replace('controller/admin', '');
        User.update({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            company_email: req.body.company_email,
            company_domain: req.body.company_domain,
            personal_contact: req.body.personal_contact,
            company_contact: req.body.company_contact,
            address: req.body.address,
            package_id: req.body.package_id,
            status: 1,
            adhaar: req.body.adhaar,
            pan: req.body.pan,
            // document: req.file.originalname,
            // data: fs.readFileSync(
            //     imagepath + "images/" + req.file.filename
            // ),
        }, {
            where: { id: id },
        })
            .then(num => {
                if (num == 1) {
                    var imagepath = path.join(__dirname, '../../');
                    var imagepath1 = path.join(__dirname, '../../../../');
                    // fs.move(`${imagepath}/images/e_sign-${req.file.originalname}`, `${imagepath1}/react-frontend/public/images/e_sign-${req.file.originalname}`, function (err) {
                    //     if (err) {
                    //         console.log("failed to delete local image:" + err);
                    //     } else {
                    //         console.log('successfully deleted local image');
                    //     }
                    // });
                    res.send({
                        message: "User was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    } else {
        User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "User was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    }
}


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    User.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'User was deleted successfully!',
                })
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete User with id=' + id,
            })
        })
}

exports.adminstamp = (req, res) => {
    const userid = req.params.id
    Stamp.findAll({
        where: { user_id: userid },
    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Users.',
            })
        })

    // Stamp.belongsTo(User,{
    //     foreignKey: 'user_id',

    // })

    //   Stamp.findAll({
    //     where:{
    //         'user_id': userid
    //     },
    //     include: {
    //         model: User

    //     }
    // })
    // User.findAll({
    //     include: [{
    //       model: Stamp,
    //       through: {
    //         attributes: ['createdAt'],
    //         where: {'user_id':userid}
    //       }
    //     }]
    //   })
    // .then((data1) => {
    //         res.send(data1)
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message || 'Some error occurred while retrieving Users.',
    //         })
    //     })

}

exports.userdata = (req, res) => {
    const userid = req.params.id
    var data = User.hasMany(Stamp, { foreignKey: 'user_id' })

}

exports.Counts = (req, res) => {
    User.findAll({
        where: { "parent_admin_id": req.body.adminid, "sign_status": 1 },
    })
        .then((activeuser) => {

            User.findAll({
                where: { "parent_admin_id": req.body.adminid, "sign_status": 0 }
                //where: {"parent_admin_id":req.body.superadminid, [Op.and]:[{"status":1}, {"expiry_date":{[Op.gte]:myDate}}]}
            })
                .then((inactiveuser) => {
                    User.findAll({
                        where: { "parent_admin_id": req.body.adminid }
                    })
                        .then((alluser) => {
                            res.send({ "alluser": alluser.length, "activeuser": activeuser.length, "inactiveuser": inactiveuser.length })

                        })
                })

            // })
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.fundhistory = (req, res) => {
    Fundhistory.findAll({
        where: { "admin_id": req.body.adminid },
        order: [
            ["id", "DESC"]
        ],
        attributes: ['required_fund', 'fund_added', 'available_fund', 'action', 'createdAt'],
        include: [{
            model: User,
            as: 'userdetails',
            attributes: ['username'],
        }]
    })
        .then((fundhistory) => {
            //console.log("opdata", Op)    
            res.send(fundhistory)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.transictionhistory = (req, res) => {
    Transictionhistory.findAll({
        where: { "admin_id": req.body.adminid },
        order: [
            ["id", "DESC"]
        ],
        attributes: ['sign_charge', 'sign_type', 'fund', 'fundremain', 'createdAt'],
        include: [
            {
                model: User,
                as: 'userdetails',
                attributes: ['id','fullname', 'email', 'personal_contact'],
            },
            {
                model: User,
                as: 'admindetails',
                attributes: ['username'],
            },
            {
                model: Template,
                as: 'templatedetails',
                attributes: ['id','name'],
            }
        ]
    }).then((transictionhistory) => {
            //console.log("opdata", Op)    
            res.send(transictionhistory)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.updateurl = (req, res) => {
    User.update(req.body, {
        where: { id: req.body.id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Url was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Url User with id=" + id
            });
        });
}

exports.saveotp = (req, res) => {
    User.update(req.body, {
        where: { id: req.body.id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Otp was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Otp with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Otp User with id=" + id
            });
        });
}


exports.signeddocument = (req, res) => {

    User.findAll({
        where: { id: req.body.id }
    })
        .then(user => {
            if (user) {

                // User.update({ signeddocument: rq.body.signeddocument }, {
                //     where: { id: req.body.id }
                // })
                User.findAll({
                    where: { id: req.body.id }
                })
                    .then((user) => {
                        console.log("signeddocument Mail userdetails", user[0].parent_admin_id);
                        System.findAll({
                            where: { admin_id: user[0].parent_admin_id },
                        })
                            .then((smtp) => {
                                console.log("signeddocument Mail Send smtpdetails", smtp);
                                // console.log("signeddocument urlllllllll", user[0].signeddocument);
                                const transporter = nodemailer.createTransport({
                                    port: smtp[0].smtp_port,               // true for 465, false for other ports
                                    host: smtp[0].smtp_host,
                                    auth: {
                                        user: smtp[0].company_email,
                                        pass: smtp[0].email_password,
                                    },
                                    secure: true,
                                })


                                let multilineString = "<p>Dear User</p></p>Thank you for choosing E-sing Platform for your valuation services. Please check your Digitaly sign Agreement for Services</p><p>A copy of signed document is attached only for your reference purpose.</p><p>Note:</p><p>This document is not required to be printed for any purpose.</p>";

                                console.log("signeddocument Mail Link url", multilineString);
                                var imagepath1 = path.join(__dirname, '../../../../');
                                const mailData = {
                                    from: smtp[0].company_email, // sender address
                                    to: user[0].email, // list of receivers
                                    subject: 'Signed Document',
                                    html: multilineString,
                                    attachments: [
                                        {
                                            filename: 'document.pdf',
                                            //path: imagepath1 + "app.esignaadhaar.com/signeddocument/" + `${user[0].id}e_sign-${user[0].document}`,
                                            path: imagepath1 + "frontendtest.esignaadhaar.com/public/signeddocument/" + `${user[0].id}e_sign-${user[0].document}`,

                                            cid: 'uniq-document.pdf'
                                        }
                                    ]

                                }
                                transporter.sendMail(mailData, function (err, info) {
                                    if (err)
                                        res.send(err)
                                    else {
                                        console.log("Mail Sended successfully ", info);
                                        res.send({
                                            message: "document was updated successfully."
                                        });
                                    }
                                    //res.send(info, "Mail send successfully.")
                                })

                            })
                    })

            } else {
                res.send({
                    message: `Cannot update document with id=${req.body.id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating document User with id=" + req.body.id
            });
        });
}

exports.kycdocument = (req, res) => {
    User.update(req.body, {
        where: { id: req.body.id }
    })
        .then(num => {
            if (num == 1) {
                console.log("kycmail Mail Send process start");
                User.findAll({
                    where: { id: req.body.admin_id }
                }).then((user) => {
                        console.log("kycmail Mail userdetails", req.body.admin_id);
                        System.findAll({
                            where: { admin_id: req.body.admin_id },
                        })
                            .then((smtp) => {
                                //  console.log("kycmail Mail Send smtpdetails", user[0].email);
                                // const transporter = nodemailer.createTransport({
                                //     port: process.env.SMTP_PORT,               // true for 465, false for other ports
                                //     host: process.env.SMTP_HOST,
                                //     auth: {
                                //         user: process.env.SMTP_USER,
                                //         pass: process.env.SMTP_PASSWORD,
                                //     },
                                //     secure: true,
                                // })
                                // let multilineString = '<a href="' + user[0].kycdocument + '">' + req.body.email + '</a>'
                                // // console.log("signeddocument Mail Link url", multilineString);    
                                // const mailData = {
                                //     from: process.env.SMTP_EMAIL, // sender address
                                //     to: user[0].email, // list of receivers
                                //     subject: 'Kyc Document',
                                //     // text: multilineString
                                //     attachments: [
                                //         {
                                //             filename: 'kycdocument.pdf',
                                //             path: req.body.kycdocument,
                                //             cid: 'uniq-kycdocument.pdf'
                                //         }
                                //     ]

                                // }
                                // transporter.sendMail(mailData, function (err, info) {
                                //     if (err)
                                //         res.send(err)
                                //     else {
                                //         console.log("Mail Sended successfully ", info);
                                res.send({
                                    message: "kYC document was updated successfully."
                                });
                                //     }
                                //     //res.send(info, "Mail send successfully.")
                                // })

                            })
                    })

            } else {
                res.send({
                    message: `Cannot update document with id=${req.body.id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating document User with id=" + req.body.id
            });
        });
}

exports.sendotp = (req, res) => {

    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://sms.pnpuniverse.com/api/v4/?api_key=A43140157104eed42587ed153baad6592&method=sms&message=One%20Time%20Password%20is%20' + req.body.otp + '%20This%20is%20usable%20once%20and%20expire%20in%2010%20minutes.%20Please%20do%20not%20share%20this%20with%20anyone.%20Infotech&to=' + req.body.mobileno + '&sender=OTPPNP',
        headers: {
            'Cookie': 'AWSALB=nydOUbswa/xcwgzsbL24b/VMYVdrlMvLk3OejhM1fQUrDCyEPJ2+huHe81Bgv5S/cCJhPTf1Qo07T5/IpbPz0uTF3kyZ3+p/1wk2GrgEbEeKzWD3YDcZ4qOaa3ot; AWSALBCORS=nydOUbswa/xcwgzsbL24b/VMYVdrlMvLk3OejhM1fQUrDCyEPJ2+huHe81Bgv5S/cCJhPTf1Qo07T5/IpbPz0uTF3kyZ3+p/1wk2GrgEbEeKzWD3YDcZ4qOaa3ot'
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    // var config = {
    //     method: 'get',
    // url: 'https://waapiconnect.com/api/send.php?number=91'+req.body.mobileno+'&type=text&message=Your%20OTP%20is%20--%20'+req.body.otp+'&instance_id=631C466C0AA85&access_token=8450a9bbf4b27a07ba7c82f11605955a',

    //      url: 'http://sms.pnpuniverse.com/api/v4/?api_key=A43140157104eed42587ed153baad6592&method=sms&message=One%20Time%20Password%20is%'+req.body.otp+'%20This%20is%20usable%20once%20and%20expire%20in%2010%20minutes.%20Please%20do%20not%20share%20this%20with%20anyone.%20Infotech&to='+req.body.mobileno+'&sender=OTP-ESIGN',
    //     headers: { }
    // };

    // axios(config)
    // .then(function (response) {
    //     console.log('response rec -',response.data);

    //     res.send(response.data);

    // })
    // .catch(function (error) {
    //     res.send(error);
    // });
}


exports.findOnePackage = (req, res) => {
    const id = req.body.id
    // console.log("findOnePackage", req.body.id)
    CompanyPackages.findAll({
        limit: 1,
        order: [
            ["id", "DESC"]
        ],
        where: { "package_id": req.body.id, "admin_id": req.body.admin_id },
        attributes: ['start_service', 'end_service'],
        include: [{
            model: Packages,
            as: 'packagedetails',
        }]
    })
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Package with id=${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Package with id=' + id,
            })
        })
}

exports.signeddocumentotp = (req, res) => {
    const userid = req.body.id
    User.findAll({
        where: { id: userid },
    })
        .then(async (data) => {
            console.log("signeddocumentotp userdetails, signeddocumentotp userdetails, signeddocumentotp userdetails, signeddocumentotp userdetails", data);
            var imagepath = path.join(__dirname, '../../');
            var imagepath1 = path.join(__dirname, '../../../../');
            // fs.move(imagepath + "images/" + `e_sign-${req.file.originalname}`, imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `e_sign-${req.file.originalname}`, function (err) {
            //console.log("failed to delete local image:" ,data);
            //const doc = await PDFDocument.load(fs.readFileSync(imagepath1 + "app.esignaadhaar.com/images/" + `${data[0].id}e_sign-${data[0].document}`));
            const doc = await PDFDocument.load(fs.readFileSync(imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${data[0].id}e_sign-${data[0].document}`))
            const Helvetica = await doc.embedFont(StandardFonts.Helvetica);
            const pages = doc.getPages()
            pages.map((pages) => {
                return (
                    pages.drawText(`Digitally signed by  ${data[0].fullname}`, {
                        x: 380,
                        y: 53,
                        size: 8,
                        font: Helvetica,
                        color: rgb(0, 0, 0),
                    }),
                    pages.drawText(`Date:  ${moment().format('ll')} `, {
                        x: 380,
                        y: 43,
                        size: 8,
                        font: Helvetica,
                        color: rgb(0, 0, 0),
                    }),
                    pages.drawText('Reason: Agreement', {
                        x: 380,
                        y: 33,
                        size: 8,
                        font: Helvetica,
                        color: rgb(0, 0, 0),
                    }),
                    // pages.drawText(`Verified By Mobile No -${dataClient.personal_contact} and OTP - ${clientOtp} `, {
                    pages.drawText(`Verified By Mobile No -${data[0].alternate_number} and OTP - ${data[0].otp} `, {
                        x: 380,
                        y: 23,
                        size: 8,
                        font: Helvetica,
                        color: rgb(0, 0, 0),
                    })
                )
            })
            //fs.move(imagepath1 + "app.esignaadhaar.com/images/" + `${data[0].id}e_sign-${data[0].document}`, imagepath + "signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, function (err) {
            fs.move(imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${data[0].id}e_sign-${data[0].document}`, imagepath + "signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, function (err) {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted local image');
                }
            });
            //console.log("/var/www/frontendtest.esignaadhaar.com/public/images/e_sign-"+data[0].document)
            var abs = fs.writeFileSync(imagepath + "signeddocument/" + `${data[0].id}e_sign-${data[0].document}`,
                await doc.save({ dataUri: true })
            );

            //fs.move(imagepath + "signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, imagepath1 + "app.esignaadhaar.com/signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, function (err) {
            fs.move(imagepath + "signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, imagepath1 + "frontendtest.esignaadhaar.com/public/signeddocument/" + `${data[0].id}e_sign-${data[0].document}`, function (err) {
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted local image');
                }
            });
            console.log("file write ", abs)
            res.send({
                message: "Esign done successfully."
            })

        })
        .catch((err) => {
            res.status(500).send({
                message: 'Something went wrong.'
            })
        })


}

exports.updatealternatenumber = (req, res) => {
    User.update(req.body, {
        where: { id: req.body.id }
    })
        .then(num => {
            if (num == 1) {

                res.send({
                    message: "Number was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Number with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Number User with id=" + id
            });
        });
}

exports.kycdata = (req, res) => {
    User.findAll({
        where: { id: req.body.id },
    })
        .then((user) => {
            if (user[0].pan == 1 && user[0].adhaar_verify_with_otp == 0) {
                panverify.findAll({
                    where: { user_id: req.body.id },
                })
                    .then((pandata) => {
                        res.send(pandata)
                    })
            } else if (user[0].pan == 0 && user[0].adhaar_verify_with_otp == 1) {
                adhaarverify.findAll({
                    where: { user_id: req.body.id },
                })
                    .then((adhaarata) => {
                        res.send(adhaarata)
                    })
            } else {
                adhaarverify.findAll({
                    where: { user_id: req.body.id },
                })
                    .then((adhaarata) => {
                        panverify.findAll({
                            where: { user_id: req.body.id },
                        })
                            .then((pandata) => {
                                res.send({ "adhaardata": adhaarata, "pandata": pandata })
                                //   res.send(adhaarata)
                            })
                        //  res.send(adhaarata)
                    })
            }

        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Users.',
            })
        })

}
exports.addimage = (req, res) => {
    res.send({ message: 'image  upload successfully' });
}

exports.resendlink = (req, res) => {
    User.findAll({
        where: { id: req.body.id },
    })
        .then((user) => {
            User.findAll({
                where: { id: user[0].parent_admin_id },
            })
                .then((admin) => {
                    System.findAll({
                        where: { admin_id: admin[0].id },
                    })
                        .then((smtp) => {
                            User.update({
                                linkexpires: req.body.linkexpiry
                            }, {
                                where: { id: req.body.id },
                            })
                            Usertemplate.update({ linkexpires: req.body.linkexpiry }, {
                                where: { user_id: req.body.id, template_id: req.body.template_id }
                            }).then(num => {
                                if (num == 1) {
                                    const transporter = nodemailer.createTransport({
                                        port: smtp[0].smtp_port,
                                        host: smtp[0].smtp_host,
                                        auth: {
                                            user: smtp[0].company_email,
                                            pass: smtp[0].email_password,
                                        },
                                        secure: true,
                                    })
                                    var obj = { user_id: user[0].id, admin_id: admin[0].id, template_id: req.body.template_id };
                                    var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                                    sendmailurl = "http://180.149.241.128:7070/#/user/" + userid;
                                    //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";
                                    let multilineString = "<h4>Dear " + user[0].fullname + "</h4><p>Thank you for choosing " + admin[0].username + ", please Click below mention button and Complete the digitally sign Agreement for Services.</p></p><p><a href='"+sendmailurl+"' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 10px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Open Link</a></p>";
                                    const mailData = {
                                        from: smtp[0].company_email, // sender address
                                        to: user[0].email, // list of receivers
                                        subject: 'Verification Link',
                                        //text: 'https://app.esignaadhaar.com/#/user/' + userid
                                        html: multilineString


                                    }
                                    transporter.sendMail(mailData, function (err, info) {
                                        if (err)
                                            res.send(err)
                                        else {
                                            console.log("Mail Sended successfully ", info);
                                            res.send({ message: 'Link Sended successfully' });
                                        }
                                        // res.send(info, "Mail send successfully.")
                                    })
                                } else {
                                    res.send({
                                        message: `Cannot update linkexpiry with id=${id}. Maybe User was not found or req.body is empty!`
                                    });
                                }
                            })
                                .catch(err => {
                                    res.status(500).send({
                                        message: "Error updating User with id=" + id
                                    });
                                });

                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || 'Some error occurred while retrieving Users.',
                            })
                        })
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Users.',
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Users.',
            })
        })

}

exports.sendlink = (req, res) => {
    // User.findAll({
    //         where: { id: req.body.id },
    //     })
    //     .then((user) => {

    User.findAll({
        where: { id: req.body.parent_admin_id },
    }).then((admin) => {
        System.findAll({
            where: { admin_id: admin[0].id },
        }).then((smtp) => {
            Packages.findAll({
                where: { id: admin[0].package_id },
            }).then((pkgdata) => {
                console.log("nilesh", typeof req.body.userids);
                req.body.userids.forEach(element => {
                    User.findAll({
                        where: { id: element },
                    }).then(async (user) => {
                        // var total = 0
                        // var otpsignetotal = 0
                        // var total1 = [];
                        // var psignetotal = 0
                        // var total2 = [];
                        // var asignetotal = 0
                        // var total3 = [];
                        // var apsignetotal = 0
                        // var total4 = [];
                        // if (user[0].otpbased == 1) {
                        //     otpsignetotal = 0
                        //     otpsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //     console.log("otpsignetotal", otpsignetotal)
                        //     total1.push(otpsignetotal);
                        // } else {
                        //     if(user[0].pan == 1 && user[0].adhaar_verify_with_otp == 0) {
                        //         psignetotal = 0
                        //         psignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //         console.log("psignetotal", psignetotal)
                        //         total2.push(psignetotal);
                        //     }else if (user[0].pan == 0 && user[0].adhaar_verify_with_otp == 1) {
                        //         asignetotal = 0
                        //         asignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price))
                        //         console.log("asignetotal", asignetotal)
                        //         total3.push(asignetotal);
                        //     }else if (user[0].pan == 1 && user[0].adhaar_verify_with_otp == 1) {
                        //         apsignetotal = 0
                        //         apsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //         console.log("apsignetotal", apsignetotal)
                        //         total4.push(apsignetotal);
                        //     }
                        // }
                        // total = total1.reduce((a, b) => a + b, 0) + total2.reduce((a, b) => a + b, 0) + total3.reduce((a, b) => a + b, 0) + total4.reduce((a, b) => a + b, 0)
                        // var fundcheck = admin[0].fund - total;

                        const transporter = nodemailer.createTransport({
                            port: smtp[0].smtp_port,
                            host: smtp[0].smtp_host,
                            auth: {
                                user: smtp[0].company_email,
                                pass: smtp[0].email_password,
                            },
                            secure: true,
                        })
                        var obj = { user_id: user[0].id, admin_id: admin[0].id, template_id: req.body.template_id };
                        var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                        sendmailurl = "http://180.149.241.128:7070/#/user/" + userid;
                        //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";
                        let multilineString = "<h4>Dear " + user[0].fullname + "</h4><p>Thank you for choosing " + admin[0].username + ", please Click below mention button and Complete the digitally sign Agreement for Services.</p></p><p><a href='"+sendmailurl+"' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 10px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Open Link</a></p>";
                        const mailData = {
                            from: smtp[0].company_email, // sender address
                            to: user[0].email, // list of receivers
                            subject: 'Verification Link',
                            //text: 'https://app.esignaadhaar.com/#/user/' + userid
                            html: multilineString


                        }
                        await transporter.sendMail(mailData, function (err, info) {
                            if (err)
                                console.log("error in mailsend ", err)
                            else {
                                console.log("Mail Sended successfully ", info);
                                //res.send({message:'Link Sended successfully'});
                            }
                            // res.send(info, "Mail send successfully.")
                        })
                        User.update({ linkexpires: req.body.linkexpires, template_id: req.body.template_id, sign_status: 3, maillink: sendmailurl }, {
                            where: { id: user[0].id }
                        })

                        Usertemplate.create({
                            template_id: req.body.template_id,
                            admin_id: req.body.parent_admin_id,
                            user_id: user[0].id,
                            sign_status: 3,
                            maillink: sendmailurl,
                            linkexpires: req.body.linkexpires
                        })
                    });

                })

                // .catch((err) => {
                //     res.status(500).send({
                //         message: err.message || 'Some error occurred while retrieving Users.',
                //     })
                // })
                // } else {
                res.send({
                    message: "Link Sended successfully"
                });
                // }
                // })
                // .catch(err => {
                //     res.status(500).send({
                //         message: "Error updating User with id=" + id
                //     });
                // });

            })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Users.',
                    })
                })

        })
    })
    // .catch((err) => {
    //     res.status(500).send({
    //         message: err.message || 'Some error occurred while retrieving Users.',
    //     })
    // })

}

exports.clientacctemplate = (req, res) => {
    Usertemplate.findAll({
        where: { "template_id": req.body.template_id },
        order: [
            ["id", "DESC"]
        ],
        attributes: ['template_id', 'client_id' ,  'sign_status', 'linkexpires'],
        include: [{
            model: User,
            as: 'userdata',
        }]
    })
        .then((userdata) => {
            //console.log("opdata", Op)    
            res.send(userdata)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });

}

exports.generat_eesign = (req, res) => {
    Template.findAll({
        where: { "id": req.body.template_id },
    })
        .then((templatedata) => {
            User.findAll({
                where: { "id": req.body.user_id },
            })
                .then((userdata) => {
                    Adhaarsigneotp.findAll({
                        where: { "user_id": req.body.user_id },

                    })
                        .then((aadhaardata) => {
                            //console.log("Adhaarsigneotp" ,Adhaarsigneotp);
                            //console.log("userdata" ,userdata);
                            const axios = require('axios');
                            let data = {
                                "pdf_pre_uploaded": true,
                                "config": {
                                    "auth_mode": "1",
                                    "reason": "Agreement",
                                    "positions": {
                                        "1": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "2": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "3": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "4": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "5": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "6": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "7": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "8": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "9": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "10": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "11": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "12": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "13": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "14": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "15": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "16": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "17": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "18": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "19": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                        "20": [
                                            {
                                                "x": 450,
                                                "y": 13
                                            }
                                        ],
                                    }
                                },

                                "prefill_options": { "full_name": aadhaardata[0].dataValues.full_name, "mobile_number": userdata[0].dataValues.personal_contact, "user_email": userdata[0].dataValues.email }
                            }

                            let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'https://kyc-api.aadhaarkyc.io/api/v1/esign/initialize',
                                headers: {
                                    'Accept': ' */*',
                                    'Content-Type': ' application/json',
                                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MTMyMDQ2MywianRpIjoiMDE2NjgwNzEtYTAwZi00MDEyLTk0YzgtYjZlYTA3NTdiMTA4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnBhbmRwaW5mb3RlY2hAc3VyZXBhc3MuaW8iLCJuYmYiOjE2NjEzMjA0NjMsImV4cCI6MTk3NjY4MDQ2MywidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbIndhbGxldCJdfX0.8VpdEIu_YZQpUqSmm1hHw2Sh3Qor16nk32saNc7Flz4'
                                },
                                data: data
                            };

                            axios.request(config)
                                .then((response) => {
                                    //console.log(JSON.stringify(response.data));

                                    const axios = require('axios');
                                    let data = { "client_id": `${response.data.data.client_id}` };

                                    Adhaarsigne.create({
                                        admin_id: req.body.admin_id,
                                        user_id: req.body.user_id,
                                        client_id: response.data.data.client_id
                                    })
                                    User.update({ client_id: response.data.data.client_id }, {
                                        where: { id: req.body.user_id }
                                    })
                                    Usertemplate.update({ client_id: response.data.data.client_id }, {
                                        where: { user_id: req.body.user_id, template_id: req.body.template_id }
                                    })
                                    let config = {
                                        method: 'post',
                                        maxBodyLength: Infinity,
                                        url: 'https://kyc-api.aadhaarkyc.io/api/v1/esign/get-upload-link',
                                        headers: {
                                            'Accept': ' */*',
                                            'Content-Type': ' application/json',
                                            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MTMyMDQ2MywianRpIjoiMDE2NjgwNzEtYTAwZi00MDEyLTk0YzgtYjZlYTA3NTdiMTA4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnBhbmRwaW5mb3RlY2hAc3VyZXBhc3MuaW8iLCJuYmYiOjE2NjEzMjA0NjMsImV4cCI6MTk3NjY4MDQ2MywidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbIndhbGxldCJdfX0.8VpdEIu_YZQpUqSmm1hHw2Sh3Qor16nk32saNc7Flz4'
                                        },
                                        data: data
                                    };

                                    axios.request(config)
                                        .then((response1) => {
                                            //console.log("Nilesh Nagar", JSON.stringify(response1.data));
                                            var imagepath = path.join(__dirname, '../../');
                                            // console.log("nil nagar", fs.createReadStream(`${imagepath}images/mytempalete.pdf`));
                                            var imagepath1 = path.join(__dirname, '../../../../');
                                            var request = require('request');
                                            var options = {
                                                'method': 'POST',
                                                'url': 'https://surepass-esign.s3.amazonaws.com',
                                                'headers': {
                                                },
                                                formData: {
                                                    'x-amz-signature': response1.data.data.fields['x-amz-signature'],
                                                    'x-amz-date': response1.data.data.fields['x-amz-date'],
                                                    'x-amz-credential': response1.data.data.fields['x-amz-credential'],
                                                    'key': response1.data.data.fields.key,
                                                    'policy': response1.data.data.fields.policy,
                                                    'x-amz-algorithm': response1.data.data.fields['x-amz-algorithm'],
                                                    'file': {
                                                        'value': fs.createReadStream(`${imagepath1}Frontend/public/templates/${templatedata[0].dataValues.name}${req.body.user_id}.pdf`),
                                                        'options': {
                                                            'filename': 'mytempalete.pdf',
                                                            'contentType': null
                                                        }
                                                    }
                                                }
                                            };
                                            request(options, function (error, response123) {
                                                if(error){
                                                    res.status(500).send({
                                                        message: error,
                                                    })
                                                }
                                                res.send({ "esignUrl": response.data.data.url })
                                            });

                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            res.status(500).send({
                                                message: error,
                                            })
                                        });

                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.status(500).send({
                                        message: error,
                                    })
                                });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || 'Some error occurred while retrieving aadhaardata.',
                            })
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving userdata.',
                    })
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving templatedata.',
            })
        });
}

exports.client_id = (req, res) => {
    Adhaarsigne.findAll({
        where: { user_id: req.body.user_id },
    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving data.',
            })
        });

}

exports.AddbulkClient = (req, res) => {
    var uniqkey = app.get("uniqekey");

    var remainingclient = [];
    req.body.userdata.forEach(element1 => {
        User.findAll({
            where: { id: req.body.parent_admin_id },
        }).then((admindata) => {
            Packages.findAll({
                where: { id: admindata[0].package_id },
            })
                .then((pkgdata) => {
                    User.findAll({
                        where: { parent_admin_id: req.body.parent_admin_id, pan: 1, adhaar_sign: 1 },
                    }).then((allclient) => {
                        // console.log("allclientttttttt", allclient
                        var total = 0
                        var otpsignetotal = 0
                        var total1 = [];
                        var psignetotal = 0
                        var total2 = [];
                        var asignetotal = 0
                        var total3 = [];
                        var apsignetotal = 0
                        var total4 = [];
                        allclient.forEach(element => {
                            //console.log("inside lopppp nilesh");

                            if (element.linkexpires != null) {
                                if (new Date(element.linkexpires) > new Date() && element.sign_status == 0) {

                                    //console.log("Bolo Tara rara");
                                    if (element.otpbased == 1) {
                                        otpsignetotal = 0
                                        otpsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                                        console.log("otpsignetotal", otpsignetotal)
                                        total1.push(otpsignetotal);
                                    } else {
                                        if (element.pan == 1 && element.adhaar_verify_with_otp == 0) {
                                            psignetotal = 0
                                            psignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].pan_verify_price))
                                            console.log("psignetotal", psignetotal)
                                            total2.push(psignetotal);
                                        } else if (element.pan == 0 && element.adhaar_verify_with_otp == 1) {
                                            asignetotal = 0
                                            asignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price))
                                            console.log("asignetotal", asignetotal)
                                            total3.push(asignetotal);
                                        } else if (element.pan == 1 && element.adhaar_verify_with_otp == 1) {
                                            apsignetotal = 0
                                            apsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                                            console.log("apsignetotal", apsignetotal)
                                            total4.push(apsignetotal);
                                        }
                                    }
                                }
                            }


                            //total1 += otpsignetotal 
                            // total2 += psignetotal
                            // total3 += asignetotal
                            // total4 += apsignetotal
                        });
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total1arayy', total1.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total1', total1);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total2arayy', total2.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total2', total2);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total3arayy', total3.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total3', total3);
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total4arayy', total4.reduce((a, b) => a + b, 0));
                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total4', total4);
                        total = total1.reduce((a, b) => a + b, 0) + total2.reduce((a, b) => a + b, 0) + total3.reduce((a, b) => a + b, 0) + total4.reduce((a, b) => a + b, 0)

                        // console.log('total value of pending clienttttttttttttttttttttttttttttttttttttttttttttttttttttttt total', total);
                        var fundcheck = admindata[0].fund - total;
                        packagepricetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        // console.log('total value  fundcheck ', fundcheck);
                        // console.log('total value  packagepricetotal ', packagepricetotal);
                        // if (fundcheck >= packagepricetotal) {
                        // Uniqeid.findAll({ 
                        //     where: { imagename: req.file.originalname },
                        // })
                        // .then((unikeid) => {
                        System.findAll({
                            where: { admin_id: req.body.parent_admin_id },
                        })
                            .then((smtp) => {

                                var smtpmail = smtp[0].company_email
                                console.log("databasemail", smtp[0].company_email)
                                console.log("envsemail", smtp[0].company_email)
                                console.log("databaseport", smtp[0].smtp_port)
                                console.log("envport", process.env.SMTP_PORT)
                                console.log("databasehost", smtp[0].smtp_host)
                                console.log("envhost", process.env.SMTP_HOST)
                                console.log("databaseusr", smtp[0].company_email)
                                console.log("envuser", process.env.SMTP_USER)
                                console.log("databasepassword", smtp[0].email_password)
                                console.log("envpassword", process.env.SMTP_PASSWORD)
                                // if (smtpmail.includes("@")) {
                                User.create({
                                    // username: req.body.username,
                                    fullname: element1.fullname,
                                    email: element1.email,
                                    personal_contact: element1.personal_contact,
                                    pan: 1,
                                    adhaar: 1,
                                    adhaar_sign: 1,
                                    // client_stamp: req.body.client_stamp,
                                    // password: bcrypt.hashSync(req.body.password, 8),
                                    parent_admin_id: req.body.parent_admin_id,
                                    // document: req.file.originalname,
                                    // otpbased: req.body.otpbased,
                                    // blobdocument: fs.readFileSync(
                                    //     imagepath + "images/" + 'e_sign-' + req.file.originalname
                                    // ),
                                    adhaar_verify_with_otp: 1,
                                    // sign_status:3
                                    // linkexpires: req.body.linkexpiry

                                }).then((userdata) => {
                                    var obj = { user_id: userdata.id, admin_id: userdata.parent_admin_id };
                                    var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                                    // sendmailurl = "http://180.149.241.128:7070/#/user/" + userid;
                                    // User.update({ maillink: sendmailurl }, {
                                    //     where: { id: userdata.id }
                                    // })
                                    //     .then(num => {
                                    var imagepath = path.join(__dirname, '../../');
                                    var imagepath1 = path.join(__dirname, '../../../../');
                                    var imagepathhh = path.join(__dirname, '../');
                                    // fs.rename(imagepath + "images/" + `e_sign-${req.file.originalname}`, imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, function(err) {
                                    //     if ( err ) console.log('ERROR: ' + err);
                                    // });
                                    //fs.move(imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, imagepath1 + "app.esignaadhaar.com/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function (err) {
                                    // fs.move(imagepath + "images/" + `${userdata.id}e_sign-${req.file.originalname}`, imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function (err) {
                                    //     if (err) {
                                    //         console.log("failed to delete local image:" + err);
                                    //     } else {
                                    //         console.log('successfully deleted local image');
                                    //     }
                                    // });

                                    // fs.rename(imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `e_sign-${req.file.originalname}`, imagepath1 + "frontendtest.esignaadhaar.com/public/images/" + `${userdata.id}e_sign-${req.file.originalname}`, function(err) {
                                    //     if ( err ) console.log('ERROR: ' + err);
                                    // });
                                    //    await User.update({
                                    //         blobdocument:  fs.readFileSync(
                                    //             imagepath1 + "images/" + req.file.originalname
                                    //       )
                                    //     },{
                                    //         where: { id: userdata.id }
                                    //     })


                                    User.findAll({
                                        where: { id: userdata.parent_admin_id },
                                    })
                                        .then((parent_id_details) => {
                                            // const transporter = nodemailer.createTransport({
                                            //     port: smtp[0].smtp_port,               
                                            //     host: smtp[0].smtp_host,
                                            //     auth: {
                                            //             user: smtp[0].company_email,
                                            //             pass: smtp[0].email_password,
                                            //         },
                                            //     secure: true,
                                            //     })
                                            //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";

                                            //     let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>http://180.149.241.128:3010/#/user/"+userid+"</p>";
                                            // const mailData = {
                                            //     from: smtp[0].company_email, // sender address
                                            //     to: req.body.email, // list of receivers
                                            //     subject: 'Verification Link',
                                            //     //text: 'https://app.esignaadhaar.com/#/user/' + userid
                                            //     html: multilineString
                                            // }
                                            // transporter.sendMail(mailData, function (mailerr, info) {
                                            //     if (mailerr){
                                            //         var dirname = path.join(__dirname, '../../');
                                            //         var filePath = path.join(dirname + '/emaillogs', userdata.id + '.txt');

                                            //         var directoryfilePath = path.join(dirname + '/emaillogs');
                                            //         console.log(directoryfilePath);


                                            //           //console.log('filePath -' ,filePath);
                                            //           var paneltxtentry = 0;

                                            //           fs.readdir(directoryfilePath, function (err1, files) {

                                            //         console.log("filess-", files);

                                            //               //handling error
                                            //               if (err1) {

                                            //               }

                                            //               //console.log('dd',item +'.txt');           
                                            //               //listing all files using forEach
                                            //               files.forEach(function (file) {
                                            //                   // Do whatever you want to do with the file
                                            //                   //console.log('files loop -',file);     

                                            //                   if (file == userdata.id + '.txt') {
                                            //                       // console.log('ifff');
                                            //                       paneltxtentry = 1;
                                            //                       //console.log('paneltxtentry123 -',paneltxtentry);        
                                            //                   }
                                            //               });


                                            //               if (paneltxtentry) {
                                            //                   fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(mailerr) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("Data created");
                                            //                   });

                                            //               } else {

                                            //                   fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(mailerr) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("The file was saved!");
                                            //                   });

                                            //               }

                                            //            })
                                            //         res.send(mailerr)
                                            //     }
                                            //     else {
                                            //         console.log("Mail Sended successfully ", info);
                                            //         var dirname = path.join(__dirname, '../../');
                                            //         var filePath = path.join(dirname + '/emaillogs', userdata.id + '.txt');

                                            //         var directoryfilePath = path.join(dirname + '/emaillogs');
                                            //         console.log(directoryfilePath);


                                            //           //console.log('filePath -' ,filePath);
                                            //           var paneltxtentry = 0;

                                            //           fs.readdir(directoryfilePath, function (err1, files) {

                                            //         console.log("filess-", files);

                                            //               //handling error
                                            //               if (err1) {

                                            //               }

                                            //               //console.log('dd',item +'.txt');           
                                            //               //listing all files using forEach
                                            //               files.forEach(function (file) {
                                            //                   // Do whatever you want to do with the file
                                            //                   //console.log('files loop -',file);     

                                            //                   if (file == userdata.id + '.txt') {
                                            //                       // console.log('ifff');
                                            //                       paneltxtentry = 1;
                                            //                       //console.log('paneltxtentry123 -',paneltxtentry);        
                                            //                   }
                                            //               });


                                            //               if (paneltxtentry) {
                                            //                   fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(info) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("Data created");
                                            //                   });

                                            //               } else {

                                            //                   fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(info) + "\n\n", function (err) {
                                            //                       if (err) {
                                            //                           return console.log(err);
                                            //                       }
                                            //                       //console.log("The file was saved!");
                                            //                   });

                                            //               }

                                            //            })

                                            //     }
                                            //     // res.send(info, "Mail send successfully.")
                                            // })
                                            // if (req.body.roles) {
                                            // Role.findAll({
                                            //     where: {
                                            //         name: {
                                            //             [Op.or]: req.body.roles
                                            //         }
                                            //     }
                                            // }).then(roles => {
                                            //     console.log("roless", req.body.roles);

                                            userdata.setRoles([4]).then(() => {
                                                // res.status(200).send({ message: "Client Added Successfully!", 'user_id': userdata.id, 'otpbased': userdata.otpbased });
                                                console.log("Client Added Successfully!", userdata.id);
                                            });
                                            // })
                                            // }

                                            //  console.log("lnewDate",newDate)
                                            // User.update({linkexpires:newDate}, {
                                            //     where: { id: userdata.id }
                                            // })
                                        })
                                    // })
                                })
                                // .catch(err => {
                                //     res.status(500).send({ message: err.message });
                                // });
                                // } else {
                                //     res.send({
                                //             message: "Invalid SMTP Details"
                                //     });
                                // }

                            })
                        // .catch(err => {
                        //     res.status(500).send({ message: err.message });
                        // });
                        // })
                        // .catch(err => {
                        //     res.status(500).send({ message: err.message });
                        // });

                        // } else {
                        //     //res.send({ message: "Insufficient Fund" });
                        //     remainingclient.push(element1.email);
                        //     console.log("Insufficient fund", remainingclient);
                        // }
                    })
                })
            // .catch(err => {
            //     res.status(500).send({ message: err.message });
            // });
        })
        // .catch(err => {
        //     res.status(500).send({ message: err.message });
        // });
    })
    // .catch(err => {
    //     res.status(500).send({ message: err.message });
    // });
    res.status(200).send({ message: "Client Import Successfully!" });
};

exports.bulkmailsend = (req, res) => {
    // User.findAll({
    //         where: { id: req.body.id },
    //     })
    //     .then((user) => {

    User.findAll({
        where: { id: req.body.parent_admin_id },
    })
        .then((admin) => {
            System.findAll({
                where: { admin_id: admin[0].id },
            })
                .then((smtp) => {
                    // console.log("nilesh" , typeof req.body.userids);
                    req.body.emails.forEach(async element => {
                        // User.findAll({
                        //     where: { id: element },
                        // }).then((user) => {
                        console.log("emailids", element)
                        const transporter = nodemailer.createTransport({
                            port: smtp[0].smtp_port,
                            host: smtp[0].smtp_host,
                            auth: {
                                user: smtp[0].company_email,
                                pass: smtp[0].email_password,
                            },
                            secure: true,
                        })
                        // var obj = { user_id: user[0].id, admin_id: admin[0].id };
                        // var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                        //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";
                        let multilineString = "<h4>Dear </h4><p>Thank you for choosing " + admin[0].username + ", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>http://180.149.241.128:7070/#/user/</p>";
                        const mailData = {
                            from: smtp[0].company_email, // sender address
                            to: element, // list of receivers
                            subject: 'Verification Link',
                            //text: 'https://app.esignaadhaar.com/#/user/' + userid
                            html: multilineString


                        }
                        await transporter.sendMail(mailData, function (err, info) {
                            if (err)
                                console.log("error in mailsend ", err)
                            else {
                                console.log("Mail Sended successfully ", info);
                                //res.send({message:'Link Sended successfully'});
                            }
                            // res.send(info, "Mail send successfully.")
                        })
                        // User.update({ linkexpires: req.body.linkexpires, template_id: req.body.template_id }, {
                        //     where: { id: user[0].id }
                        // })
                        // });

                    })

                    // .catch((err) => {
                    //     res.status(500).send({
                    //         message: err.message || 'Some error occurred while retrieving Users.',
                    //     })
                    // })
                    // } else {
                    res.send({
                        message: "Link Sended successfully"
                    });
                    // }
                    // })
                    // .catch(err => {
                    //     res.status(500).send({
                    //         message: "Error updating User with id=" + id
                    //     });
                    // });

                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Users.',
                    })
                })

        })
    // .catch((err) => {
    //     res.status(500).send({
    //         message: err.message || 'Some error occurred while retrieving Users.',
    //     })
    // })

}

exports.user_templates = (req, res) => {
    Usertemplate.findAll({
        where: { user_id: req.body.user_id },
        order: [
            ["id", "DESC"]
        ],
        attributes: [],
        include: [{
            model: Template,
            as: 'templatedata',
            attributes: ['id', 'name']
        }]
    })
        .then((templatedata) => {
            //console.log("opdata", Op)    
            res.send(templatedata)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });

}

exports.Alluserwithtemplate = (req, res) => {
    Usertemplate.findAll({
        order: [
            ["id", "DESC"]
        ],
        attributes: ['template_id', 'client_id', 'sign_status', 'linkexpires', 'maillink', 'generate_sign'],
        include: [{
            model: User,
            as: 'userdata',
        },
        {
            model: Template,
            as: 'templatedata',
            attributes: ['name']
        }
        ]
    }).then((userdata) => {
        //console.log("opdata", Op)    
        res.send(userdata)
    })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });

}

// -test--------------------------------


exports.FindByUserWithTempleteId = (req, res) => {
    // res.send("hello")

    Usertemplate.findAll({
        where: { "template_id": req.body.template_id },
        order: [
            ["id", "DESC"]
        ],
        attributes: ['template_id', 'client_id', 'sign_status', 'linkexpires', 'generate_sign'],
        include: [{
            model: User,
            as: 'userdata',
        },
        {
            model: Template,
            as: 'templatedata',
            attributes: ['name']
        }
    ]
    })
        .then((userdata) => {
            //console.log("opdata", Op)    
            res.send(userdata)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}


// -test--------------------------------

exports.checkusertemplate = (req, res) => {
    Usertemplate.findAll({
        where: { template_id: req.body.template_id },
        attributes: ['user_id'],
    }).then(async (usertemplate) => {
        var userids = [];
        await usertemplate.forEach(element => {
            userids.push(element.user_id)
        });
        const results = await User.findAll({
            where: {
                [Op.and]: [
                    { id: { [Op.notIn]: userids } },
                    { parent_admin_id: { [Op.ne]: 1 } },
                    { id: { [Op.ne]: 1 } }
                ]
            }
        })
        res.send(results)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving packages.',
        })
    });

}

exports.templatesignstatus = (req, res) => {
    Usertemplate.findAll({
        where: { user_id: req.body.user_id, template_id: req.body.template_id },
    }).then((usertemplate) => {
        res.send(usertemplate)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving packages.',
        })
    });

}

exports.generatesignstatus = (req, res) => {
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://kyc-api.aadhaarkyc.io/api/v1/esign/get-signed-document/'+req.body.client_id,
      'headers': {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MTMyMDQ2MywianRpIjoiMDE2NjgwNzEtYTAwZi00MDEyLTk0YzgtYjZlYTA3NTdiMTA4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnBhbmRwaW5mb3RlY2hAc3VyZXBhc3MuaW8iLCJuYmYiOjE2NjEzMjA0NjMsImV4cCI6MTk3NjY4MDQ2MywidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbIndhbGxldCJdfX0.8VpdEIu_YZQpUqSmm1hHw2Sh3Qor16nk32saNc7Flz4'
      }
    };
    request(options, function (error, response) {
      if (error){
      console.log("getsigned document error",error);
      res.send(error);
      }else{
        if(response.statusCode == 200){
            //console.log("getsigned document allresponse if ",response.statusCode);
            Usertemplate.update({ generate_sign: 1 }, {
                where: { client_id:req.body.client_id}
            })
        }else{
            //console.log("getsigned document allresponse else",response.statusCode);
            Usertemplate.update({ generate_sign: 2 }, {
                where: { client_id:req.body.client_id}
            })
        }
        //console.log("getsigned document response",response.data.status_code);
        res.send(response.statusCode);
      }
    });
    
}

exports.bulkresendlink = (req, res) => {
    // User.findAll({
    //         where: { id: req.body.id },
    //     })
    //     .then((user) => {

    User.findAll({
        where: { id: req.body.perent_admin_id },
    }).then((admin) => {
        System.findAll({
            where: { admin_id: admin[0].id },
        }).then((smtp) => {
            Packages.findAll({
                where: { id: admin[0].package_id },
            }).then((pkgdata) => {
                //console.log("nilesh", typeof req.body.userids);
                var usercheck = [];
                req.body.users_array.forEach(element => {
                    User.findAll({
                        where: { id: element.userid },
                    }).then(async (user) => {
                        // var total = 0
                        // var otpsignetotal = 0
                        // var total1 = [];
                        // var psignetotal = 0
                        // var total2 = [];
                        // var asignetotal = 0
                        // var total3 = [];
                        // var apsignetotal = 0
                        // var total4 = [];
                        // if (user[0].otpbased == 1) {
                        //     otpsignetotal = 0
                        //     otpsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //     console.log("otpsignetotal", otpsignetotal)
                        //     total1.push(otpsignetotal);
                        // } else {
                        //     if(user[0].pan == 1 && user[0].adhaar_verify_with_otp == 0) {
                        //         psignetotal = 0
                        //         psignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //         console.log("psignetotal", psignetotal)
                        //         total2.push(psignetotal);
                        //     }else if (user[0].pan == 0 && user[0].adhaar_verify_with_otp == 1) {
                        //         asignetotal = 0
                        //         asignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price))
                        //         console.log("asignetotal", asignetotal)
                        //         total3.push(asignetotal);
                        //     }else if (user[0].pan == 1 && user[0].adhaar_verify_with_otp == 1) {
                        //         apsignetotal = 0
                        //         apsignetotal = parseInt((pkgdata[0].adhar_sign_price)) + parseInt((pkgdata[0].adhar_verify_price)) + parseInt((pkgdata[0].pan_verify_price))
                        //         console.log("apsignetotal", apsignetotal)
                        //         total4.push(apsignetotal);
                        //     }
                        // }
                        // total = total1.reduce((a, b) => a + b, 0) + total2.reduce((a, b) => a + b, 0) + total3.reduce((a, b) => a + b, 0) + total4.reduce((a, b) => a + b, 0)
                        // var fundcheck = admin[0].fund - total;
                        User.update({
                            linkexpires: req.body.linkexpiry
                        }, {
                            where: { id: user[0].id },
                        })
                        Usertemplate.update({ linkexpires: req.body.linkexpiry }, {
                            where: { user_id: user[0].id, template_id: element.template_id }
                        }).then(num => {
                            if (num == 1) {
                                const transporter = nodemailer.createTransport({
                                    port: smtp[0].smtp_port,
                                    host: smtp[0].smtp_host,
                                    auth: {
                                        user: smtp[0].company_email,
                                        pass: smtp[0].email_password,
                                    },
                                    secure: true,
                                })
                                var obj = { user_id: user[0].id, admin_id: admin[0].id, template_id: element.template_id };
                                var userid = Buffer.from(JSON.stringify(obj)).toString('base64');
                                sendmailurl = "http://180.149.241.128:7070/#/user/" + userid;
                                //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>https://app.esignaadhaar.com/#/user/"+userid+"</p>";
                                let multilineString = "<h4>Dear " + user[0].fullname + "</h4><p>Thank you for choosing " + admin[0].username + ", please Click below mention button and Complete the digitally sign Agreement for Services.</p></p><p><a href='"+sendmailurl+"' style='background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 10px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Open Link</a></p>";
                                const mailData = {
                                    from: smtp[0].company_email, // sender address
                                    to: user[0].email, // list of receivers
                                    subject: 'Verification Link',
                                    //text: 'https://app.esignaadhaar.com/#/user/' + userid
                                    html: multilineString


                                }
                                transporter.sendMail(mailData, function (err, info) {
                                    if (err)
                                        console.log(err)
                                    else {
                                        console.log("Mail Sended successfully ", info);
                                        //res.send({ message: 'Link Sended successfully' });
                                    }
                                    // res.send(info, "Mail send successfully.")
                                })
                            } else {
                                console.log( `Cannot update linkexpiry with id=${id}. Maybe User was not found or req.body is empty!`);
                            }
                        })
                            .catch(err => {
                                console.log( "Error updating User with id=" + id);
                                // res.status(500).send({
                                //     message: "Error updating User with id=" + id
                                // });
                            });

                    });

                })

                // .catch((err) => {
                //     res.status(500).send({
                //         message: err.message || 'Some error occurred while retrieving Users.',
                //     })
                // })
                // } else {
                res.send({
                    message: "Link Sended successfully", status:true
                });
                // }
                // })
                // .catch(err => {
                //     res.status(500).send({
                //         message: "Error updating User with id=" + id
                //     });
                // });

            })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Users.',
                    })
                })

        })
    })
    // .catch((err) => {
    //     res.status(500).send({
    //         message: err.message || 'Some error occurred while retrieving Users.',
    //     })
    // })

}