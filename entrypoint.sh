#!/bin/sh

# Espera a que la base de datos esté lista
until nc -z -v -w30 $POSTGRES_HOST 5432
do
  echo "Esperando a la base de datos..."
  sleep 1
done

# Ejecuta las migraciones de Prisma
pnpm dlx prisma generate
pnpm dlx prisma db push

#Instalar ts-node en el sistema
pnpm exec ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# Seed
pnpm dlx prisma db seed

# Inicia la aplicación
pnpm run dev
