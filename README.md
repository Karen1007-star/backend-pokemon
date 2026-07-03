# Backend Pokemon CRUD

Backend para una aplicacion CRUD de Pokemon desarrollado con Node.js, Express, Prisma y PostgreSQL.

Este proyecto permite gestionar Pokemon y Maestros mediante una API REST. Los Pokemon pueden estar relacionados con un Maestro, practicando relaciones entre tablas usando Prisma ORM.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JavaScript
- CORS
- dotenv

## Funcionalidades

- Listar Pokemon
- Crear Pokemon
- Editar Pokemon
- Eliminar Pokemon
- Listar Maestros
- Crear Maestros
- Eliminar Maestros
- Relacionar Pokemon con Maestros
- Conectar el backend con PostgreSQL usando Prisma

## Endpoints principales

### Pokemon

- GET /pokemonsCopy: obtener todos los Pokemon
- POST /pokemonsCopy: crear un Pokemon
- PUT /pokemonsCopy/:num: editar un Pokemon por numero
- DELETE /pokemonsCopy/:num: eliminar un Pokemon por numero

### Maestros

- GET /maestros: obtener todos los maestros
- POST /maestros: crear un maestro
- DELETE /maestros/:id: eliminar un maestro

## Modelo de base de datos

El proyecto usa dos modelos principales:

- Pokemon
- Maestro

Un Maestro puede tener varios Pokemon, y un Pokemon puede estar relacionado opcionalmente con un Maestro.

## Instalacion y ejecucion

1. Clonar el repositorio:

git clone https://github.com/Karen1007-star/backend-pokemon.git

2. Entrar al proyecto:

cd backend-pokemon

3. Instalar dependencias:

npm install

4. Crear un archivo .env con la conexion a PostgreSQL:

DATABASE_URL="postgresql://usuario:password@localhost:5432/pokemon_db"

5. Ejecutar las migraciones de Prisma:

npx prisma migrate dev

6. Ejecutar el servidor:

node index.js

## Aprendizaje del proyecto

Con este proyecto practique:

- Creacion de una API REST con Express
- Uso de rutas GET, POST, PUT y DELETE
- Conexion entre backend y base de datos
- Uso de Prisma ORM
- Modelado de relaciones entre tablas
- Manejo de migraciones
- Organizacion basica de un backend