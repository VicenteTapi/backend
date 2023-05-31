'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Minijuego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Versus, {
        foreignKey: 'id'
      });
    }
  }
  Minijuego.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Minijuego',
  });
  return Minijuego;
};