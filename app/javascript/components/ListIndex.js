import React from "react";
import TaskIndex from "./TaskIndex"
import "./styles/ListIndex.css"

class ListIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagFilterId: -1
        };
    }

    componentDidMount() {
        console.log("ListIndex's state:");
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1 align="center">Board</h1>
                <section>
                    <article>
                        <TaskIndex board_id={0} list_id={1} tagFilterId={this.state.tagFilterId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={2} tagFilterId={this.state.tagFilterId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={3} tagFilterId={this.state.tagFilterId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={4} tagFilterId={this.state.tagFilterId}/>
                    </article>
                </section>
            </div>
        );
    }
}

export default ListIndex;