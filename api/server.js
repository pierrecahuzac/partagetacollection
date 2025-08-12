const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");


const allowedOrigins = [
  "https://collections-seven-iota.vercel.app/",
  "https://collections-seven-iota.vercel.app",
  // réseau local utilisé en dev
  "http://192.168.1.181:5173",
  "http://192.168.1.181:5173/",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("CORS origin:", origin);

    // Autoriser requêtes sans origin (ex: curl, mêmes origines pour certaines requêtes)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || vercelMatch) {
      console.log("CORS: origine autorisée");
      return callback(null, true);
    }

    console.warn("CORS: origine refusée ->", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Referer",
  ],
  exposedHeaders: ["Set-Cookie", "Cookie"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// CORS et gestion du préflight
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes d'accueil pour test/health
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      status: "ok",
      service: "api",
      version: "1.0",
      uptime: process.uptime(),
    });
});
app.get("/api", (req, res) => {
  res.status(200).json("accueil de l'api");
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
