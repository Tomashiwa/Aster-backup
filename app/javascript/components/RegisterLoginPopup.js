import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";

import "./styles/RegisterLoginPopup.css";

class RegisterLoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false,
            newName: "",
            newPassword: ""
        }
    }

    resetForm = () => {
        this.setState({
            isRegistering: false,
            newName: "",
            newPassword: ""
        })
    }

    handleRegister = async() => {
        await this.props.onRegister(this.state.newName, this.state.newPassword, this.resetForm);
    }

    handleLogin = async() => {
        await this.props.onLogin(this.state.newName, this.state.newPassword, this.resetForm);
    }

    handleSwitch = () => {
        this.setState({
            isRegistering: !this.state.isRegistering,
            newName: "",
            newPassword: ""
        })
    }

    render() {
        return (
            <Dialog open={this.props.isOpened} onClose={this.props.onClose}
                PaperProps={{ style: {
                    backgroundImage: "linear-gradient(to bottom, #e2a3ad, #ffe4e1)"
                }}}
            >
                <DialogTitle id="title">
                    {this.state.isRegistering ? "Create an account" : "Login"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {this.state.isRegistering ? "Please fill in your account details" : "Kindly login with your account:"}
                    </DialogContentText>

                    <TextField required={true} autoFocus value={this.state.newName} onChange={input => this.setState({newName: input.target.value})} margin="dense" id="field_name" label="Username" fullWidth />
                    <TextField required={true} value={this.state.newPassword} onChange={input => this.setState({newPassword: input.target.value})} margin="dense" type="password" id="field_password" label="Password" fullWidth />                    
                
                    <br /><br />

                    {
                        this.state.isRegistering
                            ? <div className="buttonArea">
                                <Button variant="outlined" onClick={this.handleRegister}>
                                    Confirm
                                </Button>
                                <Button variant="outlined" onClick={this.handleSwitch}>
                                    Sign in
                                </Button>                                    
                            </div>
                            : <div className="buttonArea">
                                <Button variant="outlined" onClick={this.handleLogin}>
                                    Login
                                </Button>
                                <Button variant="outlined" onClick={this.handleSwitch}>
                                    Sign up
                                </Button>                                    
                            </div>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default RegisterLoginPopup;