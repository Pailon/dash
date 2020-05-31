import React from "react";
import {link} from "../../../Link";
import {Button} from "@material-ui/core";

export default (props)=>{
    return(
        <React.Fragment>
            <h5>Файлы преподавателя</h5>
    <ul key={Math.random()*100}>
        {props.data.map(item=>{
                return(
                <li
                    key={item.id}
                    style={{marginBottom: '10px'}}
                    onClick={(event)=>{
                        props.loadingFile(event, item)
                    }}
                >{item.name}</li>
                )
            })
        }
    </ul>
        </React.Fragment>
    )
}
