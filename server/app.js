// Importar los módulos y paquetes necesarios
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";

// Función para iniciar el servidor Apollo
export async function startApolloServer(typeDefs, resolvers) {
  // Crear una aplicación Express
  const app = express();

  // Crear un servidor HTTP usando la aplicación Express
  const httpServer = http.createServer(app);

  // Definir una ruta básica para manejar solicitudes al punto de enlace raíz
  app.get('/', (req, res) => res.send('Bienvenido a mi página'));

  // Crear una nueva instancia de Apollo Server con las definiciones de tipo y resolutores proporcionados
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Iniciar el servidor Apollo
  await server.start();

  // Configurar la aplicación Express para utilizar middleware para manejar solicitudes GraphQL
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  // Iniciar el servidor HTTP en el puerto 4000
  await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));

  // Registrar un mensaje indicando que el servidor está listo y accesible en http://localhost:4000
  console.log(`🚀 Servidor listo en http://localhost:4000`);
}
