# Partage ta collection - Monorepo de Gestion de Collections

## 📋 Contexte
"Partage ta collection" est un monorepo moderne qui regroupe les composants frontend et backend d'une application de gestion de collections. L'architecture est conçue pour être scalable et maintenable, avec une séparation claire des responsabilités.

## ⚙️ Prérequis

- Node.js >= 18
- Docker & Docker Compose
- Compte Cloudinary, Railway, Vercel

## 🏗️ Architecture du Monorepo

### Structure des Projets

```
collections/
├── api/           # Backend Express
│   ├── src/       # Code source
│   ├── prisma/    # Base de données
│   └── uploads/   # Gestion des fichiers
├── app/           # Frontend React
├── db/            # Fichiers de données
└── traefik/       # Configuration du proxy
```

### Backend (Express)

- **Framework** : Express 5
- **ORM** : Prisma
- **Auth** : JWT + bcryptjs
- **Cloud** : Cloudinary pour le stockage
- **Validation** : Zod
- **Tests** : Jest
- **Développement** : Hot Reload (Nodemon)

### Frontend (React)

- **Framework** : React 18
- **Build Tool** : Vite
- **Styling** : SCSS avec mixins
- **Routing** : React Router 6
- **UI Components** : Carrousel, Modale
- **UI Libraries** : React Icons, Toastify, Tooltip
- **API Client** : Axios

## 🚦 Lancement rapide

```bash
git clone <repo>
cd collections
cp .env.example .env
docker-compose up --build
```

## 🔐 Sécurité

- Authentification JWT
- Hashing des mots de passe (bcryptjs)
- Protection des routes avec AuthGuard
- Gestion sécurisée des fichiers uploadés
- Configuration réseau sécurisée avec Traefik

## 🚀 Infrastructure

- **Déploiement Frontend** : Vercel
- **Déploiement Backend** : Railway
- **Base de données** : PostgreSQL
- **Build Tools** : Vite (frontend), Docker (backend en dev)
- **Configuration** : Variables d'environnement pour chaque environnement

## 🚀 Déploiement

### Développement Local (Docker)
- Docker pour le développement local
- Accès via le réseau local (192.168.1.59)
- Configuration via docker-compose.yml
- Hot reload pour le développement

### Frontend (Vercel)
- Build automatique via Vercel
- Configuration via `vercel.json`
- Variables d'environnement via le dashboard Vercel
- CDN intégré
- Déploiements automatiques sur les branches principales

### Backend (Railway)
- Déploiement via Railway
- Configuration via `railway.toml`
- Base de données PostgreSQL gérée par Railway
- Variables d'environnement via le dashboard Railway
- Scaling automatique disponible

## 🛠️ Configuration

- Variables d'environnement (.env) à placer dans `api/` et `app/`
- Configuration Docker optimisée
- Configuration Traefik pour le routing
- Configuration Nginx pour le reverse proxy

### Exemple de fichier `.env` (backend)

```
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=ton_secret
CLOUD_NAME=ton_cloud_name
CLOUDINARY_API_KEY=ta_cle
CLOUDINARY_API_SECRET=ton_secret
CLOUDINARY_UPLOAD_PRESET=ton_preset
```

## 📚 Documentation

- Documentation technique dans `/api/README.md`
- Documentation frontend dans `/app/README.md`

## 🎯 Fonctionnalités Principales

1. **Gestion des Collections**
   - CRUD complet pour les items
   - Système de collections avec interface carrousel
   - Gestion des médias
   - Interface utilisateur moderne avec modales et animations

2. **Sécurité**
   - Authentification
   - Autorisation
   - Protection des données

3. **Interface Utilisateur**
   - Interface moderne et responsive
   - Notifications
   - Gestion des erreurs

## 🏗️ Architecture Technique

### Backend (Express)

- Architecture modulaire (controllers, services, middlewares)
- Validation des données (Zod)
- Gestion des erreurs centralisée
- Pattern Repository avec Prisma

### Frontend (React)

- Hooks personnalisés
- Gestion d'état moderne (React Context)
- Optimisation des performances
- Lazy loading

## 📝 Notes Techniques

- Utilisation de Prisma comme ORM
- Architecture modulaire pour le backend
- Pattern Repository pour la persistance
- Architecture component-based pour le frontend

## 🤝 Contribuer

1. Clonez le repository
2. Installez les dépendances
3. Configurez les variables d'environnement
4. Lancez les services avec Docker
5. Développez vos fonctionnalités

## 📞 Contact


Pour toute question, ouvrez une issue ou contactez l’équipe via le repo GitHub.
