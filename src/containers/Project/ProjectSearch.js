import React, {useState} from 'react'

//компонент поиска данных в таблице написанный на react hooks


export default (props) => {

    const [value, setValue] = useState('') 

    const valueChangeHandler = event =>{
        setValue(event.target.value)
    }


    return (
        <div className="input-group mb-3 mt-5">   
            <div className="input-group-prepend">
                <button 
                className="btn btn-outline-secondary" 
                id="button-addon1"
                onClick={()=> props.onSearch(value)}
                >
                    Поиск</button>
            </div>
            <input 
            type="text" 
            className="form-control"
            value={value}
            onChange={valueChangeHandler}
            />
        </div>
    )
}