import React from 'react'

export default (props) => {

    return (
        // <div className={`alert alert-${props.color} mt-2`} role="alert">
        //     {props.text}
        // </div>
        <div className={`alert alert-${props.color||'secondary'} alert-dismissible mt-4`} 
        role="alert"
        >
            <strong>{props.text}!</strong>
            <button type="button" className="close" aria-label="Close" onClick={props.onCloseAlert.bind(null)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )

}