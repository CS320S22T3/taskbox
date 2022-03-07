import React from "react";
import userContext from "../context/userContext";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: undefined };
    }

    /**
     * send a GET request to the server to set a default context when a user opens the
     * web page, setting the context to a user if a session already exists
     */

    componentDidMount() {
        fetch('/api/sessions', {
            method: 'GET'
        }).then((res) => this.setState({ user: res.body }));
    }

    /**
     * send a POST request to the server with the email and password submitted from
     * the login form, set the context to the user if successful, otherwise log the
     * error message to the console
     */

    login(email, password) {
        fetch('/api/sessions', {
            method: 'POST',
            body: { email, password }
        }).then((res) => this.setState({ user: res.body }))
            .catch(err => console.log(err))
    };

    /**
     * send a DELETE request to the server to end the user's session and logout, remove that user
     * from the context
     */

    logout() {
        fetch('/api/sessions', {
            method: 'DELETE',
        }).then((res) => this.setState({ user: undefined }))
    };

    render() {
        return (
            <userContext.Provider value={this.state.user}>
                {this.state.user ? (<Mainpage />) : (<LoginForm />)}
            </userContext.Provider>
        )
    }
}