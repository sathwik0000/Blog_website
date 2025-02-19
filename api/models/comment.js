'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            // A comment belongs to a post
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE'
            });

        }
    }
    Comment.init({
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Comment',
        timestamps: true
    });

    return Comment;
};
