import {gql} from "apollo-server-core";

export const typeDefs = gql`
    input RegisterUserInput {
        name: String!
        email: String!
    }
    
    input LoginUserInput {
        email: String!
        otp: String!
    }
    
    type UserOutput {
        id: ID!
        name: String!
        email: String!
    }
    
    type Mutation {
        registerUser(input: RegisterUserInput!): UserOutput!
        loginUser(input: LoginUserInput!): UserOutput!
    }
`;