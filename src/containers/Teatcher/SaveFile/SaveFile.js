import React from "react";
import classes from './SaveFile.module.css'
import {link} from "../../../Link";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default (props)=>{
    return(
        <React.Fragment>
            <h5>Индивидуальные планы преподавателя</h5>
    <ul key={Math.random()*100}>
        {props.data.map(item=>{
                return(
                    <li>
                        <span
                            key={item.id}
                            className={classes.list_a}
                            style={
                                {
                                    marginBottom: '10px',
                                    cursor:'pointer',
                                }
                            }
                            onClick={(event)=>{
                                let link = 'ind_plan'
                                props.loadingFile(event, item, link)
                            }}
                        >{item.name}</span><DeleteIcon
                        className={classes.deleteIcon}
                        onClick={(event)=>{
                            console.log(`delete ${item.name}`)
                            props.openModalDelete(item.id)
                        }}
                    /><br/>
                    </li>
                )
            })
        }
    </ul>
        </React.Fragment>
    )
}
