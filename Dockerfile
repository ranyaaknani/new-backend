# Utiliser l'image Node.js officielle
FROM node:18

# Créer le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json SEULEMENT
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code
COPY . .

# Builder NestJS (facultatif pour dev)
RUN npm run build

# Démarrer le serveur NestJS
CMD ["npm", "run", "start:dev"]
