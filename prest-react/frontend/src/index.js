import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      username: '',
      email: ''
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    // console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}/users/`);
    console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
    
    // axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users/`)
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, {
            headers: {
                'accept': 'application/json',

            // hard-coded token which should be generated on User's login
            // can generate any token, using the secret key "not_secret_at_all"
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzYyODk2Mzk4IiwibmFtZSI6IlJhd2FkIEdoeiJ9.KmLBqe3NsGX2VHHJ2J8MVd3fxTn1i6GLAnNOLIWI8cY',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded'
            }})
    .then((res) => { this.setState({ users: res.data }); })
    .catch((err) => { console.log(err); })
  }
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      active: true,
      created_at: new Date().toLocaleString(),
    }

    // axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users/`, data)
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data, {
            headers: {
                'accept': 'application/json',

            // hard-coded token which should be generated on User's login
            // can generate any token, using the secret key "not_secret_at_all"
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzYyODk2Mzk4IiwibmFtZSI6IlJhd2FkIEdoeiJ9.KmLBqe3NsGX2VHHJ2J8MVd3fxTn1i6GLAnNOLIWI8cY',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded'
            }})
    .then((res) => {
      this.getUsers();
      this.setState({ username: '' });
      this.setState({ email: '' });
    })
    .catch((err) => { console.log(err); })
  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br/>
            <h1>All Users</h1>
            <hr/><br/>
            <AddUser
              username={this.state.username}
              email={this.state.email}
              handleChange={ this.handleChange.bind(this) }
              addUser={ this.addUser.bind(this) }
            />
            <br/>
            <UsersList users={ this.state.users }/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);