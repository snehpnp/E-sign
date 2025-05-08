const express = require("express");
const cors = require("cors");
const path = require('path');
var bodyParser = require('body-parser')
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const app = express();
// const cookieParser = require('cookie-parser')
// app.use(express.json())
// app.use(cookieParser())
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({
    limit: '10mb', extended: true
  }));


const db = require("./app/models");
const Role = db.roles;
db.sequelize.sync();
db.sequelize.sync({ force: false, alter: true }).then(() => {
    console.log("Drop and re-sync db.");
    //initial();
});


function initial() {
    Role.create({
        id: 1,
        name: "superadmin"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    Role.create({
        id: 3,
        name: "subadmin"
    });
    Role.create({
        id: 4,
        name: "user"
    });
}
// simple route
app.get("/welcome", (req, res) => {
    res.json({ message: "Welcome to e-sign application." });
    console.log("welcome");
});


// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/superadmin/admins.routes')(app);
require('./app/routes/superadmin/package.routes')(app);
require('./app/routes/admin/users.routes')(app);
require('./app/routes/admin/system.routes')(app);
require('./app/routes/admin/transiction.routes')(app);
require('./app/routes/admin/templates.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3040 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});