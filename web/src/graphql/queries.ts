import { gql } from '@apollo/client';

export const HELLO_QUERY = gql`
    query Hello {
    hello 
    }
`

export const ME_QUERY = gql`
    query Me {
        me {
            id
            email
        }
    }
`;