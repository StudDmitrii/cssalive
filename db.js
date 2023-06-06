import Sequilize from 'sequelize';

const db = new Sequilize('cssalive', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})

export default db;