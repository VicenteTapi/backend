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
      this.hasMany(models.Jugador, {
        foreignKey: 'id',
        onDelete: 'CASCADE',  // Esto hará que todos los `Jugadores` asociados sean eliminados cuando se elimina un `User`
      });
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    clave: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    mail: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};