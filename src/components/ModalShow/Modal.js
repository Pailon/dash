import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import { Rpd_data, Prep, Personalities } from '../../Data/Data'
import classes from './Modal.module.css'
import Button from '../../components/UI/Button/Button.js'

const ModalExampleTopAligned = (props) => (
  <Modal trigger={<Button type='primary' >Подробнее</Button>} centered={false}>
    <Modal.Header>Подробная информация</Modal.Header>
    <Modal.Content image
    
    >
      <Modal.Description>
        <Header>{Personalities[props.id].surname}</Header>
        <p>
          {Personalities[props.id].name}
        </p>
        <p>
          Дата рождения: {Personalities[props.id].birthday}
        </p>
        <p>
          Телефон: {Personalities[props.id].phone}
        </p>
        <p>
          E-mail: {Personalities[props.id].email}
        </p>
        
        <p></p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalExampleTopAligned