const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload'))); // Servir imágenes estáticas

// Ruta del archivo de base de datos
const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// ... (tu código de base de datos)
db.serialize(() => {
  // Crear tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
    edad INTEGER,
    profesion TEXT,
    descripcion TEXT,
    puntuacion_media FLOAT,
    foto_perfil TEXT DEFAULT 'upload/Perfil_defecto.jpg'
  )`);

  // Crear tabla de opiniones
  db.run(`CREATE TABLE IF NOT EXISTS opinion (
    id_opinion INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    id_usuario INTEGER,
    puntuacion INTEGER CHECK (puntuacion BETWEEN 1 AND 5),
    descripcion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
  )`);

  // Crear tabla de categorías
  db.run(`CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
  )`);

  // Crear tabla de anuncios
  db.run(`CREATE TABLE IF NOT EXISTS anuncio (
    id_anuncio INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    id_usuario INTEGER,
    categoria TEXT,
    ubicacion TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (categoria) REFERENCES categoria(nombre)
  )`);

  // Crear tabla de chats
  db.run(`CREATE TABLE IF NOT EXISTS chat (
    id_chat INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user1 INTEGER,
    id_user2 INTEGER,
    descripcion TEXT,
    FOREIGN KEY (id_user1) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_user2) REFERENCES usuario(id_usuario) ON DELETE CASCADE
  )`);

  // Crear tabla de mensajes del chat
  db.run(`CREATE TABLE IF NOT EXISTS mensaje_chat (
    id_mensaje INTEGER PRIMARY KEY AUTOINCREMENT,
    id_chat INTEGER,
    id_usuario INTEGER,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_chat) REFERENCES chat(id_chat) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
  )`);
});

const multer = require('multer');

// Configuración de multer para almacenar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });



// Endpoint para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { nombre, email, contraseña, edad, profesion, descripcion } = req.body;
  const foto_perfil = 'upload/Perfil_defecto.jpg'; // Ruta de la imagen por defecto

  const query = `INSERT INTO usuario (nombre, email, contraseña, edad, profesion, descripcion, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [nombre, email, contraseña, edad, profesion, descripcion, foto_perfil], function(err) {
    if (err) {
      console.error('Error registrando usuario:', err);
      return res.status(500).json({ error: 'Error registrando usuario' });
    }
    console.log('Usuario registrado con ID:', this.lastID);
    res.status(201).json({ id: this.lastID, message: 'Usuario registrado exitosamente' });
  });
});

// Endpoint para iniciar sesión
app.post('/api/login', (req, res) => {
  const { email, contraseña } = req.body;
  const query = `SELECT * FROM usuario WHERE email = ? AND contraseña = ?`;
  db.get(query, [email, contraseña], (err, row) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    if (row) {
      res.status(200).json({ message: 'Inicio de sesión exitoso', user: row });
    } else {
      res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
  });
});

// Endpoint para publicar un nuevo anuncio
app.post('/api/publicarAd', (req, res) => {
  const { titulo, descripcion, id_usuario, categoria, ubicacion } = req.body;
  const query = `INSERT INTO anuncio (titulo, descripcion, id_usuario, categoria, ubicacion) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [titulo, descripcion, id_usuario, categoria, ubicacion], function(err) {
    if (err) {
      console.error('Error publicando anuncio:', err);
      return res.status(500).json({ error: 'Error publicando anuncio' });
    }
    console.log('Anuncio publicado con ID:', this.lastID);
    res.status(201).json({ id: this.lastID, message: 'Anuncio publicado exitosamente' });
  });
});

// Endpoint para obtener los anuncios de un usuario específico
app.get('/api/userAds/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT anuncio.*, usuario.nombre as autor
    FROM anuncio
    JOIN usuario ON anuncio.id_usuario = usuario.id_usuario
    WHERE anuncio.id_usuario = ?
  `;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error obteniendo anuncios del usuario:', err);
      return res.status(500).json({ error: 'Error obteniendo anuncios del usuario' });
    }
    res.status(200).json(rows);
  });
});

// Endpoint para obtener los datos de un usuario específico
app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM usuario WHERE id_usuario = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Error obteniendo datos del usuario:', err);
      return res.status(500).json({ error: 'Error obteniendo datos del usuario' });
    }
    res.status(200).json(row);
  });
});

