# Backend Pokémon CRUD

Backend REST API para una aplicación CRUD de Pokémon, desarrollado con Node.js, Express, Prisma ORM y PostgreSQL.

Este proyecto permite gestionar Pokémon y Maestros mediante endpoints HTTP. Cada Pokémon puede estar relacionado opcionalmente con un Maestro, practicando relaciones entre tablas usando Prisma.

---

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JavaScript
- CORS
- dotenv
- Nodemon

---

## Funcionalidades

- Listar Pokémon registrados.
- Crear nuevos Pokémon.
- Editar información de un Pokémon por su número.
- Eliminar Pokémon por su número.
- Listar Maestros junto con sus Pokémon relacionados.
- Crear Maestros evitando nombres duplicados.
- Eliminar Maestros.
- Relacionar un Pokémon con un Maestro mediante `maestroId`.
- Conectar el backend con PostgreSQL usando Prisma ORM.
- Manejar variables de entorno con `.env`.

---

## Modelo de base de datos

El proyecto utiliza dos modelos principales: `Pokemon` y `Maestro`.

### Pokemon

```prisma
model Pokemon {
  id        Int      @id @default(autoincrement())
  num       Int      @unique
  name      String
  imagen    String
  type      String[]
  maestroId Int?
  maestro   Maestro? @relation(fields: [maestroId], references: [id])
}
```

### Maestro

```prisma
model Maestro {
  id       Int       @id @default(autoincrement())
  nombre   String    @unique
  pokemons Pokemon[]
}
```

Relación principal:

- Un `Maestro` puede tener varios Pokémon.
- Un `Pokemon` puede pertenecer opcionalmente a un `Maestro`.

---

## Endpoints principales

### Pokémon

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pokemonsCopy` | Obtiene todos los Pokémon junto con su Maestro relacionado. |
| POST | `/pokemonsCopy` | Crea un nuevo Pokémon. |
| PUT | `/pokemonsCopy/:num` | Actualiza un Pokémon usando su número. |
| DELETE | `/pokemonsCopy/:num` | Elimina un Pokémon usando su número. |

### Maestros

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/maestros` | Obtiene todos los Maestros junto con sus Pokémon. |
| POST | `/maestros` | Crea un nuevo Maestro. |
| DELETE | `/maestros/:id` | Elimina un Maestro usando su ID. |

---

## Ejemplos de uso

### Crear un Pokémon

```http
POST /pokemonsCopy
Content-Type: application/json
```

```json
{
  "num": 25,
  "name": "pikachu",
  "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "type": ["electric"],
  "maestroId": 1
}
```

### Editar un Pokémon

```http
PUT /pokemonsCopy/25
Content-Type: application/json
```

```json
{
  "name": "pikachu",
  "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "type": ["electric"],
  "maestroId": null
}
```

### Crear un Maestro

```http
POST /maestros
Content-Type: application/json
```

```json
{
  "nombre": "Ash"
}
```

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Karen1007-star/backend-pokemon.git
```

### 2. Entrar al proyecto

```bash
cd backend-pokemon
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Crear el archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con la conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/pokemon_db"
PORT=4000
```

> El archivo `.env` no debe subirse a GitHub porque contiene datos privados de conexión.

### 5. Ejecutar las migraciones de Prisma

```bash
npx prisma migrate dev
```

### 6. Generar Prisma Client

```bash
npx prisma generate
```

### 7. Ejecutar el servidor en modo desarrollo

```bash
npm run dev
```

El backend se ejecutará en:

```bash
http://localhost:4000
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta el servidor con Nodemon. |
| `npm start` | Ejecuta el servidor con Node. |

---

## Proyecto relacionado

Este backend trabaja junto con el frontend del proyecto:

[Frontend Pokémon](https://github.com/Karen1007-star/frontend-pokemon)

---

## Aprendizajes del proyecto

Con este proyecto practiqué:

- Creación de una API REST con Express.
- Uso de rutas GET, POST, PUT y DELETE.
- Conexión entre backend y PostgreSQL.
- Uso de Prisma Client para consultar y modificar datos.
- Creación de modelos y relaciones en Prisma.
- Uso de migraciones con Prisma Migrate.
- Validación básica de datos recibidos desde el frontend.
- Manejo de errores con `try/catch`.
- Separación de la conexión a Prisma en un archivo externo.
- Uso de variables de entorno con dotenv.

---

## Estado del proyecto

Proyecto en desarrollo y mejora continua como parte de mi portafolio Fullstack Junior.