import React, {Component} from "react";
import {link} from "../../../Link";
import _ from "lodash";
import Loader from "../../../components/UI/Loader/Loader";
import TableSearch from "../../TableSearch/TableSearch";
import Button from "@material-ui/core/Button";

export default class Project_detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data,
            dataProj:'',
            isLoading:true,
        }
    }

   async componentDidMount() {
        let url = link + `/projects/${this.state.data.id}`
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        //console.log(token)
        try {
            const response = await fetch(url, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('Я ответ', response)
            const dataProj = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата proj', dataProj)
            let newBeginDate = dataProj.project.begin_date.split('T')
            let newEndDate = dataProj.project.end_date.split('T')
            dataProj.project.begin_date = newBeginDate[0]
            dataProj.project.end_date = newEndDate[0]

            const newData = dataProj.project
            console.log(newData)
            this.setState({ // обновляем state
                isLoading: false,
                dataProj: newData //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }


    render() {
        return(
            <div className="container mt-5">
                {
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        : <div className="row">
                            <div className="col-4">
                                <p>Название проекта: <strong>{this.state.dataProj.name}</strong></p>
                                <p>Временные рамки проекта: <strong>{this.state.dataProj.begin_date}</strong> - <strong>{this.state.dataProj.end_date}</strong></p>
                                <p>Ссылка на проект в Trello: <strong>{this.state.dataProj.link_trello}</strong></p>
                                <p>Описание проекта: {this.state.dataProj.description}</p>
                            </div>
                            <div className="col-4">1</div>
                            <div className="col-4">2</div>
                        </div>
                }

            </div>
        )
    }

}