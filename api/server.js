// server.js
const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes'); // Ceci est l'import de votre fichier routes.js
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// IMPORTS POUR SWAGGER UI - REMETTRE ICI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Assurez-vous que ce chemin est correct

const allowedOriginsDev = [
  `https://collections-seven-iota.vercel.app`,
  'http://192.168.1.181:5173',
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    
    if (!origin || allowedOriginsDev.includes(origin)) {
      console.log("origine autorisée");
      callback(null, true);


      
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, PUT, PATCH, DELETE, POST, HEAD',
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie', 'Cookie'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTE POUR LA DOCUMENTATION SWAGGER UI - REMETTRE ICI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Vos routes principales de l'API
app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});