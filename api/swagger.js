// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Partage ta collection API',
    description: 'Documentation de l\'API pour Partage ta collection'
  },
  host: 'api.partagetacollection.eu', 
  basePath: '/api', 
  schemes: ['https'], 
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