import React from 'react'

export default ({person}) =>(
    <div>
        <p>Выбранный пользователь <b>{person.name + ' ' + person.surname}</b></p>

        <p>
            Подробности<br/>
            Ставка: <b>{person.rate}</b><br/>
            Рабочих часов: <b>{person.hours_worked}</b><br/>
            RINC: <b>{person.rinc}</b><br/>
            Степень:<b>{person.degree_id}</b><br/>
        </p>
    </div>
)