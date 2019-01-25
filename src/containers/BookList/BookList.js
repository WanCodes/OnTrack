import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Book from '../../components/Book/Book';
import axios from '../../axios';
import {connect} from "react-redux";

class BookList extends Component {

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        
        if (this.props.match.params.id) {
            if (!this.props.books || (this.props.books && this.props.currentPage !== +this.props.match.params.id)) {
                axios.post('/books', {
                    page: this.props.match.params.id,
                    itemsPerPage: 20,
                    filters: [{ type: "all", values: [""] }]
                })
                    .then(response => {
                        // console.log(response);
                        console.log("Loaded DATA!!");
                        const count = parseInt(response.data.count);
                        this.props.updateBooks({books:response.data.books, pageCount:Math.ceil(count / 20), currentPage:parseInt(this.props.match.params.id)});
                        //this.setState({ books: response.data.books, currentPageId:this.props.match.params.id });
                    });
            }
        }

        //Ajax request list of books
        // axios.post('/books', {
        //     page: this.state.currentPage,
        //     itemsPerPage: 20,
        //     //filters: [{ type: "all", values: [this.state.searchTerm] }]
        // })
        //     .then(response => {
        //         const books = response.data.books;
        //         const count = parseInt(response.data.count);
        //         this.setState({ books: books, count: count, pageCount: Math.ceil(count / 20) });
        //     })
        //     .catch(err => {
        //         this.setState({ error: err });
        //     });
    }

    render() {
        let books = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (this.props.books) {
            books = this.props.books.map(book => {
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
}

BookList.propTypes = {
    title: PropTypes.string,
    author: PropTypes.array,
    pubYear: PropTypes.number,
}

const mapStateToProps = state => {
    return {
        books: state.books,
        currentPage:state.currentPage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateBooks: data => dispatch({type:'UPDATE_BOOKS', value:data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);