'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /*Populate table here*/
     await queryInterface.bulkInsert('users', [{
       id: 1,
       email: "employee@development.com",
       password_digest: "password", 
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /*Reverts seed*/

     await queryInterface.bulkDelete('users', null, {});
     
  }
};
