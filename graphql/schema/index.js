const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }


    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
    }

    type RootMutation {
        createEvent(
            title: String!
            description: String!
            price: Float!
            date: String!
        ): Event

        createUser(
            email: String! 
            password: String!
        ): User
        
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
        login(email: String! password: String!): AuthData!
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);