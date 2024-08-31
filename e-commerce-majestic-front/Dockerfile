# Etapa 1: Construcción
FROM node:16 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias con la opción --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copiar el resto del código de la aplicación
COPY . .

# Replace environment.ts with environment.docker.ts
RUN cp src/environments/environment.docker.ts src/environments/environment.ts

# Construir la aplicación Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
