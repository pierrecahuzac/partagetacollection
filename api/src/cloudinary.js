const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("cloudinary").v2; // Assurez-vous que 'cloudinary' est bien installé (npm install cloudinary)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Confirmez que c'est bien CLOUDINARY_NAME
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUtils = {
  // Cette méthode utilise le SDK Cloudinary et est généralement plus simple
  async uploadToCloudinary(fileBuffer, mimetype) {
    try {
      const b64 = Buffer.from(fileBuffer).toString("base64");
      const dataURI = "data:" + mimetype + ";base64," + b64;
      return await cloudinary.uploader.upload(dataURI);
    } catch (error) {
      console.error("Erreur lors de l'upload via Cloudinary SDK:", error.message || error);
    }
  },

  // Cette méthode tente un upload direct via Axios
  async uploadToCloudinaryDirect(fileBuffer, mimetype) {
    // Vérifions si les inputs sont définis
    console.log("File Buffer reçu :", fileBuffer ? "Définie" : "Indéfinie");
    console.log("Mimetype reçu :", mimetype ? "Défini" : "Indéfini");

    try {
      const form = new FormData();
      form.append("file", fileBuffer, {
        filename: "image.jpg",
        contentType: mimetype,
      });

      // --- DÉBUT DE LA CORRECTION : Ajout de la signature pour l'upload direct ---
      const timestamp = Math.round((new Date()).getTime() / 1000); // Timestamp actuel en secondes

      // Paramètres à signer (doivent correspondre à ce que vous envoyez à Cloudinary)
      // Ici, nous n'envoyons que 'file', donc la signature ne se base que sur le timestamp.
      // Si vous ajoutez d'autres paramètres comme 'folder', 'tags', etc., ils doivent être inclus ici.
      const paramsToSign = {
        timestamp: timestamp,
        // Ajoutez d'autres paramètres ici si vous les append() à votre FormData
        // Par exemple: folder: 'my_folder', public_id: 'my_image'
      };

      // Génération de la signature Cloudinary
      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
      );

      // Ajout des paramètres d'authentification au FormData
      form.append("timestamp", timestamp);
      form.append("api_key", process.env.CLOUDINARY_API_KEY);
      form.append("signature", signature);

      // Si vous avez un upload_preset spécifique pour les uploads directs non signés,
      // vous pouvez l'ajouter ici AU LIEU de la clé API et de la signature.
      // Mais dans ce cas, votre CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET ne seraient pas utilisés.
      // form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

      // --- FIN DE LA CORRECTION ---

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, // CLOUDINARY_NAME est confirmé
        form,
        {
          headers: form.getHeaders(),
          // withCredentials n'est pas nécessaire et peut parfois causer des problèmes pour les requêtes cross-domain vers des APIs externes.
          // Il est principalement utilisé par les navigateurs pour envoyer des cookies avec des requêtes cross-origin.
          // Dans un environnement Node.js, ce n'est généralement pas pertinent pour les appels API tiers.
        }
      );
      console.log("Réponse Cloudinary (upload direct) :", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'upload direct vers Cloudinary :",
        error.response ? error.response.data : error.message
      );
    }
  },
};

module.exports = cloudinaryUtils;