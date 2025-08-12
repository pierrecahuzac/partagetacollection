// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Collectify API',
    description: 'Documentation de l\'API pour Collectify'
  },
  host: 'collections-7o06.onrender.com', // ✅ URL de production Render
  basePath: '/api', // ✅ AJOUTÉ - très important !
  schemes: ['https'], // ✅ HTTPS pour la production
  definitions: {
   
  }
};

const outputFile = './swagger-output.json';


const swaggerRoutes = ['./routes.js'];

// Lance la génération
swaggerAutogen(outputFile, swaggerRoutes, doc).then(() => {
  console.log('Swagger généré avec succès');
}).catch(error => {
  console.error('Erreur lors de la génération Swagger:', error);
});