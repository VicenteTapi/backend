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
        foreignKey: 'jugadorId',
        onDelete: 'CASCADE'  // Esto eliminará un `Versus` cuando se elimine el `Jugador` asociado
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'partidaId'
      });
    }
  }
  Versus.init({
    jugadorId: DataTypes.INTEGER,
    partidaId: DataTypes.INTEGER,
    minijuego: DataTypes.INTEGER,
    jugo: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Versus',
  });
  return Versus;
};