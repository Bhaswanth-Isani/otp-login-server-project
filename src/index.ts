import {config} from "dotenv";
// @ts-ignore
import express from "express";
import {ApolloServer} from "apollo-server-express";
import * as http from "http";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";
import {makeExecutableSchema} from "@graphql-tools/schema";

import {typeDefs} from "./graphql/typeDefs";
import {connectDB} from "./config/connectDb";
import {resolvers} from "./graphql/resolvers";
import {otpRoute} from "./routes/otpRoute";

config();
connectDB().then(() => console.log("Connected to the database"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/otp", otpRoute);

const schema = makeExecutableSchema({typeDefs, resolvers});

const httpServer = http.createServer(app);

const server = new ApolloServer({
    schema,
    cache: "bounded",
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer})
    ]
});

const startServer = async () => {
    await server.start();
    server.applyMiddleware({
        app,
        cors: {origin: "*"},
        path: "/graphql",
    });
};

startServer().then(() => console.log("GraphQL server started"));

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
});