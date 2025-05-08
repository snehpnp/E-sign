const db = require('../../models')
const User = db.users
const Stamp = db.Stamp
const Packages = db.packages
const Companypackage = db.company_packages
const Fundhistory = db.Fundhistory
const Transictionhistory = db.Transictionhistory
const Op = db.Sequelize.Op

// Retrieve all Admins from the database.

exports.findAll = (req, res) => {
    const parent_admin_id = req.query.parent_admin_id
    User.findAll({
        order:[
            ["id","DESC"]
        ],
            attributes: {
                exclude: ['password', 'show_password'],
            },
            where: {parent_admin_id:parent_admin_id},
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving admins.',
            })
        })
}

// Find a single Admin with an id

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id, {
            attributes: {
                exclude: ['password', 'show_password'],
            },
        })
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Company with id=${id}.`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Company with id=' + id,
            })
        })
}

// Update a Admin by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;
    User.findByPk(id, {
    })
  .then((userdata) => {
    User.update(req.body, {
            where: { id: id }
        })
        .then(num => {
                //console.log("requestdata",req.body.add_fund)
                if (req.body.add_fund > 0){
                    var newfund = parseInt(userdata.fund) + parseInt(req.body.add_fund)
                    console.log("req.body.add_fund",req.body.add_fund)
                    Fundhistory.create({
                        admin_id: userdata.id,
                        required_fund:userdata.fund,
                        fund_added: req.body.add_fund,
                        available_fund:newfund,
                        action: "update"
                    })
                    console.log("newfund",newfund)
                    User.update({fund:newfund}, {
                        where: { id:id }
                    })

                }
            if (req.body.package_id != 0){
                Packages.findByPk(req.body.package_id, {
                     })
                .then((packages) => {
                    //console.log("packagesdata", packages.package_validity)
                    console.log("package_validity_datatype", typeof parseInt(packages.package_day_month))
                    if(packages.package_day_month == "Day") {
                      var startdate = userdata.expiry_date
                      var enddate = new Date();
                    //   enddate.setDate(enddate.getDate() +  1)
                    //   if(enddate >= new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(enddate < new Date()){
                        startdate = new Date()
                    //   }
                      enddate.setDate(enddate.getDate() +  parseInt(packages.package_validity))
                      Companypackage.create({
                        admin_id:id,
                        package_id:req.body.package_id,
                        start_service:startdate,
                        end_service:enddate
                    })
                    User.update({expiry_date:enddate, start_date:startdate},{
                        where: { id: id },
                        })
                    }else if(packages.package_day_month == "Month"){
                        var startdate;
                        var user_exist_expiry = userdata.expiry_date
                        var enddate = new Date()
                       //console.log("enddatedattype", typeof enddate)
                       //console.log("enddatebefore", enddate)
                       //enddate.setDate(enddate.getDate() +  1)
                       //console.log("enddateafter", enddate)
                    //    if(enddate >= new Date()){
                    //      startdate = user_exist_expiry.setDate(user_exist_expiry.getDate() +  1)
                    //      //console.log("startdateif", startdate)
                    //    }else if(enddate < new Date()){
                         startdate = new Date()
                         //console.log("startdateelse_if", startdate)
                    //    }
                       enddate.setMonth(enddate.getMonth() + parseInt(packages.package_validity))
                       //startdate.setMonth(startdate.getMonth() + parseInt(packages.package_validity))
                       //console.log("enddatefinal", enddate)
                       Companypackage.create({
                        admin_id:id,
                        package_id:req.body.package_id,
                        start_service:startdate,
                        end_service:enddate
                    })
                    User.update({expiry_date:enddate, start_date:startdate},{
                        where: { id: id },
                        })
                    }else if(packages.package_day_month == "Year"){
                      var startdate = userdata.expiry_date
                      var enddate = new Date()
                      enddate.setDate(enddate.getDate() +  1)
                    //   if(enddate >= new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(enddate < new Date()){
                        startdate = new Date()
                    //   }
                      enddate.setFullYear(enddate.getFullYear() +  parseInt(packages.package_validity))
                      Companypackage.create({
                        admin_id:id,
                        package_id:req.body.package_id,
                        start_service:startdate,
                        end_service:enddate
                    })
                    User.update({expiry_date:enddate, start_date:startdate},{
                        where: { id:id },
                        })
                    }else{
                      var startdate = userdata.expiry_date
                      var enddate = new Date()
                      enddate.setDate(enddate.getDate() +  1)
                    //   if(enddate >= new Date()){
                    //     startdate.setDate(startdate.getDate() +  1)
                    //   }else if(enddate < new Date()){
                        startdate = new Date()
                    //   }
                      enddate.setFullYear(enddate.getFullYear() +  parseInt(packages.package_validity))
                      Companypackage.create({
                        admin_id:id,
                        package_id:req.body.package_id,
                        start_service:startdate,
                        end_service:enddate
                    })
                    User.update({expiry_date:enddate, start_date:startdate},{
                        where: { id:id },
                        })
                    }
                 
                })
               }
               if(req.body.expiry_date != userdata.expiry){
                //var startdate;
                //var user_exist_expiry = userdata.expiry_date
                // if(userdata.expiry_date >= new Date()){
                //     startdate = user_exist_expiry.setDate(user_exist_expiry.getDate() +  1)
                //   }else if(userdata.expiry_date < new Date()){
                //     startdate = new Date()
                //   }
                User.update({expiry_date:req.body.expiry_date},{
                    where: { id:id },
                    })
               }   
            if (num == 1) {
                Stamp.findAll({
                    where: {user_id:req.params.id},
                })
                .then((data) => {
                    if (req.body.e_stamp) {
                        // console.log("exixtdata",data)
                        let remain =[];
                        let exist_data = [];
                        if(data){
                        data.forEach(element => {
                            exist_data.push(element.stamp);
                            if(!req.body.e_stamp.includes(element.stamp)){
                              remain.push(element.stamp); 
                              console.log("ssss",element.stamp)
                            }
                        });
                        if(remain){
                            remain.forEach(stampelement => {
                                console.log("stampelement", stampelement)
                                Stamp.destroy({
                                    where: { user_id:req.params.id,stamp: stampelement },
                                })
                            }); 
                        }
                    }
                        add_data =[];
                        //console.log("requestdata", req.body.e_stamp);
                        //console.log("data exist ", data);
                        req.body.e_stamp.forEach(element => {
                            if(!exist_data.includes(element)){
                                add_data.push(element); 
                              console.log("ssss",element)
                            }
                        });
                        if(add_data){
                            add_data.forEach(element => {
                                Stamp.create({
                                    stamp: element,
                                    user_id: req.params.id
                                })
                            }); 
                        }


                    }
                   //console.log("stampdata",data)
                })
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
      })
}

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    User.destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Company was deleted successfully!',
                })
            } else {
                res.send({
                    message: `Cannot delete Company with id=${id}. Maybe Company was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Company with id=' + id,
            })
        })
}

exports.Counts = (req, res) => {
    User.findAll({
        where: {"parent_admin_id":req.body.superadminid},
        })
        .then((company) => {
                // Prices.findAll({
                //     where: {}
                //     })  
                // .then((price) => 
                var currentdate = new Date();
                let myDate = (currentdate.getUTCFullYear()) + "-" + (currentdate.getMonth() + 1)+ "-" + (currentdate.getUTCDate());
                      User.findAll({
                         where: {"parent_admin_id":req.body.superadminid, "status":1, "expiry_date":{[Op.gte]:myDate}}
                         //where: {"parent_admin_id":req.body.superadminid, [Op.and]:[{"status":1}, {"expiry_date":{[Op.gte]:myDate}}]}
                         })
                         .then((activecompany) => { 
                                Packages.findAll({
                                 where: {}
                                })
                                .then((packages) => {
                                    var currentdate = new Date();
                                    let myDate = (currentdate.getUTCFullYear()) + "-" + (currentdate.getMonth() + 1)+ "-" + (currentdate.getUTCDate());
                                    console.log("dateonly", myDate)
                                    User.findAll({
                                        where: {"parent_admin_id":req.body.superadminid, [Op.or]:[{ "status":0}, {"expiry_date":{[Op.lt]:myDate}}]}
                                        })
                                       .then((inactivecompany) => {
                                        res.send({"companycount":company.length, "packagecount":packages.length, "activecompany":activecompany.length, "inactivecompany":inactivecompany.length})
                                    })
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

exports.activeinactive = (req, res) => {
    User.update({ status:req.body.status},{
        where: {"id":req.body.admin_id},
        })
        .then((company) => {    
            res.send({
                message: "Status was updated successfully."
            })                      
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.fundhistory = (req, res) => {
    Fundhistory.findAll({
        attributes:['required_fund', 'fund_added', 'available_fund', 'action', 'createdAt'],
        include: [{
            model:User,
            as:'userdetails',
            attributes:['username', 'company_email', 'company_contact'],
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
        order:[
            ["id","DESC"]
        ],
        attributes:['sign_charge', 'sign_type', 'fund', 'fundremain', 'createdAt'],
        include: [
          {
            model:User,
            as:'userdetails',
            attributes:['fullname'],
          },
          {
            model:User,
            as:'admindetails',
            attributes:['username'],
          }
    ]
        })
        .then((transictionhistory) => {
            //console.log("opdata", Op)    
            res.send(transictionhistory)                      
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.inactiveexpiredcompany = (req, res) => {
    User.findAll({
        order:[
            ["id","DESC"]
        ],
        attributes:['expiry_date'],
        where: {"id":req.body.admin_id},
        })
        .then((company) => {
            //console.log("currentdate",new Date());
            //console.log("companydataaa",expirydate);
         if(company){    
           if(company[0].expiry_date < new Date()){   
              User.update({ status:0},{
                where: {"id":req.body.admin_id},
                })
                .then((company) => {    
                    res.send({
                        message: "Status was updated successfully."
                })                      
            })
          }
         }else{
         res.send({
            message: "User is not expire"
         })
        }                    
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.activeuserlist = (req, res) => {
    var currentdate = new Date();
    let myDate = (currentdate.getUTCFullYear()) + "-" + (currentdate.getMonth() + 1)+ "-" + (currentdate.getUTCDate());
     User.findAll({
        order:[
            ["id","DESC"]
        ], 
        where: {"parent_admin_id":req.body.superadminid, "status":1, "expiry_date":{[Op.gte]:myDate}}
        })
        .then((activecompany) => {
            res.send(activecompany)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.expireduserlist = (req, res) => {
    var currentdate = new Date();
    let myDate = (currentdate.getUTCFullYear()) + "-" + (currentdate.getMonth() + 1)+ "-" + (currentdate.getUTCDate());
     User.findAll({
        order:[
            ["id","DESC"]
        ],
       where: {"parent_admin_id":req.body.superadminid, "expiry_date":{[Op.lt]:myDate}}
       })
        .then((expirecompany) => {
            res.send(expirecompany)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.singletransictionhistory = (req, res) => {
    Transictionhistory.findAll({
        order:[
            ["id","DESC"]
        ],
        where:{"admin_id":req.body.adminid},
        attributes:['sign_charge', 'sign_type', 'fund', 'fundremain', 'createdAt'],
        include: [
          {
            model:User,
            as:'userdetails',
            attributes:['fullname'],
          },
          {
            model:User,
            as:'admindetails',
            attributes:['username'],
          }
        ]
        })
        .then((transictionhistory) => {
            //console.log("opdata", Op)    
            res.send(transictionhistory)                      
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.adminwithpackage = (req, res) => {
    const package_id = req.body.package_id
    User.findAll({
        order:[
            ["id","DESC"]
        ],
            attributes: {
                exclude: ['password', 'show_password'],
            },
            where: {package_id:package_id},
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving admins.',
            })
        })
}

exports.packageupdatehistory = (req, res) => {
    Companypackage.findAll({
        order:[
            ["id","DESC"]
        ],
        attributes:['admin_id','start_service', 'end_service', 'updatedAt'],
        include: [
          {
            model:Packages,
            as:'packagedetails',
            attributes:['name'],
          },
          {
            model:User,
            as:'admindata',
            attributes:['username'],
          }
    ]
        })
        .then((packageupdatehistory) => {
            //console.log("opdata", Op)    
            res.send(packageupdatehistory)                      
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}