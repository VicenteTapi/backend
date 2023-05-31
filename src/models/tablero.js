'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tablero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Partida, {
        foreignKey: 'id'
      });
    }
  }
  Tablero.init({
    ambiente: DataTypes.STRING,
    coordenadas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tablero',
  });
  return Tablero;
};