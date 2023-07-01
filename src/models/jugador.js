'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',  // Esto eliminará un `Jugador` cuando se elimine el `User` asociado
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'partidaId'
      });
      this.hasMany(models.Versus, {
        foreignKey: 'id',
        onDelete: 'CASCADE',  // Esto hará que todos los `Versus` asociados sean eliminados cuando se elimina un `Jugador`
      });
    }
  }
  Jugador.init({
    personaje: DataTypes.STRING,
    posicion: DataTypes.INTEGER,
    monedas: DataTypes.INTEGER,
    estrellas: DataTypes.INTEGER,
    poder1: DataTypes.INTEGER,
    poder2: DataTypes.INTEGER,
    poder3: DataTypes.INTEGER,
    dadoGrande: DataTypes.INTEGER,
    dadoChico: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    partidaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
  });
  return Jugador;
};