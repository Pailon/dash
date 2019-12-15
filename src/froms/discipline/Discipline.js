import React from 'react';
import './Discipline.css';
import {discip} from '../../froms/info/inform'



class Discipline extends React.Component {

  render() {
  return ( 
      <div className='Discipline'>
        {/* {/* <h2>Введите название дисциплины</h2>
        <input type="text" size="40"></input> 
        <p><input type="submit" value="Найти"></input></p> */}
        <h2>Дисциплина - {discip.name}</h2>
        <div className='p_blok1'>
          <p className='p_blok1'>Лабораторных работ: {discip.lr} ч.</p>
          <p className='p_blok1'>Лекций: {discip.lek} ч.</p>
          <p className='p_blok1'>Экзамен: {discip.exam} ч.</p>
          {/* <p>Приклепляемый файл <input type="file"></input></p> */}
        </div>
      </div>
  )
}
}


export default Discipline;