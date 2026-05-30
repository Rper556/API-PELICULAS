import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Pelicula = sequelize.define('Pelicula', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },

  director: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  genero: {
    type: DataTypes.STRING(50),
    allowNull: false
  },

  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'peliculas',
  timestamps: false
});

export default Pelicula;