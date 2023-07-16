'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      field: 'Username'
    },
    email: {
      type: DataTypes.STRING,
      field: 'Email'
    },
    password: {
      type: DataTypes.STRING,
      field: 'Password',
    },
    img: {
      type: DataTypes.STRING,
    },
    introduction: {
      type: DataTypes.STRING,
      field: 'Introduction'
    },
    refreshToken: {
      type: DataTypes.STRING,
      field: 'Refresh_Token'
    },
    role: {
      type: DataTypes.NUMBER,
      field: 'Role'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'Created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'Updated_at'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};