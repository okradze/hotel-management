import Query from './Query/Query'
import Mutation from './Mutation/Mutation'
import Subscription from './Subscription/Subscription'
import Room from './Room'
import Booking from './Booking'

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Room,
    Booking,
}

export { resolvers as default }
