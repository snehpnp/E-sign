const db = require('../../models')
const System = db.systems
const User = db.users
const Op = db.Sequelize.Op
var fs = require('fs-extra');
const path = require('path');
var nodemailer = require('nodemailer');

exports.findAll = (req, res) => {
    const id = req.params.id
    System.findAll({
            where: {
                admin_id: id
            },
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Admin System.',
            })
        })
}

// Update a System in the request

exports.update = (req, res) => {
    const id = req.params.id
    console.log("checkingggggggggg request bodyyyyyyyyyyyyyyyyyyyyyyyyyyyy", req.body)
    
    if (req.file){
        System.update({
            company_name:req.body.company_name,
            comapny_sort_name:req.body.company_name,
            //company_logo:req.file.originalname,
            // company_favicon: "fav icon",
            company_email:req.body.company_email,
            company_cc:req.body.company_cc,
            company_bcc:req.body.company_bcc,
            email_password:req.body.email_password,
            smtp_host:req.body.smtp_host,
            smtp_port:req.body.smtp_port,
            admin_id:id
        },{
            where: { admin_id: id },
        })
        .then(num => {
            if (num == 1) {
                var imagepath = path.join(__dirname, '../../');
                var imagepath1 = path.join(__dirname, '../../../../');
              fs.move(`${imagepath}/images/e_sign-${req.file.originalname}`, `${imagepath1}/react-frontend/public/companylogo/e_sign-${req.file.originalname}`, function(err){
                if (err) {
                    console.log("failed to delete local image:" + err);
                } else {
                    console.log('successfully deleted local image');
                }
              });
                res.send({
                    message: "System was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update System with id=${id}. Maybe Company was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Syatem with id=" + id
            });
        });
    }else{
        const transporter = nodemailer.createTransport({
            port: req.body.smtp_port.trim(),               
            host: req.body.smtp_host.trim(),
            auth: {
                    user: req.body.company_email.trim(),
                    pass: req.body.email_password.trim(),
                },
            secure: true,
            })
            let multilineString = "<p>Smtp Verify Successfully</p>";
            //let multilineString = "<h4>Dear "+userdata.fullname+"</h4><p>Thank you for choosing "+ parent_id_details[0].username +", please Click below mention URL and Complete the digitally sign Agreement for Services.</p></p><p>http://180.149.241.128:3010/#/user/"+userid+"</p>";
        const mailData = {
            from: req.body.company_email.trim(), // sender address
            to: req.body.company_email, // list of receivers
            subject: 'Verification Mail',
            //text: 'https://app.esignaadhaar.com/#/user/' + userid
            html: multilineString


        }
        transporter.sendMail(mailData, function (err, info) {
            if (err){
                //res.send(err);
                System.update(req.body, {
                    where: { admin_id: id }
                })
                .then(num => {
                    if (num == 1) {
                        User.update({smtp_status:0}, {
                            where: { id: id }
                        })
                        res.send({
                            message: "Please Check Your Smtp Details."
                        });
                    } else {
                        res.send({
                            message: `Cannot update System with id=${id}. Maybe Company was not found or req.body is empty!`
                        });
                    }
                })  
                
            }
            else {
                console.log("Mail Sended successfully ", info);
                System.update(req.body, {
                    where: { admin_id: id }
                })
                .then(num => {
                    if (num == 1) {
                        User.update({smtp_status:1}, {
                            where: { id: id }
                        })
                        res.send({
                            message: "System was updated successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot update System with id=${id}. Maybe Company was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Syatem with id=" + id
                    });
                });
            }
            // res.send(info, "Mail send successfully.")
        })    
       
        }
}