// Endpoint para obtener los anuncios más recientes con paginación y filtrado por categoría
app.get('/api/latestAds', (req, res) => {
  const { page = 1, limit = 9, categoria } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT anuncio.*, usuario.nombre as autor
    FROM anuncio
    JOIN usuario ON anuncio.id_usuario = usuario.id_usuario
  `;

  const params = [];

  if (categoria) {
    query += ` WHERE anuncio.categoria = ?`;
    params.push(categoria);
  }

  query += ` ORDER BY anuncio.id_anuncio DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error obteniendo anuncios más recientes:', err);
      return res.status(500).json({ error: 'Error obteniendo anuncios más recientes' });
    }
    res.status(200).json(rows);
  });
});

// Endpoint para buscar anuncios
app.get('/api/searchAds', (req, res) => {
  const { title, location } = req.query;
  let query = `
    SELECT anuncio.*, usuario.nombre as autor
    FROM anuncio
    JOIN usuario ON anuncio.id_usuario = usuario.id_usuario
    WHERE 1 = 1
  `;
  const params = [];

  if (title) {
    query += ` AND anuncio.titulo LIKE ?`;
    params.push(`%${title}%`);
  }

  if (location) {
    query += ` AND anuncio.ubicacion LIKE ?`;
    params.push(`%${location}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error buscando anuncios:', err);
      return res.status(500).json({ error: 'Error buscando anuncios' });
    }
    res.status(200).json(rows);
  });
});

// Endpoint para publicar una nueva reseña y actualizar la puntuación media
app.post('/api/publicarRes', (req, res) => {
  const { titulo, comentario, puntuacion, id_usuario, id_reviewed_user } = req.body;
  const insertQuery = `INSERT INTO opinion (titulo, descripcion, puntuacion, id_usuario) VALUES (?, ?, ?, ?)`;

  db.run(insertQuery, [titulo, comentario, puntuacion, id_reviewed_user], function(err) {
    if (err) {
      console.error('Error publicando reseña:', err);
      return res.status(500).json({ error: 'Error publicando reseña' });
    }

    // Después de insertar la reseña, recalcular la puntuación media
    const recalculateQuery = `
      SELECT AVG(puntuacion) AS puntuacion_media
      FROM opinion
      WHERE id_usuario = ?
    `;

    db.get(recalculateQuery, [id_reviewed_user], (err, row) => {
      if (err) {
        console.error('Error recalculando puntuación media:', err);
        return res.status(500).json({ error: 'Error recalculando puntuación media' });
      }

      const updateQuery = `UPDATE usuario SET puntuacion_media = ? WHERE id_usuario = ?`;
      db.run(updateQuery, [row.puntuacion_media, id_reviewed_user], function(err) {
        if (err) {
          console.error('Error actualizando puntuación media:', err);
          return res.status(500).json({ error: 'Error actualizando puntuación media' });
        }

        console.log('Reseña publicada y puntuación media actualizada.');
        res.status(201).json({ id: this.lastID, message: 'Reseña publicada y puntuación media actualizada exitosamente' });
      });
    });
  });
});

// Endpoint para obtener las reseñas de un usuario específico
app.get('/api/userReviews/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT opinion.*, usuario.nombre as usuario
    FROM opinion
    JOIN usuario ON opinion.id_usuario = usuario.id_usuario
    WHERE opinion.id_usuario = ?
  `;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error obteniendo reseñas del usuario:', err);
      return res.status(500).json({ error: 'Error obteniendo reseñas del usuario' });
    }
    res.status(200).json(rows.map(row => ({
      ...row,
      comentario: row.descripcion // Asegúrate de que el campo se mapea correctamente
    })));
  });
});

// Endpoint para actualizar la información del usuario, incluida la foto de perfil
app.put('/api/user/:userId', upload.single('profilePicture'), (req, res) => {
  const userId = req.params.userId;
  const { nombre, edad, profesion, descripcion } = req.body;
  const profilePicture = req.file; // Objeto que contiene la información de la foto cargada

  let query;
  let params;

  if (profilePicture) {
    // Si se cargó una nueva foto de perfil, actualizamos también la foto en la base de datos
    query = `
      UPDATE usuario 
      SET nombre = ?, edad = ?, profesion = ?, descripcion = ?, foto_perfil = ?
      WHERE id_usuario = ?
    `;
    params = [nombre, edad, profesion, descripcion, 'upload/' + profilePicture.filename, userId];
  } else {
    // Si no se cargó una nueva foto de perfil, actualizamos solo los otros datos del usuario
    query = `
      UPDATE usuario 
      SET nombre = ?, edad = ?, profesion = ?, descripcion = ?
      WHERE id_usuario = ?
    `;
    params = [nombre, edad, profesion, descripcion, userId];
  }

  // Ejecutar la consulta SQL para actualizar los datos del usuario en la base de datos
  db.run(query, params, function(err) {
    if (err) {
      console.error('Error actualizando perfil:', err);
      return res.status(500).json({ error: 'Error actualizando perfil' });
    }
    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  });
});

