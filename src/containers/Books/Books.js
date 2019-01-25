import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import BookList from '../BookList/BookList';

import BookFilter from '../../components/BookFilter/BookFilter';
import PageNo from '../../components/PageNo/PageNo';

class Books extends Component {

    componentDidMount() {
        if(!this.props.match.params.page){
            const path = '/1';
            this.props.history.push(path);
        }
    }

    //Paginate handler to set the correct page
    pageChangeHandler = data => {
        const path = '/' + parseInt(data.selected + 1);
        this.props.history.push(path);
    }

    //Update the search term state
    searchTermChangeHandler = (event) => {
        //this.setState({ searchTerm: event.target.value })
    }
    //Load data with new search term
    bookFilterHandler = () => {
        //this.setCurrentPage(1);
    }

    render() {
        return (
            <>
                <Row className="show-grid text-center">
                    <Col xs={12} md={12}>
                        {/*<BookFilter inputChange={this.searchTermChangeHandler} inputValue={this.state.searchTerm} searchClickHandler={this.bookFilterHandler} />*/}
                    </Col>
                </Row>

                <Row className="show-grid text-center">
                    <Col xs={12} md={12}>
                        <nav>
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={this.props.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.pageChangeHandler}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                //initialPage={parseInt(this.props.currentPage - 1)}
                                forcePage={parseInt(this.props.currentPage - 1)}
                            />
                        </nav>
                    </Col>
                </Row>

                <Row className="show-grid text-left">
                    <Col xs={12} md={12}>
                        {/*<Route path={'/:id'} exact render={props => <BookList {...props} />}/>*/}
                        <Route path={'/:id'} exact component={BookList}/>
                        
                        {/*<BookList books={this.state.books} error={this.state.error} />*/}
                    </Col>
                </Row>

                <Row className="show-grid text-right">
                    <Col xs={12} md={12}>
                        <PageNo currentPage={this.props.currentPage} pageCount={this.props.pageCount} />
                    </Col>
                </Row>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        pageCount: state.pageCount,
        currentPage: state.currentPage
        
    }
}
export default connect(mapStateToProps)(Books)