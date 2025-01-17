import React, {Component} from "react";
import {link} from "../../../Link";
import _ from "lodash";
import Loader from "../../../components/UI/Loader/Loader";
import TableSearch from "../../TableSearch/TableSearch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "../../../components/UI/Alert/Alert";
import {Link} from "react-router-dom";
import UploaderProject from "../../../components/Uploader/UploaderProject";
import Uploader from "../../../components/Uploader/Uploader";
import classes from "../../Teatcher/Teatcher.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { saveAs } from 'file-saver';
import ModalWindow from "../../../components/ModalWindow/ModalWindow";


export default class Project_detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data,
            dataProj:'',
            dataGroup:'',
            dataStudents:'',
            isLoading:true,
            loadingStudents:true,
            group_id:'',
            student:'',
            openAlert: false,//видно ли окно оповещения
            dataProject_files:'',
            openModalDelete:false,
            id_delete:'',

        }
        this.postStudent = this.postStudent.bind(this)
        this.onAgreeDelete = this.onAgreeDelete.bind(this)
        this.onCloseDelete = this.onCloseDelete.bind(this)
        this.openModalDelete = this.openModalDelete.bind(this)
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
            let newBeginDate = dataProj.begin_date.split('T')
            let newEndDate = dataProj.end_date.split('T')
            dataProj.begin_date = newBeginDate[0]
            dataProj.end_date = newEndDate[0]

            const newData = dataProj
            console.log('newdata',newData)
            this.setState({ // обновляем state
                //isLoading: false,
                dataProj: newData //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }

       let url1 = link + '/groups'

       //console.log(token)
       try {
           const response = await fetch(url1, {
               method: 'GET', //метот для получения данных
               headers: {
                   'Content-Type': 'application/json',//заголовки обязателны для получения данных
                   'Authorization': `Bearer ${token}`
               }
           })
           //console.log('Я ответ', response)


           const dataGroup = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
           console.log('Я дата dataGroup', dataGroup)
           this.setState({ // обновляем state
               //isLoading: false,
               dataGroup //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
           })

       } catch (e) { // на случай ошибки
           console.log(e)
       }

       console.log('this.state.data.id',this.state.data.id)
       let url2 = link + `/projects/${this.state.data.id}/files`

       try {

           const response = await fetch(url2, {
               method: 'GET', //метот для получения данных
               headers: {
                   'Content-Type': 'application/json',//заголовки обязателны для получения данных
                   'Authorization': `Bearer ${token}`
               }
           })
           // console.log('Я ответ', response)
           //const dataProject_files = JSON.stringify(response) // Запоминаем ответ сервера в переменную data которая есть в state
           const dataProject_files = await response.json()
           console.log('Я ответ dataProject_files', dataProject_files)
           this.setState({ // обновляем state
               dataProject_files,
               isLoading: false,
           })
       } catch (e) { // на случай ошибки
           console.log(e)
       }
    }

    async loadingFile(event,item){
        event.preventDefault()
        console.log(item)

        let url

        url = link + `/uploads/projects/${item.id}`

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
            await this.componentDidMount()
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }

    renderListProjectFiles(){
        return this.state.dataProject_files.map((item)=>{
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
                            // let link = 'rpd'
                            this.loadingFile(event, item)
                            console.log('Хочу скачать')
                        }}
                    >
                        {`${item.name}`}

                    </span><DeleteIcon
                    className={classes.deleteIcon}
                    onClick={(event)=>{
                        console.log(`delete ${item.name}`)
                        this.openModalDelete(item.id)

                    }}
                /><br/>
                </li>
            )
        })
    }

    async getStudents(id){
        let url3 = link + `/students?filter=group_name%20eq%20'${id}'&orderBy=birthday%20DESC&limit=2&offset=2`
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        try {
            const response = await fetch(url3, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('Я ответ', response)
             const dataStudents = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //const dataStudents = JSON.parse(response)
            console.log('Я дата студенты 2 специальности', dataStudents)
            this.setState({ // обновляем state
                loadingStudents: false,
                dataStudents //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }

    renderOpionsGroup(){
        if(this.state.dataGroup) {
            return this.state.dataGroup.map((item) => {
                return (
                    <MenuItem
                        key={item.name}
                        value={item.name}
                    >
                        {item.name}
                    </MenuItem>
                )
            })
        }else{
            return 'Отсудствуют'
        }
    }

    renderOpionsStudents(){
        console.log(this.state.dataStudents)
        if(!this.state.dataStudents.message || this.state.dataStudents.length>1) {
            return this.state.dataStudents.map((item) => {
                return (
                    <MenuItem
                        key={item.name}
                        value={item.id}
                    >
                        {`${item.id} ${item.name} ${item.surname}`}
                    </MenuItem>
                )
            })
        }else{
            return (
                <MenuItem
                    key='1233'
                >
                    Отсудствуют
                </MenuItem>
            )
        }
    }

    renderListStudents(){

        if(this.state.dataProj.students === null){
            this.state.dataProj.students = {
                1:''
            }
        }

        if(this.state.dataProj.students.length > 1){
            return this.state.dataProj.students.map((item)=>{
                return(
                    <li>
                    <span
                        key={item.student_id}
                    >
                        {`${item.name} ${item.surname} ${item.student_id}`}
                    </span>
                    {/*</span><DeleteIcon*/}
                    {/*    className={classes.deleteIcon}*/}
                    {/*    onClick={(event)=>{*/}
                    {/*        console.log(`delete ${item.name}`)*/}
                    {/*        this.removeStudent(item.student_id, this.state.dataProj.students)*/}

                    {/*    }}*/}
                    {/*/><br/>*/}
                    <br/>
                    </li>
                )
            })
        }else if(this.state.dataProj.students.length === 1){
            return(
                <li
                    key={this.state.dataProj.students[0].student_id}
                >
                    {`${this.state.dataProj.students[0].name} ${this.state.dataProj.students[0].surname} ${this.state.dataProj.students[0].student_id}`}
                </li>
            )
        } else{
            return 'Студенты отсудствуют'
        }

    }
   async postStudent(){

        let result = false

       if(this.state.dataProj.students === null){
           this.state.dataProj.students = {
               1:' '
           }
       }


       if(this.state.dataProj.students.length>0){
           for(let i=0; i<this.state.dataProj.students.length; i++){
               if(this.state.dataProj.students[i].student_id === this.state.student){
                   result = true
               }
           }
       }


        if(!result){
            let studentPost = {
                students_ids:[this.state.student]
            }
            console.log('id', this.state.data.id)
            let url = link + `/projects/${this.state.data.id}/students`
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                    method: 'PUT', // или 'POST'
                    body: JSON.stringify(studentPost), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('studentPost',studentPost)//выводит обьект того, что добавлено на сервер
                studentPost = {}//обнулили буферный обьект для нового преподавателя
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
                this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }

            await this.componentDidMount()
        }else{
            this.setState({openAlert:true, color:'danger', text:'Такой студент уже есть на данном проекте'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }

    }

    removeStudent(id, listStudents){
        console.log('Щас удалю', id, 'из', listStudents)
    }

    onCloseAlert = () => {
        this.setState({ openAlert: false }) // закрыть окно оповещения
    }

    onCloseDelete(){
        this.setState({openModalDelete: false})
    }

    async onAgreeDelete(){
        this.setState({openModalDelete: false})
        console.log('Удалим - ',this.state.id_delete)

        let url = link + `/uploads/projects/${this.state.id_delete}`
        const token = localStorage.getItem('token')// взяли токен

        try {
            const response = await fetch(url, {
                method: 'DELETE', // или 'PUT'
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)

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



    render() {
        return(
            <div className="container mt-5">
                <button type="button" className="btn btn-link"><Link to='/project'>Назад</Link> </button>
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
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        :
                        <React.Fragment>
                        <div className="row">
                            <div className="col-3">
                                <h4>Информация о проекте</h4>
                                <p>Название проекта: <strong>{this.state.dataProj.name}</strong></p>
                                <p>Временные рамки проекта: <strong>{this.state.dataProj.begin_date}</strong> - <strong>{this.state.dataProj.end_date}</strong></p>
                                <p>Ссылка на проект в Trello: <strong>{this.state.dataProj.link_trello}</strong></p>
                                <p>Описание проекта: {this.state.dataProj.description}</p>
                            </div>
                            <div className="col-3">
                                <h4>Добавить студента на проект</h4>
                                <TextField
                                    margin="dense"
                                    id="group_id"
                                    label="Выберете группу студента"
                                    type="text"
                                    fullWidth={true}
                                    //error={!!this.state.errors.group_id}
                                    //helperText={this.state.errors.group_id}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.getStudents(event.target.value)
                                        this.setState({ group_id: event.target.value })
                                        console.log('Ищу студентов')
                                    }}
                                    select
                                >
                                    {
                                        this.renderOpionsGroup()
                                    }
                                </TextField>

                                {
                                    this.state.group_id

                                    ?<React.Fragment>
                                        <TextField
                                            margin="dense"
                                            id="student_id"
                                            label="Выберете студента"
                                            type="text"
                                            fullWidth={true}
                                            //error={!!this.state.errors.group_id}
                                            //helperText={this.state.errors.group_id}
                                            onChange={(event) => {
                                                console.log(event.target.value)
                                                this.setState({ student: event.target.value })

                                            }}
                                            select
                                        >
                                            {
                                                this.state.loadingStudents
                                                ?<Loader />
                                                :this.renderOpionsStudents()
                                            }
                                        </TextField>
                                        <Button
                                            //color="primary"
                                            style={{backgroundColor:'#007cff', color:'white'}}
                                            size="small"
                                            variant="contained"
                                            onClick={this.postStudent}
                                            className="mb-2"
                                        >Добавить студента</Button>
                                    </React.Fragment>
                                    :null
                                }

                            </div>
                            <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                <h4>Студенты участвующие в проекте</h4>
                                <ul>
                                    {this.renderListStudents()}
                                </ul>
                            </div>

                            <div className="col-3">
                                <h4>Загрузить файлы по проекту</h4>
                                <UploaderProject
                                    item = {this.props.location.item}
                                    project_id = {this.state.data.id}
                                />
                            </div>
                        </div>
                            <div className="row mt-5">
                                <div className="col-3" style={{height: '300px', width: '300px', overflow:'auto'}}>
                                    <h4>Файлы прикрепленные к проекту</h4>
                                    {this.renderListProjectFiles()}
                                </div>
                                <div className="col-3">

                                </div>
                                <div className="col-3">

                                </div>
                                <div className="col-3">

                                </div>
                            </div>
                        </React.Fragment>
                }


                <ModalWindow
                    openModal ={this.state.openModalDelete}
                    onClose={this.onCloseDelete}
                    onAgree={this.onAgreeDelete}
                    title = {'Вы действительно хотите удалить данные?'}
                    content = {'При удалении произойдет так же удаление всех связанных данных'}
                />

            </div>
        )
    }

}