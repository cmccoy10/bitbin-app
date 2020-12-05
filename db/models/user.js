'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    avatarUrl: {
      type: DataTypes.STRING
    },
    trashBinId: {
      type: DataTypes.INTEGER,
    },
    personalFolderId: {
      type: DataTypes.INTEGER,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Folder, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true,
    })

    User.hasMany(models.SharedFolder, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
    })
  }

  User.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
