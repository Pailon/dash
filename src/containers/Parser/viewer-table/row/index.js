import React from 'react';
import { Cell } from '../cell/index';
import './style.css';

function Row(props) {
    const listItems = [];
    const alph=props.cols.map((Igor)=>Igor.name)
    for (let i = 0; i < props.cols.length; i++) {
        listItems.push(<Cell key={i} value={props.data[props.shrek][alph[i]]} id={{col:alph[i], row:(props.shrek+1).toString()}} clck={props.clck} dblclck={props.dblclck}></Cell>);
    }
    return (
        <div className="divTableRow">
        {listItems}</div>
    )
}

export { Row };