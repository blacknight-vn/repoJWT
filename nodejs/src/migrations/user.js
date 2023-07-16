'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        field: 'Username'
      },
      email: {
        type: Sequelize.STRING,
        field: 'Email'
      },
      password: {
        type: Sequelize.STRING,
        field: 'Password'
      },
      img: {
        type: Sequelize.STRING,
        field: 'Img'
      },
      introduction: {
        type: Sequelize.STRING,
        field: 'Introduction'
      },
      refreshToken: {
        type: Sequelize.STRING,
        field: 'Refresh_Token'
      },
      role: {
        type: Sequelize.INTEGER,
        field: 'Role'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'Created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'Updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};