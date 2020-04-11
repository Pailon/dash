import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'
import { Rpd_data, Prep, Personalities } from '../../Data/Data'
import classes from './Modal.module.css'
import Button from '../../components/UI/Button/Button.js'
import Input from '../UI/Input/Input'

const ModalExampleTopAligned = (props) => (
  <Modal trigger={<Button type='primary' >Подробнее</Button>} centered={false}>
    <Modal.Header>Подробная информация</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Раз</Header>
        <p>
          Два
          <Input/>
        </p>
        <p>
          Дата рождения: Три
        </p>
        <p>
          Телефон: Четыре
        </p>
        <p>
          E-mail: Пять
        </p>
        
        <p></p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalExampleTopAligned