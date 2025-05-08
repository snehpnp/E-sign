 const db = require('../../models')
const Packages = db.packages
const Op = db.Sequelize.Op

// Retrieve all Package from the database.

exports.AddPackage = (req, res) => {
    // Save User to Database
    var package_val;
    var signature_count1; 
    // console.log("req",req.body);
    //var day = req.body.package_day_month;
     if(req.body.package_day_month == "UNLTD"){
        package_val = "UNLTD";
     }
     else{
        package_val = req.body.package_validity;
     }
    Packages.create({
        name: req.body.name,
        price: req.body.price,
        package_validity: package_val,
        package_day_month:req.body.package_day_month,
        adhar_sign_price: req.body.adhar_sign_price,
        adhar_verify_price: req.body.adhar_verify_price,
        pan_verify_price:req.body.pan_verify_price,
        package_details:req.body.package_details,
        })
        .then(package => {
                res.send({ message: "Package was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAll = (req, res) => {
    
    Packages.findAll({
        where: {}
        })
        .then((data) => {
            
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving packages.',
            })
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Packages.findByPk(id, {
            // attributes: {
            //     exclude: ['password', 'show_password'],
            // },
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

// Update a Package by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Packages.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Package was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Package with id=${id}. Maybe Package was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Package with id=" + id
            });
        });
}

// Delete a Package with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    Packages.destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Package was deleted successfully!',
                })
            } else {
                res.send({
                    message: `Cannot delete Package with id=${id}. Maybe Admin was not found!`,
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Package with id=' + id,
            })
        })
}

