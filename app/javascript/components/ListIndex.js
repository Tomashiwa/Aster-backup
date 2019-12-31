import React from "react";
import TaskIndex from "./TaskIndex"
import { FormHelperText, withStyles } from "@material-ui/core";

// const styles = {
//     listsSection: {
//         display: flex
//     }
// };

class ListIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 align="center">Board</h1>
                <section style={{display: "flex", justifyContent:"space-around", alignItems: "flex-start"}}>
                    <article style={{flexGrow: 1, flexBasis: 0}} >
                        <TaskIndex board_id={0} list_id={1} />
                    </article>
                    <article style={{flexGrow: 1, flexBasis: 0}}>
                        <TaskIndex board_id={0} list_id={2} />
                    </article>
                    <article style={{flexGrow: 1, flexBasis: 0}}>
                        <TaskIndex board_id={0} list_id={3} />
                    </article>
                    <article style={{flexGrow: 1, flexBasis: 0}}>
                        <TaskIndex board_id={0} list_id={4} />
                    </article>
                </section>
            </div>
        );
    }
}

export default ListIndex;
// export default withStyles(styles)(ListIndex);