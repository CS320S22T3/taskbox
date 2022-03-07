import React from "react";
import "./index.css";

class LoginForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            // onSubmit: (email: string, password: string) => {
            //     console.log("Submit has no function assigned!")
            // }
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event: any) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event: any) {
        if (this.props.onSubmit != null)
            this.props.onSubmit(this.state.email, this.state.password)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <br></br>
                    <input type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                </label>
                <br></br>
                <label>
                    Password:
                    <br></br>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default LoginForm;
