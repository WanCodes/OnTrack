import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const bookFilter = (props) => {

    const keyupHandler = event => {
        //initiate search on enter key
        if (event.keyCode === 13) {
            props.searchClickHandler();
        }
    }

    return (
        <FormGroup>
            <InputGroup>
                <FormControl type="text" placeholder="Search Term" onKeyUp={keyupHandler} onChange={props.inputChange} value={props.inputValue} />
                <InputGroup.Button>
                    <Button bsStyle="primary" onClick={props.searchClickHandler}>Search</Button>
                </InputGroup.Button>
            </InputGroup>
        </FormGroup>
    )
}

bookFilter.propTypes = {
    inputChange: PropTypes.func,
    inputValue: PropTypes.string,
    searchClickHandler: PropTypes.func
}

export default bookFilter;