import React from 'react'

let array = ['Лодка', 'Машина', 'Таймер', 'Кран']


export default ({project}) => {
    return (
        <div className='container m-5 bg-light'>
            <h3>Куратор проектов</h3>
            <div className="input-group mb-3">

                <input 
                type="text" 
                className="form-control" 
                placeholder="Поиск" 
                aria-label="Поиск" 
                aria-describedby="button-addon2"/>

                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" id="button-addon2">Поиск</button>
                    </div>
            </div>
            <ul className="list-group">
                {project.map(item=>(
                    <li key={item} className="list-group-item">{item.name}</li>

                ))}
            </ul>

        </div>
    )

}