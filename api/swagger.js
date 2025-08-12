// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Collectify API', // Un titre plus spécifique
    description: 'Documentation de l\'API pour Collectify'
  },
  host: '192.168.1.181:3001', 
  schemes: ['http'], 
  definitions: {
   
  }
};

const outputFile = './swagger-output.json';
// Les chemins vers tous les fichiers qui contiennent vos routes Express
const swaggerRoutes = ['./src/auth/router.js', './src/collection/router.js', './src/user/router.js', './src/image/router.js', './src/format/router.js', './src/item/router.js'];

// Lance la génération
swaggerAutogen(outputFile, swaggerRoutes, doc).then(() => {
}).catch(error => {
  console.error('Erreur lors de la génération Swagger:', error);
});