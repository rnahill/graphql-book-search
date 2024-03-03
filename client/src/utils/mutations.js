import { gql } from '@apollo/client';


// Login
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                }
            }
        }
    `;

    // Add a user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;


    // Update server and save a book
export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $description: String!, $title: String! $authors: [String], $image: String, $link: String) {
        saveBook(bookId: $bookId, description: $description, title: $title authors: $authors, image: $image, link: $link) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;

    // Update server and remove a book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                image
                link
            }
        }
    }
`;