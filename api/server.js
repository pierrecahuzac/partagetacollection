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
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
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

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger après CORS
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger-output.json");
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

});
