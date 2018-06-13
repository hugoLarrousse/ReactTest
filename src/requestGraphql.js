import React from 'react'
import axios from 'axios'

export class RequestGraphql extends React.Component {
  constructor() {
    super();
    this.state = {
        token: '',
        error: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
      const username = this.email.value
      const password = this.password.value
    axios({
        url:'http://localhost:8080/graph',
        "method": "POST",
        data: {
            query:
                `query jwtLogin($email: String!, $password: String!) {
                    jwtLogin(email: $email, password: $password) {
                        token
                    }
                }
                `,
                variables:{
                    email: username,
                    password: password
                },
            },
    }).then(response => {
        if(response.data.errors) {
            this.setState({
                error: response.data.errors[0].message
            })
        } else {
            this.setState({
                token: response.data.data.jwtLogin.token
            })
        }
    }).catch(e => {
        console.log('e', e);
    })
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
      <form onSubmit={this.handleSubmit}>
        <label> Email: 
            <input type='email' ref={node => this.email = node}/>
        </label>
        <br/>
        <label style= {{marginTop: 50}}> 
        Password: 
            <input type='password' ref={node => this.password = node}/>
        </label>
        <br/>
      <button type='submit'> Submit </button>
      </form>
        {this.state.token ? this.state.token : this.state.error}
      </div>
    )
  }
}