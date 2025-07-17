// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Collectify API', // Un titre plus spécifique
    description: 'Documentation de l\'API pour Collectify'
  },
  host: '192.168.1.181:3001', // Votre hôte API
  schemes: ['http'], // Ou ['http', 'https'] si vous utilisez HTTPS
  // Si vous utilisez des tags pour organiser vos endpoints
  // tags: [
  //   { name: 'Auth', description: 'Operations about authentication' },
  //   { name: 'Collections', description: 'User collections management' },
  //   // ...
  // ],
  definitions: {
    // Définissez ici les schémas de vos DTOs pour une meilleure doc.
    // Exemple:
    // User: {
    //   email: 'john.doe@example.com',
    //   username: 'johndoe',
    //   password: 'password123'
    // },
    // Collection: {
    //   title: 'Ma première collection',
    //   description: 'Mes objets rares',
    //   userId: 'uuid-de-l-utilisateur',
    //   statusId: 'uuid-du-statut'
    // }
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