import React, { Component } from 'react';
import './App.css';

import {Grid, PageHeader} from 'react-bootstrap';
import { BrowserRouter, Route} from 'react-router-dom';

import Books from './containers/Books/Books';

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          On Track Books
        </PageHeader>
        <BrowserRouter>
          <Route path="/" component={Books} />
        </BrowserRouter>
      </Grid>
    );
  }
}

export default App;
