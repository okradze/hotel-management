import getHotelId from '../../utils/getHotelId'

const booking = {
    subscribe: (parent, args, { req, pubsub }) => {
        const hotelId = getHotelId({ req })

        return pubsub.asyncIterator(`booking:${hotelId}`)
    },
}

export default booking
