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
import RPD from "./RPD/RPD";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";



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
        dataRPD:[],
        isLoading:true,
        row:null,
        checked:false,
        discipline_id:'',
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
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        let url3 = link + `/dep_load/discipline/teacher/${this.props.location.propsItem.id}`

        try {

            const response = await fetch(url3, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)
            const dataRPD = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я ответ dataRPD', dataRPD)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataRPD,
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
    }


   async loadingFile(event,item){
        event.preventDefault()
        console.log(item)

       let url

       url = link + `/uploads/ind_plan/${item.id}`

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

    renderOptionsRpd(){
        return this.state.dataRPD.map((item)=>{
            return(
                <MenuItem
                    key={item.name}
                    value={item.id}
                >
                    {`${item.name} id${item.id}`}
                </MenuItem>
            )
        })
    }



    render(){
        if (!this.props.location.propsItem) return <Redirect to="/" />;
        this.state.projTeactcher = []
        return(
                <div className='container mt-5'>
                    {
                        this.filterProj()
                    }
                    <div className='row'>
                        <button type="button" className="btn btn-link"><Link to='/'>Назад</Link> </button>
                    </div>
                    <div className='row'>
                        <div className='col-4 ml-5'>
                            <TeatcherInfo
                                person ={this.props.location.propsItem}
                            />
                            <Curator
                                project={this.state.projTeactcher}
                            />
                        </div>
                        <div className='col-4 ml-5'>
                            <div className="container">
                                <div className="row">
                                    <React.Fragment>
                                        <div className='col-1 ml-5'>
                                            <p>Индив. план</p>
                                        </div>
                                        <div className='col-1 ml-5 mr-5'>
                                            <Switch
                                                defaultChecked
                                                checked={this.state.checked}
                                                color="default"
                                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                onChange={(event) => {
                                                    console.log(event.target.checked)
                                                    this.setState({ checked: event.target.checked })
                                                }}
                                            />
                                        </div>
                                        <div className='col-1 ml-3'>
                                            <p>РПД</p>
                                        </div>
                                    </React.Fragment>
                                </div>
                            </div>
                            <Uploader
                                item = {this.props.location.propsItem}
                                link = {this.state.checked}
                                data = {this.state.dataRPD}
                                discipline = {this.state.discipline_id}
                            />
                            {this.state.checked
                            ?<TextField
                                    margin="dense"
                                    id="rpd"
                                    label="Выберете дисциплину для загрузки РПД"
                                    type="text"
                                    fullWidth={true}
                                    //error={!!this.state.errors.group_id}
                                    //helperText={this.state.errors.group_id}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.setState({ discipline_id: event.target.value })
                                    }}
                                    select
                                >
                                    {this.renderOptionsRpd()}
                                </TextField>
                            :null}
                            <RPD
                                data={this.state.dataRPD}
                                loadingFile={this.loadingFile}
                                className='mt-5'
                            />

                        </div>
                        <div className='col-1 ml-5'>
                            <SaveFile
                            data={this.state.dataFiles}
                            loadingFile={this.loadingFile}
                            />
                        </div>
                    </div>
                    {/*<div className='row'>*/}
                    {/*    <div className='col-2 ml-5'>*/}
                    {/*        /!*<div className={classes.discip}>*!/*/}
                    {/*        /!*    <Discip/>*!/*/}
                    {/*        /!*</div>*!/*/}
                    {/*        <div className={classes.curator}>*/}
                    {/*            <Curator*/}
                    {/*                project={this.state.projTeactcher}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
        )
    }
}