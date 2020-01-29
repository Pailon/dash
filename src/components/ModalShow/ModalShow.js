import React, {Component} from 'react'
import Modal from './Modal'

export default class ModalShow extends Component{

    state = {
        teatchers:[
            {
                id:1,
                teatcher:{
                    name:'Антон',
                    secondName:'Антонов',
                    number:'+7 915 155 55 55',
                    old:'30',
                    email:'anton1@mail.ru',
                    step:'Доктор наук',
                    zvanie:'1',
                    indvidPaln:true
                }
    
            }
            
        ]
    }

    render(){
        return(
            <div>
                <Modal
                name={this.state.name}
                />
            </div>
        )
}
}

