module. exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "first_name",
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "last_name",
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: Sequelize.STRING,
            allowNull: false,
            field: "password_hash",
        },
        budget: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'created_at',
          },
          updatedAt: {
            type: Sequelize.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
          },
    })
    return User
}