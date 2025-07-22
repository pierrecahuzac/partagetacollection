# Résumé du projet : Partage ta collection

## Présentation

"Partage ta collection" est un monorepo moderne qui regroupe le frontend (React) et le backend (Express) d'une application de gestion et de partage de collections d'objets (livres, vinyles, figurines, etc.). L'objectif est de permettre à tout passionné de gérer, organiser et partager ses collections en toute simplicité, avec une interface moderne et sécurisée.

## Objectifs principaux
- Centraliser la gestion de toutes ses collections (ajout, modification, suppression d'objets)
- Partager ses collections avec d'autres utilisateurs
- Garantir la sécurité et la confidentialité des données
- Offrir une expérience utilisateur fluide et responsive

## Architecture

- **Monorepo** : séparation claire entre le frontend (`app/`) et le backend (`api/`)
- **Backend** :
  - Framework : Express (JavaScript)
  - ORM : Prisma (PostgreSQL)
  - Authentification : JWT + bcryptjs
  - Stockage médias : Cloudinary
  - Validation : Zod
  - Tests : (à compléter selon la stack)
  - Structure modulaire (routes, services, contrôleurs)
- **Frontend** :
  - Framework : React (Vite, TypeScript)
  - Styling : SCSS
  - Routing : React Router
  - UI : Carrousel, modales, notifications, animations
  - Gestion d’état : React Context
  - Appels API : Axios

## Fonctionnalités principales
1. **Gestion des collections**
   - CRUD complet sur les objets et collections
   - Interface carrousel pour la navigation
   - Gestion des médias (images, etc.)
2. **Sécurité**
   - Authentification et autorisation JWT
   - Protection des routes et des données
   - Gestion sécurisée des fichiers uploadés
3. **Interface utilisateur**
   - Moderne, responsive, notifications, gestion des erreurs
   - Accès multi-plateforme (desktop, mobile, tablette)
   
## Infrastructure & déploiement
- **Développement local** : Docker, hot reload, configuration via `docker-compose.yml`
- **Production** :
  - Frontend : Vercel (déploiement automatique, CDN)
  - Backend : Railway (scaling, gestion BDD)
  - Base de données : PostgreSQL
  - Proxy/routing : Traefik, Nginx

## Technologies principales
- **Backend** : Express (JavaScript), Prisma, PostgreSQL, JWT, bcryptjs, Cloudinary
- **Frontend** : React, Vite, SCSS, React Router, Axios, Toastify, React Icons
- **Outils** : Docker, Traefik, Vercel, Railway, ESLint, Prettier

## Pour aller plus loin
- Documentation technique détaillée dans `/api/README.md` et `/app/README.md`
- Contribution : clonage du repo, installation des dépendances, configuration des variables d’environnement, lancement via Docker

---

*Ce résumé synthétise l’essentiel du projet pour une prise en main rapide ou une présentation à un tiers.* 