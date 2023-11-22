import { startApolloServer } from "./app.js";
import { typeDefs } from "./graphql/typedefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { connectDB } from "./db.js";



// Start Apollo Server
startApolloServer(typeDefs, resolvers);