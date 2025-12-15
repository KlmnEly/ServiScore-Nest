# ---------- BUILDER ----------
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# 1️⃣ Copiar package.json PRIMERO
COPY package*.json ./

# 2️⃣ Instalar TODAS las dependencias
RUN npm install

# 3️⃣ Copiar el resto del código
COPY . .

# 4️⃣ Compilar Nest
RUN npm run build


# ---------- PRODUCTION ----------
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# 5️⃣ Copiar SOLO package.json
COPY package*.json ./

# 6️⃣ Instalar SOLO dependencias de producción
RUN npm install --omit=dev

# 7️⃣ Copiar el build desde builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
