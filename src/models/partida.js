'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tienda, {
        foreignKey: 'tiendaId'
      });
      this.hasMany(models.Jugador, {
        foreignKey: 'id'
      });
      this.hasMany(models.Versus, {
        foreignKey: 'id'
      });
    }
  }
  Partida.init({
    ambiente: DataTypes.STRING,
    turno: DataTypes.INTEGER,
    tiendaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partida',
  });
  return Partida;
};