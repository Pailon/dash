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
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Alert from "../../components/UI/Alert/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalWindow from "../../components/ModalWindow/ModalWindow";



export default class Teatcher extends Component{

    constructor(props) { //конструктор этого класса
        super(props);
        this.loadingFile = this.loadingFile.bind(this)
        this.isApprov = this.isApprov.bind(this)
        this.openModal = this.openModal.bind(this)
        this.onAgreeDelete = this.onAgreeDelete.bind(this)
        this.onCloseDelete = this.onCloseDelete.bind(this)
        this.openModalDelete = this.openModalDelete.bind(this)
    }

    state = {
        data:[],
        dataProj:[],
        projTeactcher:[],
        dataFiles:[],
        dataFile:[],
        dataRPD:[],
        dataRPD_files:[],
        isLoading:true,
        row:null,
        checked:false,
        discipline_id:'',
        openModal:false,
        newPassword:'',
        openAlert: false,//видно ли окно оповещения
        openModalDelete:false,
        id_delete:'',

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
                //isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                data
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        let url1 = link + `/teachers/${this.props.location.propsItem.id}/files_ind_plan`

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
            //console.log('Я ответ dataFiles', dataFiles)
            this.setState({ // обновляем state
                //isLoading: false,
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
                //isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataProj,
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        //let url3 = link + `/dep_load/discipline/teacher/${this.props.location.propsItem.id}`
        let url3 = link + `/teachers/${this.props.location.propsItem.id}/disciplines`

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
            //console.log('Я ответ dataRPD', dataRPD)
            this.setState({ // обновляем state
                //isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataRPD,
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }

        //let url4 = link + `/dep_load/discipline/teacher/${this.props.location.propsItem.id}/files`
        let url4 = link + `/teachers/${this.props.location.propsItem.id }/files_rpd`

        try {

            const response = await fetch(url4, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)
            const dataRPD_files = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я ответ dataRPD', dataRPD_files)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                dataRPD_files,
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


   async loadingFile(event,item, link){
        event.preventDefault()
        //console.log(item)

       let url

       url = link + `/uploads/${link}/${item.id}`

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
               //console.log(res);
               return res.blob();
           })
               .then(blob => {
                   saveAs(blob, `${item.name}`)
               })


           this.setState({ // обновляем state
               isLoading: false,
               // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка

           })
           this.componentDidMount()
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

    renderListRpd(){
        return this.state.dataRPD_files.map((item)=>{
            return(
                <li>
                    <span
                        key={item.name}
                        className={classes.list_a}
                        style={{
                            cursor:'pointer',
                        }}
                        //value={item.id}
                        onClick={(event)=>{
                            let link = 'rpd'
                            this.loadingFile(event, item, link)
                        }}
                    >
                        {`${item.name}`}

                    </span><DeleteIcon
                    className={classes.deleteIcon}
                    onClick={(event)=>{
                        //console.log(`delete ${item.name}`)
                        this.openModalDelete(item.id)

                    }}
                /><br/>
                </li>
            )
        })
    }

    onCloseDelete(){
        this.setState({openModalDelete: false})
    }

    async onAgreeDelete(){
        this.setState({openModalDelete: false})
        //console.log('Удалим - ',this.state.id_delete)

        let url = link + `uploads/rpd/${this.state.id_delete}`
        const token = localStorage.getItem('token')// взяли токен

        try {
            const response = await fetch(url, {
                method: 'DELETE', // или 'PUT'
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            //console.log(response)

            if(response.status === 204) {
                this.setState({openAlert: true, color: 'success', text: 'Успешно'}, () => {
                    window.setTimeout(() => {
                        this.setState({openAlert: false})
                    }, 2000)
                });
            }
            if (response.status === 409) {
                this.setState({openAlert: true, color: 'danger', text: 'Удаление невозможно'}, () => {
                    window.setTimeout(() => {
                        this.setState({openAlert: false})
                    }, 2000)
                });
            }
            await this.componentDidMount()

        } catch (error) {
            console.error('Ошибка:', error); //выдаёт ошибку в консоль
            this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }
    }

    openModalDelete(id){
        this.setState({openModalDelete: true, id_delete:id})
    }



   async isApprov(data, item, id){
        //функция обновления данных в таблице, получает от таблицы
        //console.log(data)                    //data-значение которое меняют item-весь обьект, в котором значение меняют id oldData
        //console.log(item)                    //id-параметр из обьекта item чтобы проще производить запрос к api oldData-значение до изменения
        //console.log(oldData)

        //if (data !== oldData) { //узнаём изменилось ли значение функции, если нет, то зачем производить запрос?

            //let url = `http://dashboard.kholodov.xyz/api/groups/${id}` //ссылка для запросов, куда подставляется id
            let url = link + `/dep_load/discipline/${id}`
            const token = localStorage.getItem('token')//берем токен и локального хранилищя
            let putItem = item
            putItem.is_approved = data
            //console.log(putItem)

            try {
                const response = await fetch(url, { //производим запрос
                    method: 'PUT', // или 'POST'
                    body: JSON.stringify(putItem), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                //console.log(item)
                //this.setState({ openAlert: true, color: 'success', text: 'Изменено' })//при успешном отображении отображаем окно об успешноти
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
                item = {}
            } catch (error) {
                console.error('Ошибка:', error);//Отображаем ошибку в консоль
                //this.setState({ openAlert: true, color: 'danger', text: 'Произошла ошибка' })//Выводим окно ошибки
                this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
        // } else {
        //     console.log('Изменений не было')// а если мы ничего не меняли, скажем об этом в консоли
        //     this.setState({openAlert:true, color:'secondary', text:'Без изменений'},()=>{
        //         window.setTimeout(()=>{
        //             this.setState({openAlert:false})
        //         },2000)
        //     });
        // }
    }

    onClose = () => {
        //функция зарытия модального окна без завершения добавления преподавателя
        //обнуления буферных данных, и закрытие самого окна
        this.setState({
            openModal: false,
            newPassword: '',
            errors: {
                newPassword: '',
            }
        })
    }

    openModal(){
        this.setState({openModal:true})
    }

    async resetPassword(){
    let errors = {}
        if (!this.state.newPassword) {
            errors.newPassword = 'Это поле не может быть пустым'
        }

        if (errors.newPassword) {
            this.setState({ errors }) //добавление ошибок в state
            //console.log('Error');//для проверки выводим в консоль - временно
            return
        } else {

            let newPassword = {
                password: this.state.newPassword
            }
            this.setState({newPassword:'',openModal: false})

            let url = link + `/teachers/${this.props.location.propsItem.id}/password`
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                    method: 'PUT', // или 'POST'
                    body: JSON.stringify(newPassword), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                //const json = await response.json();
                //console.log('Успех:', JSON.stringify(json));// результат запроса
                //console.log(newPassword)//выводит обьект того, что добавлено на сервер
                newPassword = {}//обнулили буферный обьект для нового преподавателя
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
                // this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                //     window.setTimeout(()=>{
                //         this.setState({openAlert:false})
                //     },2000)
                // });
            }

        }

    }

    onCloseAlert = () => {
        this.setState({ openAlert: false }) // закрыть окно оповещения
    }


    render(){
        if (!this.props.location.propsItem) return <Redirect to="/" />;
        this.state.projTeactcher = []
        return(
                <div className='container mt-5'>
                    {
                        this.state.openAlert ?  //компонент вывода предупреждения
                            <Alert
                                color={this.state.color} //цвет оповещения
                                text={this.state.text} // текст в оповещении
                                onCloseAlert={this.onCloseAlert} // функция как закрыть это окошко
                            />
                            : null
                    }
                    {
                        this.filterProj()
                    }
                    <div className='row'>
                        <button type="button" className="btn btn-link"><Link to='/'>Назад</Link> </button>
                    </div>

                    <ModalWindow
                        openModal ={this.state.openModalDelete}
                        onClose={this.onCloseDelete}
                        onAgree={this.onAgreeDelete}
                        title = {'Вы действительно хотите удалить данные?'}
                        content = {'При удалении произойдет так же удаление всех связанных данных'}
                    />

                    <div className="row">
                        <div className="col-3" style={{height: '300px', width: '300px'}}>
                                    <TeatcherInfo
                                        person ={this.props.location.propsItem}
                                    />
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                    <Curator
                                        project={this.state.projTeactcher}
                                    />
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                    <h4>РПД преподавателя</h4>
                                    <ul>
                                        {this.renderListRpd()}
                                    </ul>
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                    <SaveFile
                                    data={this.state.dataFiles}
                                    loadingFile={this.loadingFile}
                                    openModalDelete={this.openModalDelete}
                                    />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-3" style={{height: '300px', width: '300px'}}>
                                    <Button
                                        style={{backgroundColor:'#007cff', color:'white'}}
                                        size="small"
                                        variant="contained"
                                        onClick={this.openModal}
                                        className="mb-2"
                                    >Изменить пароль</Button>
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                    <RPD
                                        data={this.state.dataRPD}
                                        loadingFile={this.loadingFile}
                                        isApprov={this.isApprov}
                                        className='mt-5'
                                    />
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px'}}>
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
                                            label="Выберете дисциплину"
                                            type="text"
                                            fullWidth={true}
                                            //error={!!this.state.errors.newPassword}
                                            //helperText={this.state.errors.newPassword}
                                            onChange={(event) => {
                                                console.log(event.target.value)
                                                this.setState({ discipline_id: event.target.value })
                                            }}
                                            select
                                        >
                                            {this.renderOptionsRpd()}
                                        </TextField>
                                        :null}
                                </div>
                            </div>
                        </div>
                        <div className="col-3" style={{height: '300px', width: '300px'}}>

                        </div>
                    </div>
                    <Dialog
                        open={this.state.openModal}
                        onClose={this.onClose.bind(this)}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Изменение пароля преподавателя</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Введите новый пароль
                            </DialogContentText>
                            <TextField   //все модули TextFiled это поля ввода имеющие несколько ключевых свойств
                                autoFocus
                                margin="dense"
                                id="newPassword"
                                label="Новый пароль" //описание поля ввода
                                type="password" //тип вводимой информации
                                fullWidth={true}
                                //error={!!this.state.errors.name}// true or false, отображать ошибку или нет
                                //helperText={this.state.errors.name} // текст отображаемый при ошибке
                                onChange={(event) => this.setState({ newPassword: event.target.value.trim() })} //функция которая вызывается при изменении значения
                                //функция записывает новое значение при
                                //каждом изменении в нужную  буферную переменную в state
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button  //компонент кнопки закрытия модального окна
                                onClick={this.onClose.bind(this)}
                                //color="primary"
                                style={{backgroundColor:'#007cff', color:'white'}}
                                size="small"
                                variant="contained"
                            >
                                Отмена
                            </Button>
                            <Button
                                //color="primary"
                                style={{backgroundColor:'#007cff', color:'white'}}
                                size="small"
                                variant="contained"
                                onClick={this.resetPassword.bind(this)}
                            >
                                Подтвердить
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
        )
    }
}