import React, { Component } from 'react';
import './App.css';

import {Grid, PageHeader} from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Books from './containers/Books/Books';

class App extends Component {
  render() {
    return (
      <Grid>
        <PageHeader>
          On Track Books
        </PageHeader>
        <BrowserRouter>
          <Switch>
            <Route path={'/'} exact render={props => <Books {...props} />} />
            <Route path={'/:page'} exact render={props => <Books {...props} />} />
          </Switch>
        </BrowserRouter>
      </Grid>
    );
  }
}

export default App;
