import React from "react";
import {link} from "../../../Link";
import {Button} from "@material-ui/core";

export default (props)=>{
    return(
        <React.Fragment>
            <h5>Дисциплины закрепленные<br/> за преподавателем</h5>
            <ul key={Math.random()*100}>
                {props.data.map(item=>{
                    return(
                        <li
                            key={item.id + Math.random()*100}
                            style={{marginBottom: '10px'}}
                            // onClick={(event)=>{
                            //     props.isApprov(!item.is_approved, item, item.id)
                            // }}
                        /*>{item.name} {item.is_approved?'Подтверждено':'Не подтверждено'}</li>*/
                            >{item.name}</li>
                    )
                })
                }
            </ul>
        </React.Fragment>
    )
}
