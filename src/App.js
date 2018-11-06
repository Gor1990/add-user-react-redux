import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import User from './components/User';
import AddUser from './components/AddUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/' component={User} exact/>
            <Route path='/add-user' component={AddUser}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
