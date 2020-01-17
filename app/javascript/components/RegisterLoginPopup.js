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

    componentDidMount() {
        console.log("mount loginregi popup");
    }

    handleRegister = async() => {
        await this.props.onRegister(this.state.newName, this.state.newPassword);
        this.setState({newName: "", newPassword: ""});
    }

    handleLogin = async() => {
        await this.props.onLogin(this.state.newName, this.state.newPassword);
        this.setState({newName: "", newPassword: ""});
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
                        {this.state.isRegistering ? "Please fill in your particulars:" : "Kindly login with your particulars:"}
                    </DialogContentText>

                    <TextField required={true} autoFocus value={this.state.newName} onChange={input => this.setState({newName: input.target.value})} margin="dense" id="field_name" label="Username" fullWidth />
                    <TextField required={true} value={this.state.newPassword} onChange={input => this.setState({newPassword: input.target.value})} margin="dense" type="password" id="field_password" label="Password" fullWidth />                    
                
                    <br /><br />

                    {
                        this.state.isRegistering
                            ? <div className="buttonArea">
                                <Button variant="outlined" onClick={this.handleRegister}>Submit</Button>
                                <Button variant="outlined" onClick={this.handleSwitch}>Cancel</Button>                                    
                            </div>
                            : <div className="buttonArea">
                                <Button variant="outlined" onClick={this.handleLogin}>
                                    Login
                                </Button>
                                <Button variant="outlined" onClick={this.handleSwitch}>
                                    Register
                                </Button>                                    
                            </div>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default RegisterLoginPopup;