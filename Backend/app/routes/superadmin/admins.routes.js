const { authJwt } = require("../../middleware");

const admins = require("../../controller/superadmin/admins.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve all Admins
    app.get("/api/admins", [
            //authJwt.verifyToken,
            //authJwt.isSuperAdmin
        ],
        admins.findAll);


    // Retrieve a single Admin with id
    app.get("/api/admins/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdminOrAdminOrSubAdmin
    ], admins.findOne);

    // Update a Admin with id
    app.put("/api/admins/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.update);

    // Delete a Admin with id
    app.delete("/api/admins/:id", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.delete);

    app.post("/api/counts/", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.Counts);

    app.post("/api/changestatus/", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.activeinactive);

    app.get("/api/fundhistory/", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin 
    ], admins.fundhistory);

    app.get("/api/transictionhistory/", [
         authJwt.verifyToken,
         authJwt.isSuperAdmin
       ],admins.transictionhistory);
    
    app.post("/api/makeinactive/", [
        //authJwt.verifyToken,
        //authJwt.isSuperAdmin
    ], admins.inactiveexpiredcompany);
    
    app.post("/api/activecompany", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.activeuserlist);

    app.post("/api/expirecompany", [
        authJwt.verifyToken,
        authJwt.isSuperAdmin
    ], admins.expireduserlist);

    app.post("/api/single/transictionhistory/", [
        //authJwt.verifyToken,
        //authJwt.isSuperAdmin
      ],admins.singletransictionhistory);

    app.post("/api/packagewise/list/", [
        //authJwt.verifyToken,
        //authJwt.isSuperAdmin
      ],admins.adminwithpackage);
      
    app.get("/api/packageupdate/history/", [
        //authJwt.verifyToken,
        //authJwt.isSuperAdmin
      ],admins.packageupdatehistory);  

};