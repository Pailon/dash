import React, { Component } from 'react';
import './Prep.css';
import {prep} from '../info/inform.js'



class App extends React.Component {

  render() {
  return (
    <div>
      <div className="Prep">
        <h2>{prep.first_name} {prep.second_name}</h2>

        <div className='blok1'>
          <p className='p-block1'>Номер: {prep.num}</p>
          <p className='p-block1'>Возраст: {prep.old}</p>
          <p className='p-block1'>E-mail: {prep.email}</p>
        </div>

        <div className='blok2'>
          <p className='p-block2'>Степень: {prep.stepen}</p>
          <p className='p-block2'>Звание: {prep.zvanie}</p>
          <p className='p-block2'>Должность: {prep.doljnost}</p>
        </div>

      </div>

    </div>


  )

}
}



export default App;
