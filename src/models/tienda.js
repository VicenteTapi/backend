'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tienda extends Model {
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
  Tienda.init({
    item: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tienda',
  });
  return Tienda;
};