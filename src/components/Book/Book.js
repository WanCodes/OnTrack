import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const book = (props) => {
    //format the array of authors
    const getFormattedAuthors = () => {
        return props.author.join(', ');
    }

    return <ListGroupItem header={props.title}>Author: {getFormattedAuthors()} - Year: {props.pubYear}</ListGroupItem>
}

book.propTypes = {
    title: PropTypes.string,
    author: PropTypes.array,
    pubYear: PropTypes.number,
}

export default book;