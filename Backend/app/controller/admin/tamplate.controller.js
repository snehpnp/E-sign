const db = require('../../models')
const User = db.users
const Packages = db.packages
const Transictionhistory = db.Transictionhistory
const Adhaarverify = db.adhaarverify
const Panverify = db.panverify
const Adhaarsigne = db.adhaarsigne
const Adhaarsigneotp = db.adhaarverifyotp
const Template = db.templates
const Variable = db.variables
const Templatevariables = db.templatevariables
const Additionaldetails = db.additionaldetails
const path = require('path');
var fs = require('fs-extra');
const puppeteer = require('puppeteer');
const pdf = require('html-pdf');
const phantomjs = require('phantomjs-prebuilt');
const handlebars = require('handlebars');
const Entities = require('html-entities').AllHtmlEntities;

exports.addtemplate = (req, res) => {
    const encodedJSON = req.body.variables.toString();
    Template.create({
        name: req.body.name,
        html: req.body.html,
        status: 1
    }).then((template) => {
        var template_id = template.id
        Templatevariables.create({
            template_id: template_id,
            variables: encodedJSON,
        })
        res.status(200).send({message:"success"});
    })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding template.',
            })
        })
}

exports.alltemplate = (req, res) => {
    Template.findAll({
    })
        .then((templates) => {
            res.send(templates)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while getting template.',
            })
        })
}

exports.delete = (req, res) => {
    const id = req.body.id
    Template.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Template was deleted successfully!',
                })
            } else {
                res.send({
                    message: `Cannot delete Template with id=${id}. Maybe Template was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleteing template.',
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.body.id
    Template.findByPk(id, {
    })
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Template with id=${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Template with id=' + id,
            })
        })
}

exports.update = (req, res) => {
    const id = req.body.id
    Template.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Template was updated successfully!',
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleteing template.',
            })
        })
}


// my-code 


exports.createpdf = (req, res) => {
    Template.findAll({
        where: { "id": req.body.template_id },
    })
        .then((data) => {
            Adhaarsigneotp.findAll({
                where: { "user_id": req.body.user_id },

            })
                .then((aadhaardata) => {
                    User.findAll({
                        where: { "id": req.body.user_id },
                    })
                        .then((userdata) => {
                            var imagepath = path.join(__dirname, '../../');
                            var imagepath1 = path.join(__dirname, '../../../../');
                            if (fs.existsSync(imagepath1 + "Frontend/public/templates/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`)) {
                                res.send(`${data[0].dataValues.name}${req.body.user_id}.pdf`);
                            } else {

                                const html = data[0].dataValues.html;
                                //const html = '<html><body><h1>Hello, {{name}}!</h1></body></html>';
                                const template = handlebars.compile(html);

                                // Define the dynamic data
                                const kycdata = {
                                    FULLNAME: aadhaardata[0].dataValues.full_name,
                                    DOB: aadhaardata[0].dataValues.dob,
                                    GENDER: aadhaardata[0].dataValues.gender,
                                    ADDRESS: aadhaardata[0].dataValues.address,
                                    ZIP: aadhaardata[0].dataValues.zip,
                                    EMAIL: userdata[0].dataValues.email,
                                    MOBILE: userdata[0].dataValues.personal_contact,
                                    AADHAAR: aadhaardata[0].dataValues.adhaar_number,
                                    FATHERNAME: aadhaardata[0].dataValues.fathername

                                };

                                // Render the HTML template with the dynamic data
                                const htmlWithDynamicData = template(kycdata);





                                

                                const options = {
                                    phantomPath: phantomjs.path,
                                    phantomArgs: ['--web-security=false', '--load-images=true', '--local-to-remote-url-access=true'],
                                    // Specify font styles here
                                    "font": {
                                        "family": "Arial",
                                        "size": 8,
                                        "weight": 200
                                    },
                                    format: 'A4',
                                    orientation: 'portrait',
                                    border: '1cm',
                                    header: {
                                        height: '1cm',
                                        contents: '<div style="text-align: center;"></div>'
                                    },
                                    footer: {
                                        height: '1cm',
                                        contents: '<div style="text-align: center;"></div>'
                                    },
                                    type: 'pdf'
                                };
                                //  const kycdata = { FULLNAME: 'John Doe'};
                                pdf.create(htmlWithDynamicData, options).toFile(imagepath + "images/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, async (err, res1) => {
                                    if (err) {
                                        console.log(err);
                                        res.send(err);
                                    } else {
                                        console.log(res1);
                                        await fs.move(imagepath + "images/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, imagepath1 + "Frontend/public/templates/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, function (err) {
                                            if (err) {
                                                console.log("failed to delete local image:" + err);
                                            } else {
                                                console.log('successfully deleted local image');
                                            }
                                        });
                                        res.send(`${data[0].dataValues.name}${req.body.user_id}.pdf`);
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || 'Some error occurred while retrieving userdata.',
                            })
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while retrieving Kycdata.',
                    })
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving templatedata.',
            })
        });
}



