'use strict';

const fs = require('fs');
const path = require('path');
const { sequelize, connectDB } = require('../sequelize'); // Import sequelize instance from sequelize.js
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
    .forEach(file => {
      // Import the model and instantiate it with the `sequelize` instance and `sequelize.DataTypes`
      const modelHelp = require(path.join(__dirname, file));
      const model = new modelHelp(sequelize, sequelize.DataTypes);
      db[model.name] = model;
    });

// Set up associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Export sequelize instance
db.Sequelize = require("sequelize");

module.exports = db;
