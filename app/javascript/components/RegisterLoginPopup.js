import React from "react";

class RegisterLoginPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("RegisterLoginPopup's prop:");
        console.log(this.props);
    }

    render() {
        return (
            <div>
                {
                    this.props.isOpened
                        ? "REGISTER OR LOGIN"
                        : ""
                }
            </div>
        );
    }
}

export default RegisterLoginPopup;