import React, { Component } from "react"



export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        remember: false
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    handleCheckBox = (event) =>{
        event.preventDefault()
        localStorage.setItem(
            "checked",
            JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                remember:this.state.remember
            })
        )
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email addr
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <button type="submit">
                    Sign in
                </button>
                <br />
                <input onChange={this.handleFieldChange} type="checkbox"
                        id="remember">
                        </input>
                 <label htmlFor="checkbox">
                    Remember Me
                </label>
            </form>
        )
    }
}