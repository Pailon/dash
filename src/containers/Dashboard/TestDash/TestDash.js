import React, {Component} from "react";
import {Button} from "@material-ui/core";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
export default class TestDash extends Component{

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this)
        this.onAgree = this.onAgree.bind(this)
    }

    state = {
        openModal: false,
    }

    onClose(){
        this.setState({openModal: false})
    }

    onAgree(){
        console.log('Согласился')
        this.setState({openModal: false})
    }

    func(){
        let mass = []
        for(let i=1; i<99; i++){
            mass.push(`Листинг П.1.${i} – \r`)
        }
        return mass
    }

    render() {
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-3" style={{backgroundColor: 'red', height: '300px', width: '300px'}}>
                        <Button
                        onClick={
                            ()=>{
                                this.setState({openModal:true})
                            }
                        }
                        >Удалить</Button>

                        <ModalWindow
                            openModal ={this.state.openModal}
                            onClose = {this.onClose}
                            onAgree = {this.onAgree}
                            title = {'Вы действительно хотите удалить данные?'}
                            content = {'При удалении произойдет так же удаление всех связанных данных'}
                        />
                    </div>
                    <div className="col-3" style={{backgroundColor: 'blue', height: '300px', width: '300px'}}>2</div>
                    <div className="col-3" style={{backgroundColor: 'green', height: '300px', width: '300px'}}>3</div>
                    <div className="col-3" style={{backgroundColor: 'yellow', height: '300px', width: '300px'}}>4</div>
                </div>
                <div className="row">
                    <div className="col-3" style={{backgroundColor: 'grey', height: '300px', width: '300px'}}>5</div>
                    <div className="col-3" style={{backgroundColor: 'orange', height: '300px', width: '300px'}}>6</div>
                    <div className="col-3" style={{backgroundColor: '#007aff', height: '300px', width: '300px'}}>7</div>
                    <div className="col-3" style={{backgroundColor: '#887add', height: '300px', width: '100px'}}>8</div>
                    <div style={{backgroundColor: '#887add', height: '300px', width: '150px'}}>{this.func()}</div>
                </div>
            </div>
        )
    }

}