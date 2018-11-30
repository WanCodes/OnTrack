import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Book from '../../components/Book/Book';

const bookList = (props) => {
    let books = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!props.error) {
        books = props.books.map(book => {
            return (
                <Book
                    key={book.id}
                    title={book.book_title}
                    author={book.book_author}
                    pubYear={book.book_publication_year}
                    pubCountry={book.book_publication_country}
                    pubCity={book.book_publication_city}
                    pages={book.book_pages}
                />
            );
        });
    }

    return (
        <ListGroup>
            {books}
        </ListGroup>
    )
}

bookList.propTypes = {
    title: PropTypes.string,
    author: PropTypes.array,
    pubYear: PropTypes.number,
}

export default bookList;