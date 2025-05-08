module.exports = (sequelize, Sequelize) => {
    const CompanyPackages = sequelize.define("company_packages", {
      superadmin_id: {
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER
      },
      package_id: {
        type: Sequelize.INTEGER
      },
      start_service: {
        type: Sequelize.DATE
      },
      end_service: {
        type: Sequelize.DATE
      },
      signatures: {
        type: Sequelize.STRING
      },
    });
    return CompanyPackages;
  };