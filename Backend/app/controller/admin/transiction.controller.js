const db = require('../../models')
const User = db.users
const Packages = db.packages
const Transictionhistory = db.Transictionhistory
const Adhaarverify = db.adhaarverify
const Panverify = db.panverify
const Adhaarsigne = db.adhaarsigne
const Adhaarsigneotp = db.adhaarverifyotp
const Usertemplate = db.usertemplate
const Template = db.templates
const path = require('path');
var fs = require('fs-extra');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
exports.transictionhistory = (req, res) => {
    //console.log("request body transaction", req.body)
    const admin_id = req.body.parent_admin_id
    const user_id = req.body.user_id
    const template_id = req.body.template_id
    var dirname = path.join(__dirname, '../../');
    var filePath = path.join(dirname + '/logfiles', req.body.user_id + '.txt');

    var directoryfilePath = path.join(dirname + '/logfiles');
    console.log(directoryfilePath);


    //console.log('filePath -' ,filePath);
    var paneltxtentry = 0;

    fs.readdir(directoryfilePath, function (err1, files) {

        console.log("filess-", files);

        //handling error
        if (err1) {

        }

        //console.log('dd',item +'.txt');           
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            //console.log('files loop -',file);     

            if (file == req.body.user_id + '.txt') {
                // console.log('ifff');
                paneltxtentry = 1;
                //console.log('paneltxtentry123 -',paneltxtentry);        
            }
        });
        //console.log('paneltxt outside -',paneltxtentry);





        //   var signalsreq = req.rawBody.split("@@@@@");
        //   var signal_req = Buffer.from(JSON.stringify(signalsreq)).toString('base64');


        if (paneltxtentry) {
            fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(req.body) + "\n\n", function (err) {
                if (err) {
                    return console.log(err);
                }
                //console.log("Data created");
            });

        } else {

            fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - " + JSON.stringify(req.body) + "\n\n", function (err) {
                if (err) {
                    return console.log(err);
                }
                //console.log("The file was saved!");
            });

        }

    })

    //const user_id = req.body.user_id
    User.findByPk(admin_id, {
        attributes: {
            exclude: ['password', 'show_password'],
        },
    })
        .then((admindata) => {
            //console.log("admindataa",admindata);
            //console.log("admindata_package_id",admindata.package_id);
            Packages.findAll({
                where: { id: admindata.package_id },
            })
                .then((package) => {
                    if (req.body.sign_type == "aadhaar_sign") {
                        if (parseInt(admindata.fund) >= parseInt(package[0].adhar_sign_price)) {
                            var fundremaining = parseInt(admindata.fund) - parseInt(package[0].adhar_sign_price)

                            var signcharge = package[0].adhar_sign_price
                            //   Adhaarsigne.create({
                            //     admin_id: admin_id,
                            //     user_id: user_id,
                            //     client_id:req.body.client_id
                            // }) 

                            Transictionhistory.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                package_id: admindata.package_id,
                                sign_charge: signcharge,
                                sign_type: req.body.sign_type,
                                fund: admindata.fund,
                                fundremain: fundremaining,
                                template_id:template_id

                            })
                           // console.log("hekki", user_id);

                            User.update({ adhaar_sign: 2, sign_status: 1 }, {
                                where: { id: user_id }
                            })

                            User.update({ fund: fundremaining }, {
                                where: { id: admin_id }
                            })

                            //console.log("request body transaction", req.body)
                            Usertemplate.update({sign_status: 1}, {
                                where: { user_id: user_id, template_id:template_id }
                            })
                        } else {
                            //console.log("fundcheckconsolelogsign")
                            return res.send({
                                message: "Insufficient Fund."
                            });
                        }

                    } else if (req.body.sign_type == "aadhar_verify") {
                        console.log("adminfundvalue", admindata.fund)
                        if (parseInt(admindata.fund) >= parseInt(package[0].adhar_verify_price)) {
                            var fundremaining = parseInt(admindata.fund) - parseInt(package[0].adhar_verify_price)
                            var signcharge = package[0].adhar_verify_price
                            console.log("signaturedata", req.body.aadhar_number);
                            Adhaarverify.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                client_id: req.body.client_id,
                                age_rang: req.body.age_range,
                                gender: req.body.gender,
                                adhaar_number: req.body.aadhaar_number,
                                state: req.body.state,
                                mobile_last_digit: req.body.last_digits

                            })

                            Transictionhistory.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                package_id: admindata.package_id,
                                sign_charge: signcharge,
                                sign_type: req.body.sign_type,
                                fund: admindata.fund,
                                fundremain: fundremaining,
                                template_id:template_id

                            })
                            User.update({ adhaar: 2, aadhaar_status: 1 }, {
                                where: { id: user_id }
                            })
                            User.update({ fund: fundremaining }, {
                                where: { id: admin_id }
                            })
                        } else {
                            console.log("fundcheckconsolelogadharverify")
                            return res.send({
                                message: "Insufficient Fund."
                            });

                        }
                    } else if (req.body.sign_type == "aadhar_verify_with_otp") {
                        if (parseInt(admindata.fund) >= parseInt(package[0].adhar_verify_price)) {
                            var fundremaining = parseInt(admindata.fund) - parseInt(package[0].adhar_verify_price)
                            var signcharge = package[0].adhar_verify_price
                            console.log("signaturedata", req.body.aadhar_number);
                            Adhaarsigneotp.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                client_id: req.body.client_id,
                                full_name: req.body.full_name,
                                dob: req.body.dob,
                                gender: req.body.gender,
                                adhaar_number: req.body.aadhaar_number,
                                address: req.body.loc + " " + req.body.dist + " " + req.body.state + " " + req.body.country,
                                zip: req.body.zip,
                                fathername: req.body.care_of,
                                reference_id: req.body.reference_id

                            })

                            Transictionhistory.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                package_id: admindata.package_id,
                                sign_charge: signcharge,
                                sign_type: req.body.sign_type,
                                fund: admindata.fund,
                                fundremain: fundremaining,
                                template_id:template_id

                            })
                            User.update({ adhaar_verify_with_otp: 2, aadhaar_status: 1 }, {
                                where: { id: user_id }
                            })
                            User.update({ fund: fundremaining }, {
                                where: { id: admin_id }
                            })
                        } else {
                            console.log("fundcheckconsolelogadharverify")
                            return res.send({
                                message: "Insufficient Fund."
                            });

                        }
                    } else {
                        if (parseInt(admindata.fund) >= parseInt(package[0].pan_verify_price)) {
                            var fundremaining = parseInt(admindata.fund) - parseInt(package[0].pan_verify_price)
                            var signcharge = package[0].pan_verify_price
                            Panverify.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                client_id: req.body.client_id,
                                pan_number: req.body.pan_number,
                                full_name: req.body.full_name,
                                category: req.body.category

                            })

                            Transictionhistory.create({
                                admin_id: admin_id,
                                user_id: user_id,
                                package_id: admindata.package_id,
                                sign_charge: signcharge,
                                sign_type: req.body.sign_type,
                                fund: admindata.fund,
                                fundremain: fundremaining,
                                template_id:template_id

                            })
                            User.update({ pan: 2, pan_status: 1 }, {
                                where: { id: user_id }
                            })
                            User.update({ fund: fundremaining }, {
                                where: { id: admin_id }
                            })
                        } else {
                            console.log("fundcheckconsolelogpan")
                            return res.send({
                                message: "Insufficient Fund."
                            });

                        }
                    }
                })
                .then(() => {
                    res.status(200).send({ message: "success." });
                })
        })
        .catch((err) => {
            var filePath = path.join(__dirname + '/logfiles', req.body.user_id + '.txt');
            var directoryfilePath = path.join(__dirname + '/logfiles');

            //console.log('filePath -' ,filePath);
            var paneltxtentry = 0;

            fs.readdir(directoryfilePath, function (err1, files) {

                //console.log('filesss  -',files);
                //handling error
                if (err1) {

                }

                //console.log('dd',item +'.txt');           
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    //console.log('files loop -',file);     

                    if (file == req.body.user_id + '.txt') {
                        // console.log('ifff');
                        paneltxtentry = 1;
                        //console.log('paneltxtentry123 -',paneltxtentry);        
                    }
                });
                //console.log('paneltxt outside -',paneltxtentry);





                //   var signalsreq = req.rawBody.split("@@@@@");
                //   var signal_req = Buffer.from(JSON.stringify(signalsreq)).toString('base64');


                if (paneltxtentry) {
                    fs.appendFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ -Catch Error " + JSON.stringify(err) + "\n\n", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        //console.log("Data created");
                    });

                } else {

                    fs.writeFile(filePath, "-------------------------------------------------------------------------------------------------------------------------------- \n\ - Catch Error" + JSON.stringify(err) + "\n\n", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        //console.log("The file was saved!");
                    });

                }

            })
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving admins.',
            })
        })
}

function greeting(res,name) {
    res.send(`Hello, ${name}!`);
}

function processUserInput(callback,req,res) {
    var name = req.body.name; 
        callback(res,name);
  }

exports.checkcallback = (req, res) => {
    processUserInput(greeting,req,res);
  }