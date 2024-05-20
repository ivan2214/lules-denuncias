FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY pnpm-lock.yaml package.json ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código de la aplicación
COPY . .

# Copiar el script de entrada
COPY entrypoint.sh /app/

# Hacer ejecutable el script de entrada
RUN chmod +x /app/entrypoint.sh

# Exponer el puerto de la aplicación
EXPOSE 3000

# Usar el script de entrada como entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
