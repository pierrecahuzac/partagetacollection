## API Backend

Ce répertoire contient l'implémentation du backend de l'application, développée avec Express.js.

### Scripts utiles

```bash
# Démarrer l'API
npm run start

# Exécuter les tests
npm run test

# Générer la documentation Swagger
npm run swagger
```

### Documentation API

La documentation de l'API est générée via Swagger. Pour y accéder en développement, assurez-vous que le middleware Swagger est activé dans `server.js`.

### Déploiement

Le backend est conçu pour être déployé via Docker sur un VPS ou un service d'hébergement de conteneurs.
