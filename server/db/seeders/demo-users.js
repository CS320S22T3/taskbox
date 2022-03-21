'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /*Populate table here*/
    await queryInterface.bulkInsert('users', [{
      id: 1,
      email: "employee@development.com",
      password_digest: "$2y$10$aBVZQiZG/X3TbduZwdbJaOyBxLpVI/RYWjr5PxGnvinq/6xpXPowa",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /*Reverts seed*/

    await queryInterface.bulkDelete('users', null, {});

  }
};
