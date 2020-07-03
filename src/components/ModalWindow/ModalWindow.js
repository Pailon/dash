import React, {Component} from "react";
import Button from "../UI/Button/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";


export default class ModalWindow extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        openModal:false,
    }

    componentDidMount() {
    }

    onClose(){
        console.log('Отмена')
        this.setState({openModal:false})
    }
    render() {
        return(
            <div>
                <Dialog
                    open={this.props.openModal}
                    onClose={this.props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose}  style={{backgroundColor:'#007cff', color:'white'}}>
                            Отмена
                        </Button>
                        <Button onClick={this.props.onAgree}  style={{backgroundColor:'#007cff', color:'white'}} autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}