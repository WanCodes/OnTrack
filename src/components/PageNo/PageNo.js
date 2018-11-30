import React from 'react';
import PropTypes from 'prop-types';

const pageNo = (props) => {
    return <p>Page {props.currentPage} of {props.pageCount}</p>
}

pageNo.propTypes = {
    currentPage: PropTypes.number,
    pageCount: PropTypes.number
}

export default pageNo;