// my-code 











// exports.createpdf = (req, res) => {
//     Template.findAll({
//         where: { "id": req.body.template_id},
//     })
//     .then((data) => {
//         Adhaarsigneotp.findAll({
//             where: { "user_id": req.body.user_id},

//         })
//         .then((aadhaardata) => {
//             User.findAll({
//                 where: { "id": req.body.user_id},
//             })
//             .then((userdata) => {
//         var imagepath = path.join(__dirname, '../../');
//         var imagepath1 = path.join(__dirname, '../../../../');
//         if (fs.existsSync(imagepath1 + "Frontend/public/templates/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`)) {
//             res.send(`${data[0].dataValues.name}${req.body.user_id}.pdf`);
//         } else {

//          const html = data[0].dataValues.html;
//         //const html = '<html><body><h1>Hello, {{name}}!</h1></body></html>';
//          const template = handlebars.compile(html);

//         // Define the dynamic data
//         const kycdata = {
//             FULLNAME: aadhaardata[0].dataValues.full_name,
//             DOB :aadhaardata[0].dataValues.dob,
//             GENDER:aadhaardata[0].dataValues.gender,
//             ADDRESS:aadhaardata[0].dataValues.address,
//             ZIP:aadhaardata[0].dataValues.zip,
//             EMAIL:userdata[0].dataValues.email,
//             MOBILE:userdata[0].dataValues.personal_contact,
//             AADHAAR:aadhaardata[0].dataValues.adhaar_number,
//             FATHERNAME:aadhaardata[0].dataValues.fathername

//         };

// // Render the HTML template with the dynamic data
// const htmlWithDynamicData = template(kycdata);


//         const options = { phantomPath : phantomjs.path,
// phantomArgs: ['--web-security=false', '--load-images=true', '--local-to-remote-url-access=true'],
// Specify font styles here
// "font": {
//     "family": "Arial",
//     "size": 8,
//     "weight" :200
// },
//             format: 'A4',
//             orientation: 'portrait',
//             border: '1cm',
//             header: {
//               height: '1cm',
//               contents: '<div style="text-align: center;"></div>'
//             },
//             footer: {
//               height: '1cm',
//               contents: '<div style="text-align: center;"></div>'
//             },
//             type: 'pdf'
//          };
//         //  const kycdata = { FULLNAME: 'John Doe'};
//         pdf.create(htmlWithDynamicData, options).toFile(imagepath + "images/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, async (err, res1) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             console.log(res1);
//             await fs.move(imagepath + "images/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, imagepath1 + "Frontend/public/templates/" + `${data[0].dataValues.name}${req.body.user_id}.pdf`, function (err) {
//                     if (err) {
//                         console.log("failed to delete local image:" + err);
//                     } else {
//                         console.log('successfully deleted local image');
//                     }
//                 });
//             res.send(`${data[0].dataValues.name}${req.body.user_id}.pdf`);
//         }
//         });
//       }
//     })
//     .catch((err) => {
//        res.status(500).send({
//            message: err.message || 'Some error occurred while retrieving userdata.',
//        })
//     }); 
//      })
//      .catch((err) => {
//         res.status(500).send({
//             message: err.message || 'Some error occurred while retrieving Kycdata.',
//         })
//      });   
//      })
//     .catch((err) => {
//             res.status(500).send({
//                 message: err.message || 'Some error occurred while retrieving templatedata.',
//             })
//     });
// }


