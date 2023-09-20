'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  return Category;
};