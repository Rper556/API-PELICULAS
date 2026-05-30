import express from 'express';
import sequelize from './database.js';
import Pelicula from './models/Pelicula.js';
const app = express();

app.use(express.json());

try {

  await sequelize.authenticate();

  console.log('Conexión PostgreSQL correcta');

  await sequelize.sync();

} catch (error) {

  console.error('Error:', error);

}

/* RUTAS */

// Obtener todas
app.get('/peliculas', async (req, res) => {

  const peliculas = await Pelicula.findAll();

  res.json(peliculas);

});

// Obtener por ID
app.get('/peliculas/:id', async (req, res) => {

  const pelicula = await Pelicula.findByPk(req.params.id);

  pelicula
    ? res.json(pelicula)
    : res.status(404).json({ error: 'No encontrada' });

});

// Crear película
app.post('/peliculas', async (req, res) => {

  const nuevaPelicula = await Pelicula.create(req.body);

  res.status(201).json(nuevaPelicula);

});

// Actualizar película
app.put('/peliculas/:id', async (req, res) => {

  const pelicula = await Pelicula.findByPk(req.params.id);

  if (!pelicula) {
    return res.status(404).json({
      error: 'No encontrada'
    });
  }

  await pelicula.update(req.body);

  res.json(pelicula);

});

// Eliminar película
app.delete('/peliculas/:id', async (req, res) => {

  const pelicula = await Pelicula.findByPk(req.params.id);

  if (!pelicula) {
    return res.status(404).json({
      error: 'No encontrada'
    });
  }

  await pelicula.destroy();

  res.json({
    mensaje: 'Película eliminada'
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});