exports.editpdftemplate = (req, res) => {
    const PDFDocument = require('pdfkit');

    Adhaarsigneotp.findAll({
        where: { "user_id": req.body.user_id },

    })
        .then((aadhaardata) => {
            User.findAll({
                where: { "id": req.body.user_id },

            })
                .then((userdata) => {
                    Template.findAll({
                        where: { "id": req.body.template_id },
                    })
                        .then((data) => {
                            const kycdata = {
                                FULLNAME: aadhaardata[0].dataValues.full_name,
                                DOB: aadhaardata[0].dataValues.dob,
                                GENDER: aadhaardata[0].dataValues.gender,
                                ADDRESS: aadhaardata[0].dataValues.address,
                                ZIP: aadhaardata[0].dataValues.zip,
                                EMAIL: userdata[0].dataValues.email,
                                MOBILE: userdata[0].dataValues.personal_contact,
                                AADHAAR: aadhaardata[0].dataValues.adhaar_number,
                                FATHERNAME: aadhaardata[0].dataValues.fathername

                            };
                            var imagepath1 = path.join(__dirname, '../../../../');
                            const pdfDoc = new PDFDocument();
                            pdfDoc.pipe(fs.createWriteStream(imagepath1 + "Frontend/public/templates/" + `${data[0].dataValues.name}.pdf`));
                            pdfDoc.text(kycdata);
                            pdfDoc.end();
                            res.send(`${data[0].dataValues.name}.pdf`);
                        })
                })
        })

}

exports.addvariable = (req, res) => {
    Variable.create({
        label: req.body.label,
        status: 0
    }).then((variable) => {
        res.status(200).send({ message: "success." });
    }).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({
                message: 'Variable already exists'
            })
           
          } else {
            res.status(500).send({
                message: err.message || 'Some error occurred while adding template.',
            })
          }
            
    })
   
  
}

exports.getdata = (req, res) => {
    Templatevariables.findAll({
        where: { template_id: req.body.template_id },
    }).then((variables) => {
        res.send(variables);
    })
}

exports.allvariables = (req, res) => {
    Variable.findAll({
}).then((variables) => {
    res.send(variables);
})
}

exports.add_detailes= (req, res) => {
    for (const [key, value] of Object.entries(req.body.variables)) {
        console.log(`${key}: ${value}`);
      }
      return;
    const dbConfig = require("../../config/db.config.js");
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
    
    const queryInterface = sequelize.getQueryInterface();
    // Check if the column exists before adding it
    const myKeys = Object.keys(req.body);
    myKeys.forEach( async element => {
        console.log("request values",);
        await queryInterface.describeTable('additional_details').then(async attributes => {
            console.log("element",element)
            console.log("attributes.element",attributes.element)
      if (!attributes.element) {
        await queryInterface.addColumn('additional_details', element, {
          type: Sequelize.INTEGER,
          allowNull: true,
        });
          const myRecord = await sequelize.query('SELECT * FROM additional_details WHERE id = ?', {
            replacements: [req.body.user_id],
            type: Sequelize.QueryTypes.SELECT,
          });
          console.log("check myRecord", myRecord)
            if(myRecord){
            //await queryInterface.bulkUpdate('additional_details', { [element]: req.body[element] }, { user_id: req.body.user_id });
            const MyModel = sequelize.define('additional_details', {
                element: {
                    type: DataTypes.INTEGER,
                },
                });
                MyModel.update({ element: req.body[element] }, { where: { user_id: req.body.user_id } });
            }else{
             //await queryInterface.bulkInsert('additional_details', { [element]: req.body[element] });
             const MyModel = sequelize.define('additional_details', {
                element: {
                    type: DataTypes.INTEGER,
                },
                });
                MyModel.create({ element: req.body[element] });
            }
        
      }else{
        const myRecord = await sequelize.query('SELECT * FROM additional_details WHERE id = ?', {
            replacements: [req.body.user_id],
            type: Sequelize.QueryTypes.SELECT,
          });
            if(myRecord){
                //await queryInterface.bulkUpdate('additional_details', { [element]: req.body[element] }, { user_id: req.body.user_id });
                const MyModel = sequelize.define('additional_details', {
                    element: {
                        type: DataTypes.INTEGER,
                    },
                    });
                    MyModel.update({ element: req.body[element] }, { where: { user_id: req.body.user_id } });
            }else{
                //await queryInterface.bulkInsert('additional_details', { [element]: req.body[element] });
                const MyModel = sequelize.define('additional_details', {
                    element: {
                        type: DataTypes.INTEGER,
                    },
                    });
                    MyModel.create({ element: req.body[element] });
            }
      }
    });
  });
  res.status(200).send({ message: "success." });
}