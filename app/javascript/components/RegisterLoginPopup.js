import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";

import "./styles/RegisterLoginPopup.css";

class RegisterLoginPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Dialog open={this.props.isOpened} onClose={this.props.onClose}>
                <DialogTitle id="title">
                    {this.state.isRegistering ? "Create an account" : "Login"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {this.state.isRegistering ? "Please fill in your particulars:" : "Kindly login with your particulars:"}
                    </DialogContentText>

                    <TextField required={true} margin="dense" id="field_name" label="Username" fullWidth />
                    <TextField required={true} margin="dense" type="password" id="field_password" label="Password" fullWidth />                    
                
                    <br /><br />

                    {
                        this.state.isRegistering
                            ? <div className="buttonArea">
                                <Button variant="outlined" onClick={this.props.onRegister}>Submit</Button>
                                <Button variant="outlined" onClick={() => this.setState({isRegistering: false})}>Cancel</Button>                                    
                            </div>
                            : <div className="buttonArea">
                                <Button variant="outlined" onClick={this.props.onLogin}>Login</Button>
                                <Button variant="outlined" onClick={() => this.setState({isRegistering: true})}>Register</Button>                                    
                            </div>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default RegisterLoginPopup;