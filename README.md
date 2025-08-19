## Partage ta collection — Monorepo (Frontend + Backend)

Application pour gérer et partager des collections (livres, vinyles, figurines, etc.). Ce dépôt regroupe:
- un frontend React (Vite, TypeScript)
- un backend Express (Prisma, PostgreSQL via Supabase)


### Prérequis
- Node.js >= 18 (pour un développement sans Docker)
- Docker et Docker Compose (recommandé pour un démarrage rapide)


### Structure du dépôt
```
collections/
├── app/                # Frontend (React, Vite)
│   ├── src/
│   └── dockerfile
├── api/                # Backend (Express)
│   ├── src/
│   ├── prisma/
│   └── dockerfile
├── docker-compose.yml  # Orchestration des services (dev)
└── .gitignore
```


### Démarrage rapide (Docker)
Lance le frontend (5173) et l’API (3001) avec hot-reload.

```bash
docker compose up --build
```

Accès:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`


### Configuration des variables d’environnement

Crée un fichier `.env` à la racine (utilisé par `docker-compose.yml`) et, si besoin, des `.env` spécifiques dans `app/` et `api/`.

Exemple Backend (`api/.env`):
```env
DATABASE_URL=postgresql://user:password@host:5432/db   # Connexion Postgres (ex: Supabase)
JWT_SECRET=ton_secret

# Supabase (DB + Storage)
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   # clé service (côté serveur)
SUPABASE_BUCKET_NAME=photos
```

Exemple Frontend (`app/.env`):
```env
# Exemple: URL de l’API (adapter au besoin)
VITE_API_URL=http://localhost:3001

# Supabase (si consommé côté frontend)
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```


### Scripts utiles

Backend (`api/`):
```bash
npm run start      # démarre l’API (node server.js)
npm run test       # tests (si Jest utilisé)
npm run swagger    # génère swagger-output.json à partir de routes.js
```

Frontend (`app/`):
```bash
npm run dev        # démarre Vite en dev (http://localhost:5173)
npm run build      # build de production
npm run preview    # prévisualisation du build
```


### Développement local sans Docker (optionnel)
Dans deux terminaux séparés:

```bash
# Terminal 1 — API
cd api
npm install
npm run start

# Terminal 2 — App
cd app
npm install
npm run dev
```


### API et documentation
- Base API en dev: `http://localhost:3001`
- Générer la doc: `cd api && npm run swagger` (produit `swagger-output.json`)
- Pour exposer une UI Swagger, active la partie correspondante dans `api/server.js` (middleware swagger-ui-express) si besoin.


### Déploiement
- Frontend: hébergé sur Vercel
- Backend: hébergé sur un VPS (Node/Express via Docker)
- Base de données: PostgreSQL gérée par Supabase
- Stockage des photos: Supabase Storage (bucket `photos` par défaut)

### Environnements
- Frontend: Vercel
- Backend: VPS (Docker)
- Base de données: Supabase (PostgreSQL)
- Stockage photos: Supabase Storage


### Dépannage
- Port 5173/3001 occupé: change les ports dans `docker-compose.yml` ou stoppe les services conflictuels
- CORS: mets à jour la liste `allowedOrigins` dans `api/server.js`
- Prisma: vérifie `DATABASE_URL` et exécute les migrations si nécessaire
- Supabase Storage: assure-toi que le bucket existe (`SUPABASE_BUCKET_NAME`) et que les politiques RLS/Storage permettent l’accès attendu (upload/lecture). Ajoute `http://localhost:5173` (et ton domaine) dans la config CORS de ton projet Supabase.


### Contribution
1. Fork/branche de fonctionnalité
2. Commits clairs
3. PR avec description


### Licence
À définir.



