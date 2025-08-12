const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const allowedOrigins = [
  "https://collections-seven-iota.vercel.app",
  "http://192.168.1.181:5173",  
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin reçue:", origin);
    
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.log("Origine refusée:", origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Referer",
  ],
  exposedHeaders: ["Set-Cookie", "Cookie"],
  preflightContinue: false,
};

// CORS AVANT tout le reste - TRÈS IMPORTANT
app.use(cors(corsOptions));

// Middleware explicite pour gérer les requêtes OPTIONS preflight
app.options('*', (req, res) => {
  console.log('Preflight request for:', req.path, 'from:', req.get('Origin'));
  res.header('Access-Control-Allow-Origin', req.get('Origin'));
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Accept,Origin,Referer');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));



// Swagger après CORS
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger-output.json");
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes à la fin
app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Allowed origins:', allowedOrigins);
});