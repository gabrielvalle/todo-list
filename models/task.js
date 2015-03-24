"use strict";

module.exports = function(sequelize, DataTypes) {
  var ATTRIBUTES = {
      title: {type: DataTypes.STRING, notEmpty: true, allowNull: false}
    , user_id: {type: DataTypes.STRING, notEmpty: true, allowNull: false}
    , created_at: DataTypes.DATE
    , updated_at: DataTypes.DATE
    , status: {type: DataTypes.STRING, isIn: [['done', 'pending']], allowNull: false}
  };

  var OPTIONS = {
      freezeTableName: true
    , tableName: 'tasks'
    , underscored: true
  };

  var Task = sequelize.define('Task', ATTRIBUTES, OPTIONS);

  return Task;
};
