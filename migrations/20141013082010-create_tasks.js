'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('tasks', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
      , title: {type: DataTypes.STRING, allowNull: false}
      , user_id: {type: DataTypes.STRING, allowNull: false}
      , status: {type: DataTypes.STRING, allowNull: false}
      , created_at: {type: DataTypes.DATE, allowNull: false}
      , updated_at: {type: DataTypes.DATE, allowNull: false}
    });

    migration.addIndex('tasks', ['user_id']);

    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('tasks');
    done();
  }
};
