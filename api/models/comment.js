'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            });
            Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
        }
    }

    Comment.init(
        {
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.TIMESTAMP,
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Comment',
            tableName: 'Comments',
        }
    );

    return Comment;
};