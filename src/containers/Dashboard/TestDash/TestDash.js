import React, {Component} from "react";

export default class TestDash extends Component{
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-4" style={{backgroundColor: 'red', height: '300px', width: '300px'}}>1</div>
                    <div className="col-4" style={{backgroundColor: 'blue', height: '300px', width: '300px'}}>2</div>
                    <div className="col-4" style={{backgroundColor: 'green', height: '300px', width: '300px'}}>3</div>
                </div>
                <div className="row">
                    <div className="col-4" style={{backgroundColor: 'yellow', height: '300px', width: '300px'}}>4</div>
                    <div className="col-4" style={{backgroundColor: 'grey', height: '300px', width: '300px'}}>5</div>
                    <div className="col-4" style={{backgroundColor: 'orange', height: '300px', width: '300px'}}>6</div>
                </div>
                <div className="row">
                    <div className="col" style={{backgroundColor: 'brown', height: '123px'}}>7</div>
                </div>
            </div>
        )
    }

}