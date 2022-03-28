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
    }, {
      id: 2,
      email: "employee2@development.com",
      password_digest: "$2y$10$aBVZQiZG/X3TbduZwdbJaOyBxLpVI/RYWjr5PxGnvinq/6xpXPowa",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('user_information', [{
      id: 1,
      user_id: "Matt1234",
      first_name: "Matthew",
      last_name: 'Jordan',
      position: 'employee',
      date_hired: '3/27/2019',
      is_manager: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      user_id: "Joe1234",
      first_name: "Joe",
      last_name: 'Edwards',
      position: 'employee',
      date_hired: '3/27/2020',
      is_manager: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /*Reverts seed*/
    await queryInterface.bulkDelete('users', null, {});

  }
};
