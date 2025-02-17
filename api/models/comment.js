'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            // Each comment belongs to a post
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            });

            // Each comment belongs to a user
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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );

    return Comment;
};
