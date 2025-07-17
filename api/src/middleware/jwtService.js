const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; 

const jwtService = {
 
  async decodedJWT(req, res, next) {
    const accessToken = req.cookies.access_token;

   
    
    if (!accessToken) {
      console.warn(
        "Authentification: Aucun token d'accès trouvé dans les cookies."
      );
      return res.status(401).json({
        message: "Accès refusé : Aucun token d'authentification fourni.",
      });
    }
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      req.user = decoded;
      ;
      
      next();
    } catch (error) {
      
      // Gérer les erreurs de vérification du JWT (ex: token invalide, expiré)
      console.error("Erreur de vérification du JWT:", error.message);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Accès refusé : Token d'authentification expiré.",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Accès refusé : Token d'authentification invalide.",
        });
      } else {
        next(error);
      }
    }
  },
};

module.exports = jwtService; // N'oubliez pas d'exporter votre service
