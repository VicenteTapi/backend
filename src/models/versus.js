'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Versus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Jugador, {
        foreignKey: 'jugadorId'
      });
      this.belongsTo(models.Minijuego, {
        foreignKey: 'minijuegoId'
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'partidaId'
      });
    }
  }
  Versus.init({
    jugadorId: DataTypes.INTEGER,
    minijuegoId: DataTypes.INTEGER,
    partidaId: DataTypes.INTEGER,
    jugo: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Versus',
  });
  return Versus;
};