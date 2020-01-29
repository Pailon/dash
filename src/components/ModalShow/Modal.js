import React from 'react'
import ReactDOM from 'react-dom'
import history from '../../history'

const Modal = props => {


    return ReactDOM.createPortal(
        <div onClick={() => history.push('/')} className='ui dimmer modals visible active'>
            <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
                <div className='header'>Преподователь {props.name}</div>
                <div className='content'>
                    Его данные
                    {props.number}
                    {props.old}
                    {props.email}
                    {props.step}
                    {props.zvanie}
                    {props.indvidPaln}
                </div>
                <div className='actions'>
                    <button onClick={() => history.push('/')} className='ui danger button'>Accet</button>
                    <button onClick={() => history.push('/')} className='ui button'>Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal