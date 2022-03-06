import React from "react";
import userContext from "../context/userContext";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: undefined };
    }

    login(email, password) {
        fetch('/api/sessions', {
            method: 'POST',
            body: { email, password }
        }).then((res) => this.setState({ user: res.body }))
    };

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