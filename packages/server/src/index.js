import '@babel/polyfill/noConflict'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { importSchema } from 'graphql-import'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import resolvers from './resolvers'
import prisma from './prisma'

const app = express()

app.use(helmet())
app.use(cookieParser())
app.disable('x-powered-by')

const server = new ApolloServer({
    typeDefs: importSchema('./src/schema.graphql'),
    resolvers,
    context: ({ req, res }) => ({
        prisma,
        req,
        res,
    }),
})

server.applyMiddleware({
    app,
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
