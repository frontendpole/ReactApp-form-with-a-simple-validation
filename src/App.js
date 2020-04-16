import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    userName: '',
    email: '',
    pass: '',
    accept: false,
    feedback: '',
    errors: {
      userName: false,
      email: false,
      pass: false,
      accept: false,
    }
  }

  messages = {
    username_incorrect: "Name's minimum length should be 10 characters.",
    email_incorrect: "E-mail address must contain '@'.",
    password_incorrect: "Password's minimum length should be 8 characters.",
    accept_incorrect: "Terms and Conditions must be accepted."
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;

    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value,
      })
    } else if (type === 'checkbox') {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validation = this.formValidation()
    if (validation.correct) {
      this.setState({
        userName: '',
        email: '',
        pass: '',
        accept: false,
        feedback: 'The form has been successfully submited!',
        errors: {
          userName: false,
          email: false,
          pass: false,
          accept: false,
        }
      })
    } else {
      this.setState({
        errors: {
          userName: !validation.userName,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        }
      })
    }
  }

  formValidation = () => {
    let userName = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (this.state.userName.length >= 10) {
      userName = true;
    }
    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if (this.state.pass.length >= 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (userName && email && password && accept) {
      correct = true;
    }
    return ({
      userName,
      email,
      password,
      accept,
      correct
    })
  }

  componentDidUpdate() {
    if (this.state.feedback !== '') {
      setTimeout(() => this.setState({
        feedback: ''
      }), 3000)
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Name
          <input type="text" id='user' name='userName' value={this.state.userName} onChange={this.handleChange} />
            {this.state.errors.userName && <span>{this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">E-mail address
          <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="password">Password
          <input type="password" id='password' name='pass' value={this.state.pass} onChange={this.handleChange} />
            {this.state.errors.pass && <span>{this.messages.password_incorrect}</span>}
          </label>

          <label htmlFor="accept">
            <input type="checkbox" name="accept" id="accept" checked={this.state.accept} onChange={this.handleChange} />I accept the terms and conditions.
          </label>
          {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.feedback && <h1>{this.state.feedback}</h1>}
      </>
    );
  }
}

export default App;
