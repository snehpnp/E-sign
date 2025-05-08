module.exports = {
    HOST: "localhost",
    USER: "root",
    // PASSWORD: "<y3'{h([d]PPS^5y",
    PASSWORD: "",

    DB: "new_esign_node",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };