import React from 'react'

export default ({person}) =>(
    
    <div className='container'>
        
        <p>Выбранный пользователь <b>{person.name + ' ' + person.patronymic + ' ' + person.surname}</b></p>
        <p>Должность: <b>{person.position}</b></p>
        <p>Электронный адрес: <b>{person.email}</b></p>
        <p>Телефон: <b>{person.phone}</b></p>
        <p>

            Подробности<br/>
            Ставка: <b>{person.rate}</b><br/>
            Рабочих часов: <b>{person.hours_worked}</b><br/>
            RINC: <b>{person.rinc}</b><br/>
            Степень:<b>{person.degree_id}</b><br/>
        </p>
    </div>
)