require("dotenv").config(); // carga las variables del entorno del .env

const { PrismaClient } = require("@prisma/client"); // se importa el cliente de Prisma, es la que nos permite usar prisma.user.findMany() por ejemplo
//trae la clase conectada con BD
const prisma = new PrismaClient(); // se crea la conexion con la BD

module.exports = prisma;