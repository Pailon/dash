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

        }
        this.postStudent = this.postStudent.bind(this)
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
               isLoading: false,
               dataGroup //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
           })

       } catch (e) { // на случай ошибки
           console.log(e)
       }




    }

    async getStudents(id){
        let url3 = link + `/students/group/${id}`
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        try {
            const response = await fetch(url3, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            //console.log('Я ответ', response)
            const dataStudents = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
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
                        value={item.id}
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
                    <li
                        key={item.student_id}
                    >
                        {`${item.name} ${item.surname} ${item.student_id}`}
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
                const json = await response.json();
                console.log('Успех:', JSON.stringify(json));// результат запроса
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

            this.componentDidMount()
        }else{
            this.setState({openAlert:true, color:'danger', text:'Такой студент уже есть на данном проекте'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }

    }

    onCloseAlert = () => {
        this.setState({ openAlert: false }) // закрыть окно оповещения
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
                        : <div className="row">
                            <div className="col-4">
                                <h4>Информация о проекте</h4>
                                <p>Название проекта: <strong>{this.state.dataProj.name}</strong></p>
                                <p>Временные рамки проекта: <strong>{this.state.dataProj.begin_date}</strong> - <strong>{this.state.dataProj.end_date}</strong></p>
                                <p>Ссылка на проект в Trello: <strong>{this.state.dataProj.link_trello}</strong></p>
                                <p>Описание проекта: {this.state.dataProj.description}</p>
                            </div>
                            <div className="col-4">
                                <h4>Добавить студента на проект</h4>
                                <TextField
                                    margin="dense"
                                    id="group_id"
                                    label="Группа студента"
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
                                            id="group_id"
                                            label="Группа студента"
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
                            <div className="col-4">
                                <h4>Студенты участвующие в проекте</h4>
                                <ul>
                                    {this.renderListStudents()}
                                </ul>
                            </div>
                        </div>
                }

            </div>
        )
    }

}