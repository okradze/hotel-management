import '@babel/polyfill/noConflict'
import http from 'http'
import {
    ApolloServer,
    PubSub,
    AuthenticationError,
} from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { importSchema } from 'graphql-import'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import resolvers from './resolvers'
import getHotelId from './utils/getHotelId'

const startServer = async () => {
    const app = express()

    app.use(helmet())
    app.use(cookieParser())
    app.disable('x-powered-by')

    const pubsub = new PubSub()

    const server = new ApolloServer({
        typeDefs: importSchema('./src/schema.graphql'),
        resolvers,
        context: ({ req, res, connection }) => {
            if (connection) {
                return {
                    req: connection.context,
                    pubsub,
                }
            }
            return {
                req,
                res,
                pubsub,
            }
        },
        subscriptions: {
            onConnect(_, webSocket) {
                try {
                    const token = webSocket.upgradeReq.headers.cookie.split(
                        '=',
                    )[1]

                    return {
                        cookies: {
                            token,
                        },
                    }
                } catch (e) {
                    throw new AuthenticationError('no_auth')
                }
            },
        },
    })

    server.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000',
            credentials: true,
        },
    })

    const httpServer = http.createServer(app)

    server.installSubscriptionHandlers(httpServer)

    const dbURL = 'mongodb://localhost:27017/hotel-room-management'

    await mongoose.connect(dbURL, {
        useNewUrlParser: true,
        autoIndex: false,
    })

    const PORT = process.env.PORT || 4000

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
        )
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`,
        )
    })
}

startServer()
