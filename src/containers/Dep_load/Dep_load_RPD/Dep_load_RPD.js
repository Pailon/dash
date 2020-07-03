import React, {Component} from "react";
import {link} from "../../../Link";
import _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";


export default class Depa_load_RPD extends Component{

    constructor(props) {
        super(props);
        this.state ={
            data: this.props.location.data,
            dataTeatchers:[],
            teatcher_id:''
        }
        this.choiseTeatcher = this.choiseTeatcher.bind(this)
    }

   async componentDidMount() {
        console.log(this.state.data)

        let url = link + '/teachers'
        //console.log(url1)
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
            //console.log('Я ответ', response)


            const dataTeatchers = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я ответ dataTeatchers', dataTeatchers)
            this.setState({ // обновляем state
                isLoading: false,
                dataTeatchers //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }

    renderOptions(){
        return this.state.dataTeatchers.map((item)=>{
            return(
                <MenuItem
                    key={item.name}
                    value={item.id}
                >
                    {item.surname}
                </MenuItem>
            )
        })
    }
   async choiseTeatcher(){

        const {teatcher_id, data} = this.state
        let url = link + '/dep_load/discipline/teacher'
        //console.log(url1)
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        //console.log(token) //проверяем взяли ли токен
        let fetchData = {
            discipline_id: data.id,
            teacher_id: teatcher_id
        }
       console.log(fetchData)
        try {

            const response = await fetch(url, {
                method: 'POST', //метот для получения данных
                body:JSON.stringify(fetchData),
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            //console.log('Я ответ', response)


            const resJson = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я ответ добавления', resJson)
            // this.setState({ // обновляем state
            //     isLoading: false,
            //     dataTeatchers //: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            // })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }


    render() {
        return(
            <div className='container'>
                <div className="row">
                    <div className="col">

                        <Link to={{
                            pathname: "/dep_load_detail",
                            propsId: this.props.location.data.id,
                        }}>
                            {/* <FA name='external-link-square-alt'/>  */}
                            Назад
                        </Link>
                        <TextField
                            margin="dense"
                            id="teacher_id"
                            label="Ответственный преподаватель"
                            type="text"
                            fullWidth={true}
                            //error={!!this.state.errors.teatcher_id}
                            //helperText={this.state.errors.teatcher_id}
                            onChange={(event) => this.setState({ teatcher_id: event.target.value })}
                            defaultValue=''
                            select
                            style={{height: '300px', width:'500px'}}
                        >
                            {this.renderOptions()}
                        </TextField>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.choiseTeatcher}
                            className="mb-2"
                        >Назначить преподавателя
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

}