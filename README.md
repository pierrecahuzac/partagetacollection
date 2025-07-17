# Partage ta collection - Monorepo de Gestion de Collections

## 📋 Contexte
"Partage ta collection" est un monorepo moderne qui regroupe les composants frontend et backend d'une application de gestion de collections. L'architecture est conçue pour être scalable et maintenable, avec une séparation claire des responsabilités.

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
- **Styling** : SCSS avec mixins
- **Routing** : React Router 7
- **UI Components** : Carrousel, Modale
- **UI Libraries** : React Icons, Toastify, Tooltip
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


# Partage ta collection - Monorepo for Collection Management

## 📋 Context

"Partage ta collection" is a modern monorepo that brings together the frontend and backend components of a collection management application. The architecture is designed to be scalable and maintainable, with a clear separation of responsibilities.

## 🏗️ Architecture of the Monorepo

### Project Structure

```
collections/
├── api/           # Backend NestJS
│   ├── src/       # Source code
│   ├── prisma/    # Database
│   └── uploads/   # File Management
├── app/           # Frontend React
├── db/            # Data Files
└── traefik/       # Proxy Configuration
```

### Backend (NestJS)

- **Framework** : NestJS 11
- **ORM** : Prisma
- **Auth** : JWT + bcryptjs
- **Cloud** : Cloudinary for storage
- **Validation** : Zod
- **Tests** : Jest
- **Development** : Hot Reload

### Frontend (React)

- **Framework** : React 19
- **Build Tool** : Vite
- **Styling** : SCSS with mixins and vars
- **Routing** : React Router 7
- **UI Components** : Carousel, Modal
- **UI Libraries** : React Icons, Toastify, Tooltip
- **API Client** : Axios

## 🔐 Security

- JWT Authentication
- Password hashing (bcryptjs)
- Route protection with AuthGuard
- Secure file upload management
- Secure network configuration with Traefik

## 🚀 Infrastructure

- **Frontend Deployment** : Vercel
- **Backend Deployment** : Railway
- **Database** : PostgreSQL
- **Build Tools** : Vite (frontend), Docker (backend in dev)
- **Configuration** : Environment variables for each environment

## 🚀 Deployment

### Local Development (Docker)
- Docker for local development
- Access via local network (192.168.1.59)
- Configuration via docker-compose.yml
- Hot reload for development

### Frontend (Vercel)
- Automatic build via Vercel
- Configuration via `vercel.json`
- Environment variables via Vercel dashboard
- Integrated CDN
- Automatic deployments on main branches

### Backend (Railway)
- Deployment via Railway
- Configuration via `railway.toml`
- Managed PostgreSQL database by Railway
- Environment variables via Railway dashboard
- Available automatic scaling

## 🛠️ Configuration

- Environment variables (.env)
- Optimized Docker configuration
- Traefik configuration for routing
- Nginx configuration for reverse proxy

## 📚 Documentation

- Technical documentation in `/api/README.md`
- Frontend documentation in `/app/README.md`

## 🎯 Main Features

1. **Collection Management**
   - Complete CRUD for items
   - Collection system with carousel interface
   - Media management
   - Modern interface with modals and animations

2. **Security**
   - Authentication
   - Authorization
   - Data protection

3. **User Interface**
   - Modern and responsive interface
   - Notifications
   - Error management

## 🏗️ Technical Architecture

### Backend (NestJS)

The backend architecture follows the hexagonal pattern (or ports and adapters):

- **Domain Layer** (Core Business Logic)
  - Entities (business entities)
  - DTO (Data Transfer Objects)
  - Interfaces
  - Domain Services

- **Application Layer**
  - Use Cases
  - Application Services
  - Repositories

- **Infrastructure Layer**
  - Adapters (Prisma, etc.)
  - Repositories Implementation
  - External Services

- **Presentation Layer**
  - Controllers
  - DTO
  - Validation

#### Key Features

- Clear separation of responsibilities
- Framework independence
- Isolated unit tests
- Easy maintenance
- Possibility to change adapters without impacting the domain

### Frontend (React)
- Custom hooks
- Modern state management
- Performance optimization
- Lazy loading

## 🚀 Deployment

- Docker for development
- Traefik for routing
- Vercel for frontend
- PostgreSQL for database

## 🛠️ Development

- TypeScript for static typing
- ESLint for linting
- Prettier for formatting
- Unit and E2E tests
- Hot Reload for development

## 📝 Technical Notes

- Use of Prisma as ORM
- Hexagonal architecture for backend
- Repository pattern for persistence
- Component-based architecture for frontend
- Global state management with React Context

## 🤝 Contributing

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Launch services with Docker
5. Develop your features

### Modes d'Environnement

- **Développement** (`NODE_ENV=development`)
  - Backend : Port 3001
  - Frontend : Port 5173
  - Utilise les variables d'environnement de développement

- **Production** (`NODE_ENV=production`)
  - Backend : Port 3001
  - Frontend : Port 4173
  - Utilise les variables d'environnement de production
