import React, { Component } from 'react';
import './style.css';


class Cell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            edited: false
        }
    }

    render() {
        //const edit=(this.state.edited && <input>{this.props.value}</input>)
        switch (this.props.value) {

            case "№ по порядку":
                return (
                    <div className="divTableCell vert" id={this.props.id.col.toString() + this.props.id.row.toString()} onClick={this.props.clck} onDoubleClick={this.props.dblclck}>{this.props.value} </div>
                )
            default:
                return (
                    <div className="divTableCell" id={this.props.id.col.toString() + this.props.id.row.toString()} onClick={this.props.clck} onDoubleClick={this.props.dblclck}>{this.props.value} </div>
                )
        }
    }
}

export { Cell };