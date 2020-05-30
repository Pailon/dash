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
import SaveFile from "./SaveFile/SaveFile";
import { saveAs } from 'file-saver';



export default class Teatcher extends Component{

    constructor(props) { //конструктор этого класса
        super(props);
        this.loadingFile = this.loadingFile.bind(this)
    }

    state = {
        data:[],
        dataProj:[],
        projTeactcher:[],
        dataFiles:[],
        dataFile:[],
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
            //console.log('Я ответ data', data)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                data
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        let url1 = link + `/teachers/${this.props.location.propsItem.id}/files`

        try {

            const response = await fetch(url1, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)


            const dataFiles = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я ответ dataFiles', dataFiles)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataFiles
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        let url2 = link + '/projects'


        try {

            const response = await fetch(url2, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)
            const dataProj = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я ответ', dataProj)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataProj,
                url
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }

    filterProj(){
        this.state.dataProj.map((item)=>{
            if(item.teacher_id === this.props.location.propsItem.id){
                this.state.projTeactcher.push(item)
            }
        })
        //console.log('Project',this.state.projTeactcher)
    }


   async loadingFile(event,item){
        event.preventDefault()
        console.log(item)

       let url = link + `/uploads/ind_plan/${item.id}`

       const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
       //console.log(token) //проверяем взяли ли токен
       try {

           fetch(url, {
                   method: 'GET', //метот для получения данных
                   headers: {
                       //'Content-Type': 'application/json',//заголовки обязателны для получения данных
                       'Authorization': `Bearer ${token}`
                   }
               }).then(res => {
               console.log(res);
               return res.blob();
           })
               .then(blob => {
                   saveAs(blob, `${item.name}`)
               })


           this.setState({ // обновляем state
               isLoading: false,
               // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка

           })
       } catch (e) { // на случай ошибки
           console.log(e)
       }


    }



    render(){
        //console.log('dataProj',this.state.dataProj)
        //console.log('data',this.state.data)
        if (!this.props.location.propsItem) return <Redirect to="/" />;
        //console.log(this.props.location.propsItem)
        return(
                <div className='container mt-5'>
                    {        this.filterProj()
                    }

                    <div className='row'>
                        <button type="button" className="btn btn-link"><Link to='/'>Назад</Link> </button>
                    </div>
                    <div className='row'>
                        <div className='col-4 ml-5'>
                            <TeatcherInfo
                                person ={this.props.location.propsItem}
                            />
                        </div>
                        <div className='col-4 ml-5'>
                            <Uploader
                                item ={this.props.location.propsItem}
                            />
                        </div>
                        <div className='col-2 ml-5'>
                            <SaveFile
                            data={this.state.dataFiles}
                            loadingFile={this.loadingFile}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-2 ml-5'>
                            {/*<div className={classes.discip}>*/}
                            {/*    <Discip/>*/}
                            {/*</div>*/}
                            <div className={classes.curator}>
                                <Curator
                                    project={this.state.projTeactcher}
                                />
                            </div>
                        </div>
                    </div>

                </div>
        )
    }
}