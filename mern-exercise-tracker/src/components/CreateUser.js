import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username:''
    }
  }
  onChangeUsername(e){
    this.setState({username:e.target.value})
  }
  onSubmit(e){
    e.preventDefault()

    const newUser ={
      username:this.state.username,
    }
    console.log(newUser)
    axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) {
      this.setState({ 
        users: response.data.map(user => user.username),
        username: response.data[0].username
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
    this.setState({username:''})
  }
  render() {
    return (
      <div>
        <h3>Create new user</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input 
            type="text"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create new user" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}