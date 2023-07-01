'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface) => {
    const clavehash1 = await bcrypt.hash("vicente123", saltRounds);
    const clavehash2 = await bcrypt.hash("pascual123", saltRounds);
    const clavehash3 = await bcrypt.hash("admin123", saltRounds);

    return QueryInterface.bulkInsert('Users', [
      {
        nombre: "Vicente",
        mail:"vicente@uc.cl",
        clave: clavehash1,
        wins: 0,
        isAdmin:false,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        nombre: "pascual",
        mail:"pascual@uc.cl",
        clave: clavehash2,
        wins: 0,
        isAdmin:false,
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        nombre: "admin",
        mail:"admin@admin.cl",
        clave: clavehash3,
        wins: 0,
        isAdmin:false,
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    ]);
  },
  down: (QueryInterface) => QueryInterface.bulkDelete('Users', null, {}),
};