// Endpoint para iniciar un chat o recuperar uno existente
app.post('/api/startChat', (req, res) => {
  const { id_user1, id_user2 } = req.body;
  const query = `SELECT * FROM chat WHERE (id_user1 = ? AND id_user2 = ?) OR (id_user1 = ? AND id_user2 = ?)`;
  db.get(query, [id_user1, id_user2, id_user2, id_user1], (err, row) => {
    if (err) {
      console.error('Error iniciando chat:', err);
      return res.status(500).json({ error: 'Error iniciando chat' });
    }
    if (row) {
      res.status(200).json({ chat: row });
    } else {
      const insertQuery = `INSERT INTO chat (id_user1, id_user2) VALUES (?, ?)`;
      db.run(insertQuery, [id_user1, id_user2], function(err) {
        if (err) {
          console.error('Error creando chat:', err);
          return res.status(500).json({ error: 'Error creando chat' });
        }
        res.status(201).json({ chat: { id_chat: this.lastID, id_user1, id_user2 } });
      });
    }
  });
});

// Endpoint para obtener los chats de un usuario específico
app.get('/api/getUserChats/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT chat.id_chat, 
           CASE 
             WHEN chat.id_user1 = ? THEN user2.nombre 
             ELSE user1.nombre 
           END AS userName,
           CASE 
             WHEN chat.id_user1 = ? THEN user2.foto_perfil 
             ELSE user1.foto_perfil 
           END AS userProfileImage
    FROM chat
    JOIN usuario AS user1 ON chat.id_user1 = user1.id_usuario
    JOIN usuario AS user2 ON chat.id_user2 = user2.id_usuario
    WHERE chat.id_user1 = ? OR chat.id_user2 = ?
  `;
  db.all(query, [userId, userId, userId, userId], (err, rows) => {
    if (err) {
      console.error('Error obteniendo chats del usuario:', err);
      return res.status(500).json({ error: 'Error obteniendo chats del usuario' });
    }
    res.status(200).json(rows);
  });
});


// Endpoint para obtener los mensajes de un chat específico
app.get('/api/getMessages/:chatId', (req, res) => {
  const chatId = req.params.chatId;
  const query = `SELECT * FROM mensaje_chat WHERE id_chat = ? ORDER BY fecha ASC`;
  db.all(query, [chatId], (err, rows) => {
    if (err) {
      console.error('Error obteniendo mensajes del chat:', err);
      return res.status(500).json({ error: 'Error obteniendo mensajes del chat' });
    }
    res.status(200).json(rows);
  });
});

// Endpoint para enviar un mensaje en un chat
app.post('/api/sendMessage', (req, res) => {
  const { id_chat, id_usuario, mensaje } = req.body;
  const query = `INSERT INTO mensaje_chat (id_chat, id_usuario, mensaje) VALUES (?, ?, ?)`;
  db.run(query, [id_chat, id_usuario, mensaje], function(err) {
    if (err) {
      console.error('Error enviando mensaje:', err);
      return res.status(500).json({ error: 'Error enviando mensaje' });
    }
    res.status(201).json({ id: this.lastID, message: 'Mensaje enviado exitosamente' });
  });
});

// Endpoint para eliminar un anuncio
app.delete('/api/deleteAd/:adId', (req, res) => {
  const adId = req.params.adId;
  const query = `DELETE FROM anuncio WHERE id_anuncio = ?`;
  db.run(query, [adId], function(err) {
    if (err) {
      console.error('Error eliminando anuncio:', err);
      return res.status(500).json({ error: 'Error eliminando anuncio' });
    }
    res.status(200).json({ message: 'Anuncio eliminado exitosamente' });
  });
});

// Endpoint para obtener los datos del otro usuario en un chat
app.get('/api/getOtherUser/:chatId/:userId', (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;
  const query = `
    SELECT usuario.* 
    FROM usuario 
    JOIN chat ON (usuario.id_usuario = chat.id_user1 OR usuario.id_usuario = chat.id_user2)
    WHERE chat.id_chat = ? AND usuario.id_usuario != ?
  `;
  db.get(query, [chatId, userId], (err, row) => {
    if (err) {
      console.error('Error obteniendo datos del otro usuario:', err);
      return res.status(500).json({ error: 'Error obteniendo datos del otro usuario' });
    }
    res.status(200).json(row);
  });
});



// Middleware para servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler para servir React's index.html para cualquier ruta desconocida
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
