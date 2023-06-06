import { DataTypes } from 'sequelize';
import db from '../db.js';
import Users from './Users.js';

const Reps = db.define('reps',
    {
        rep_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rep_file_old: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rep_file_new: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)
Users.hasMany(Reps);

export default Reps;