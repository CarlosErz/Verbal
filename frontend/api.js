import express from 'express';
import mongoose from 'mongoose';

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/registro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Definir el esquema de la colección "usuarios"
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  contrasena: String,
});

// Crear un modelo basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

const app = express();

app.use(express.json());

// Configurar los encabezados CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/users', (req, res) => {
  // Obtener los usuarios desde la base de datos
  Usuario.find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    });
});

app.post('/api/users', (req, res) => {
  // Crear un nuevo usuario en la base de datos
  const { nombre, contrasena } = req.body;
  const nuevoUsuario = new Usuario({ nombre, contrasena });

  nuevoUsuario.save()
    .then(() => {
      res.json({ message: 'Usuario creado correctamente' });
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor API en ejecución en el puerto ${port}`);
});
