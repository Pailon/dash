import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Drawer extends Component {

    clickHandler= () =>{
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>

                </li>
            )
        })
    }
    render() {

        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [

        ]

        if(this.props.isAuthenticated){
            links.push({to: '/dashboard', label:'Дашборд', exact:false})
            links.push({to: '/quizlist', label:'Преподаватели', exact:false})
            links.push({to: '/project', label:'Проектная деятельность', exact:false})
            links.push({to: '/group', label:'Группы', exact:false})
            links.push({to: '/students', label:'Студенты', exact:false})
            links.push({to: '/specialties', label:'Специальности', exact:false})
            links.push({to: '/acad_plan', label:'Академический план', exact:false})
            links.push({to: '/dep_load', label:'Нагрузка', exact:false})
            links.push({to: '/department', label:'Кафедры', exact:false})
            links.push({to: '/parser', label:'Загрузка данных', exact:false})
            links.push({to: '/logout', label:'Выход', exact:false})
            // links.push({to: '/test_dash', label:'Тест', exact:false})
        }else{
            links.push({to: '/', label:'Авторизация', exact:true})
        }

        return (

            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen? <Backdrop onClick={this.props.onClose} />: null}
            </React.Fragment>
        )
    }
}

export default Drawer

