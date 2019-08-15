import '@babel/polyfill/noConflict'
import { GraphQLServer } from 'graphql-yoga'
import helmet from 'helmet'
import resolvers from './resolvers'
import prisma from './prisma'
import cookieParser from 'cookie-parser'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request,
        }
    },
})

server.express.use(helmet())
server.express.use(cookieParser())

server.start(
    {
        cors: {
            credentials: true,
            origin: 'http://localhost:3000',
        },
        port: process.env.PORT || 4000,
        uploads: false,
        // https: true,
    },
    () => {
        console.log('Server is up')
    },
)
