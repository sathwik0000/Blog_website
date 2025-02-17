'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Each comment belongs to a post
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
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
      },
      {
        sequelize,
        modelName: 'Comment',
      }
  );

  return Comment;
};
