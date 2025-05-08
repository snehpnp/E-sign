const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log("err", err)
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
isSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Super Admin Role!"
            });
            return;
        });
    });
};
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};
isSubAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "subadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require SubAdmin Role!"
            });
        });
    });
};
isSuperAdminOrAdminOrSubAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "subadmin") {
                    next();
                    return;
                }
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
                if (roles[i].name === "superadmin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require SuperAdmin or Admin or SubAdmin Role!"
            });
        });
    });
};
const authJwt = {
    verifyToken: verifyToken,
    isSuperAdmin: isSuperAdmin,
    isAdmin: isAdmin,
    isSubAdmin: isSubAdmin,
    isSuperAdminOrAdminOrSubAdmin: isSuperAdminOrAdminOrSubAdmin
};
module.exports = authJwt;