import Sequelize, { Model } from "sequelize";
import db from "../config/db_config";

interface TodoAttributes {
    id: string,
    title: string,
    completed: boolean,
    createdAt: string,
    updatedAt: string
};

export class TodoInstance extends Model<TodoAttributes> {};

TodoInstance.init(
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: 'todos',
        timestamps: false
    }
);