import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

export const TextFieldModal = (props) => {

        

        return (
            <div>
            {props.data.map((item)=>{
                <TextField
                margin="dense"
                id={item}
                label={`${item} преподавателя`}
                type="text"
                fullWidth = {true}
                error={!!this.state.errors.item}
                helperText={this.state.errors.item}
                onChange={(event)=>this.setState({item :event.target.value})}
              />
            })}
            </div>
        )
}