# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiamos solo archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiamos el código fuente
COPY app/ .

# Construimos la app
RUN npm run build


# Etapa de producción
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiamos solo dependencias de producción
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copiamos la carpeta build
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
