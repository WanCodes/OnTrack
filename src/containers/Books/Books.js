import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import BookList from '../BookList/BookList';

import BookFilter from '../../components/BookFilter/BookFilter';
import PageNo from '../../components/PageNo/PageNo';

import axios from '../../axios';

class Books extends Component {

    state = {
        books: [],
        pageCount: 0,
        currentPage: 1,
        count: 0,
        searchTerm: "",
        error:null
    }

    componentDidMount() {
        //Load the correct page from the URL
        if (this.props.match.params.page) {
            let pageNo = parseInt(this.props.match.params.page);
            this.setState({ currentPage: pageNo });
        } else {
            this.loadData();
        }
    }

    loadData() {
        //Ajax request list of books
        console.log("Called");
        axios.post('/books', {
            page: this.state.currentPage,
            itemsPerPage: 20,
            filters: [{ type: "all", values: [this.state.searchTerm] }]
        })
            .then(response => {
                const books = response.data.books;
                const count = parseInt(response.data.count);
                this.setState({ books: books, count: count, pageCount: Math.ceil(count / 20) });
            })
            .catch(err => {
                this.setState({error:err});
            })
    }
    //dynamically set the current page
    setCurrentPage = pageNo => {
        this.setState({ currentPage: pageNo }, () => {
            const path = '/' + pageNo;
            this.props.history.push(path);
            this.loadData();
        });
    }

    //Paginate handler to set the correct page
    pageChangeHandler = data => {
        let pageNo = parseInt(data.selected + 1);
        if (pageNo) {
            this.setCurrentPage(pageNo);
        }
    }
    
    //Update the search term state
    searchTermChangeHandler = (event) => {
        this.setState({ searchTerm: event.target.value })
    }
    //Load data with new search term
    bookFilterHandler = () => {
        this.setCurrentPage(1);
    }

    render() {
        return (
            <>
                <Row className="show-grid text-center">
                    <Col className="xs={12} md={12}">
                        <BookFilter inputChange={this.searchTermChangeHandler} inputValue={this.state.searchTerm} searchClickHandler={this.bookFilterHandler}/>
                    </Col>
                </Row>

                <Row className="show-grid text-center">
                    <Col className="xs={12} md={12}">
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            initialPage={(parseInt(this.props.match.params.page) - 1)}
                            forcePage={parseInt(this.state.currentPage-1)}
                        />
                    </Col>
                </Row>

                <Row className="show-grid text-left">
                    <Col className="xs={12} md={12}">
                        <BookList books={this.state.books} error={this.state.error}/>
                    </Col>
                </Row>

                <Row className="show-grid text-right">
                    <Col className="xs={12} md={12}">
                        <PageNo currentPage={this.state.currentPage} pageCount={this.state.pageCount} />
                    </Col>
                </Row>
            </>
        );
    }
}

export default Books