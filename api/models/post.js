'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // A post belongs to a user
            Post.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });

            // A post has many comments
            Post.hasMany(models.Comment, {
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            });
        }
    }

    Post.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Post',
            tableName: 'Posts',
            timestamps: true,
        }
    );

    return Post;
};
