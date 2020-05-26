import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import TeatcherInfo from './TeatcherInfo/TeatcherInfo'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Curator from './Curator/Curator.js'
import Discip from './Discip/Discip'
import classes from './Teatcher.module.css'
import {link} from "../../Link";
import Uploader from "../../components/Uploader/Uploader";



export default class Teatcher extends Component{

    state = {
        data:[],
        isLoading:true,
        row:null,
    }

    async componentDidMount(){

        //let url = 'http://dashboard.kholodov.xyz/api/teachers'
        let url = link + '/teachers'

        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        //console.log(token) //проверяем взяли ли токен
        try {

            const response = await fetch(url, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)


            const data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я ответ', data)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }



    render(){
        if (!this.props.location.propsItem) return <Redirect to="/" />;
        //console.log(this.props.location.propsItem)
        return(
                <div className='container mt-5'>
                    <button type="button" className="btn btn-link"><Link to='/'>Назад</Link> </button>
                    
                        <TeatcherInfo
                            person ={this.props.location.propsItem}
                        />

                        <Uploader
                            item ={this.props.location.propsItem}
                        />

                        <div className={classes.discip}><Discip/></div>
                        <div className={classes.curator}><Curator/></div>

                </div>
        )
    }
}