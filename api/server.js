const express = require("express");

const app = express();
app.disable("x-powered-by");

const port = process.env.PORT || 3001;
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

let allowedOrigins;

if (process.env.NODE_ENV === "production") {
  allowedOrigins = process.env.ALLOWED_ORIGIN_PROD 
    ? process.env.ALLOWED_ORIGIN_PROD.split(',') 
    : [];
} else {
  allowedOrigins = process.env.ALLOWED_ORIGIN_DEV 
    ? process.env.ALLOWED_ORIGIN_DEV.split(',')
    : ["http://localhost:5173"]; // fallback pour le développement
}


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed`);
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

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger (uniquement en développement)
if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("./swagger-output.json");
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(routes);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
