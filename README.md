# Collectify - Monorepo de Gestion de Collections

## 📋 Contexte

Collectify est un monorepo moderne qui regroupe les composants frontend et backend d'une application de gestion de collections. L'architecture est conçue pour être scalable et maintenable, avec une séparation claire des responsabilités.

## 🏗️ Architecture du Monorepo

### Structure des Projets

```
collections/
├── api/           # Backend NestJS
│   ├── src/       # Source code
│   ├── prisma/    # Base de données
│   └── uploads/   # Gestion des fichiers
├── app/           # Frontend React
├── db/            # Fichiers de données
├── Conception/    # Documentation
└── traefik/       # Configuration du proxy
```

### Backend (NestJS)

- **Framework** : NestJS 11
- **ORM** : Prisma
- **Auth** : JWT + bcryptjs
- **Cloud** : Cloudinary pour le stockage
- **Validation** : Zod
- **Tests** : Jest
- **Développement** : Hot Reload

### Frontend (React)

- **Framework** : React 19
- **Build Tool** : Vite
- **Styling** : TailwindCSS
- **Routing** : React Router 7
- **UI** : React Icons, Toastify, Tooltip
- **API Client** : Axios

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

- Variables d'environnement (.env)
- Configuration Docker optimisée
- Configuration Traefik pour le routing
- Configuration Nginx pour le reverse proxy

## 📚 Documentation

- Documentation technique dans `/Conception`
- Documentation API dans `/api/README.md`
- Documentation frontend dans `/app/README.md`

## 🎯 Fonctionnalités Principales

1. **Gestion des Collections**
   - CRUD complet pour les items
   - Système de collections
   - Gestion des médias

2. **Sécurité**
   - Authentification
   - Autorisation
   - Protection des données

3. **Interface Utilisateur**
   - Interface moderne et responsive
   - Notifications
   - Gestion des erreurs

## 🏗️ Architecture Technique

### Backend (NestJS)
- Architecture modulaire
- Injection de dépendances
- Middleware
- Validation des données
- Gestion des erreurs

### Frontend (React)
- Hooks personnalisés
- Gestion d'état moderne
- Optimisation des performances
- Lazy loading

## 🚀 Déploiement

- Docker pour le développement
- Traefik pour le routing
- Vercel pour le frontend
- PostgreSQL pour la base de données

## 🛠️ Développement

- TypeScript pour le typage statique
- ESLint pour le linting
- Prettier pour le formatage
- Tests unitaires et E2E
- Hot Reload pour le développement

## 📝 Notes Techniques

- Utilisation de Prisma comme ORM
- Architecture hexagonale pour le backend
- Pattern Repository pour la persistance
- Architecture component-based pour le frontend
- Gestion des états globaux avec React Context

## 🤝 Contributing

1. Clonez le repository
2. Installez les dépendances
3. Configurez les variables d'environnement
4. Lancez les services avec Docker
5. Développez vos fonctionnalités
