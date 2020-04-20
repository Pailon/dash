import React, { Component } from 'react'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import Table from '../../components/UI//Table/Table'
import _ from 'lodash'
import DetailRowView from '../../components/UI/DetailRowView/DetailRowView'
import ReactPaginate from 'react-paginate';
import TableSearch from '../../containers/TableSearch/TableSearch'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import $ from 'jquery'
window.$ = $;


// $(function(){
//     $('.edit').keypress(function(e){
//         if(e.which == 13){
//             return false
//         }
//     })
// })

var item = ''

export default class QuizList extends Component {



    state = {
        data: [],
        itemActive:false,
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortArrow: 'arrow-up',
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно/подробно
        currentPage: 0, //количество страниц на данный момент
        search: '', //что искать
        openModal:false,
        errorModal:false,
        item:'',
        name:'',
        surname:'',
        patronymic:'',
        email:'',
        phone:'',
        rank_id:'',
        degree_id:'',
        rate:'',
        hourse_worked:'',
        rinc:'',
        web_of_science:'',
        scopus:'',
        person_id:'',
        birthday:'',
        login:'',
        password:'',
        errors:{
            // id:'',
            name:'',
            surname:'',
            patronymic:'',
            email:'',
            phone:'',
            rank_id:'',
            degree_id:'',
            rate:'',
            hourse_worked:'',
            rinc:'',
            web_of_science:'',
            scopus:'',
            person_id:'',
            birthday:'',
            login:'',
            password:'',
        }
    }

    async componentDidMount() {

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        let url = 'http://dashboard.kholodov.xyz/api/teachers'
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
            console.log('Я ответ', data)
            this.setState({ // обновляем state
                isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })
        } catch (e) { // на случай ошибки
            console.log(e)
        }
        // var tds = document.querySelectorAll('td')
        //     for(var i=0; i<tds.length; i++){
        //         tds[i].addEventListener('click', function func(){
        //             var input = document.createElement('input')
        //             input.value = this.innerHTML
        //             this.innerHTML = ''
        //             this.appendChild(input)
        //             var td = this
        //             input.addEventListener('blur', function(){
        //                 td.innerHTML = this.value
        //                 item = this.value
        //                 td.addEventListener('click', func)
        //             })
        //             this.removeEventListener('click', func)
        //             console.log(item);
        //         })
        // }
        


        
        
    }

    onSort = (sortField) => { // функция для сортировки данных в таблице
        const clonedData = this.state.data.concat() // клонируем массив из state чтобы случайно не изменить исходные данные
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc' // выбор метода сортировки
        const sortArrow = this.state.sortArrow === 'arrow-up' ? 'arrow-down' : 'arrow-up'//выбор в какую сторону отображать "стрелочку"

        const data = _.orderBy(clonedData, sortField, sort) // создание нового объекта data при помощи библиотеки logash,  
        // которая на вход получала 3 параметра, необходимый массив, по какому полю фильтровать
        // и в какую сторону фильтровать

        this.setState({
            data,
            sort,
            sortField,
            sortArrow
        })

        

    }

    onRowSelect = row => {
        // функция для выборки строки для дальнейшей её дополнительной отрисовки
        this.setState({ row })
    }

    pageChangeHandler = ({ selected }) => {
        // функция для работы с страницами, при большом объёме данных
        this.setState({ currentPage: selected })
    }

    searchHandler = search => {
        // обновляет переменную для поиска данных и обнуляет счеткик страниц
        this.setState({ search, currentPage: 0 })
    }

    getFiltredData() {
        const { data, search } = this.state
        //фильтрация данных


        if (!search) {//если нечего фильтровать то отображать все данные
            return data
        }

        //иначе получаем поле для фильтра, приводим его к нижнему регистру на всякий случай на будущее, используем 
        //из state поле search и на основе него проводим поиск
        return data.filter(item => {
            return item['name'].toLowerCase().includes(search.toLowerCase())
                || item['surname'].toLowerCase().includes(search.toLowerCase())
                || item['patronymic'].toLowerCase().includes(search.toLowerCase())
                || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }

    newTeatcher = () => {
        this.setState({openModal:true})

    }

    onClose = () =>{
        this.setState({
            openModal:false,
            name:'',
            secondName:'',
            patronymic:'',
            email:'',
            phone:'',
            rank_id:'',
            degree_id:'',
            rate:'',
            hourse_worked:'',
            rinc:'',
            web_of_science:'',
            scopus:'',
            person_id:'',
            birthday:'',
            login:'',
            password:'',
            errors:{
                name:'',
                surname:'',
                patronymic:'',
                email:'',
                phone:'',
                rank_id:'',
                degree_id:'',
                rate:'',
                hourse_worked:'',
                rinc:'',
                web_of_science:'',
                scopus:'',
                person_id:'',
                birthday:'',
                login:'',
                password:'',
            }
            
        })

    }

    async onAdd() {
        let errors = {}

        // if (!this.state.rank_id) {
        //     errors.rank_id = 'Это поле не может быть пустым'
        // }
        // if (!this.state.degree_id) {
        //     errors.degree_id = 'Это поле не может быть пустым' 
        // }
        if (!this.state.rate) {
            errors.rate = 'Это поле не может быть пустым'
        }
        if (!this.state.hourse_worked) {
            errors.hourse_worked = 'Это поле не может быть пустым'
        }
        if (!this.state.rinc) {
            errors.rinc = 'Это поле не может быть пустым'
        }
        if (!this.state.web_of_science) {
            errors.web_of_science = 'Это поле не может быть пустым'
        }
        if (!this.state.scopus) {
            errors.scopus = 'Это поле не может быть пустым'
        }
        if (!this.state.name) {
            errors.name = 'Это поле не может быть пустым'
        }
        if (!this.state.surname) {
            errors.surname = 'Это поле не может быть пустым'
        }
        if (!this.state.patronymic) {
            errors.patronymic = 'Это поле не может быть пустым'
        }
        if (!this.state.birthday) {
            errors.birthday = 'Это поле не может быть пустым'
        }
        if (!this.state.phone) {
            errors.phone = 'Это поле не может быть пустым'
        }
        if (!this.state.email) {
            errors.email = 'Это поле не может быть пустым'
        }
        if (!this.state.login) {
            errors.login = 'Это поле не может быть пустым'
        }
        if (!this.state.password) {
            errors.password = 'Это поле не может быть пустым'
        }


        if(/*errors.rank_id || errors.degree_id ||*/ errors.rate
            || errors.hourse_worked || errors.rinc || errors.web_of_science || errors.scopus || errors.name
            || errors.surname || errors.patronymic || errors.birthday || errors.phone || errors.email ||errors.login || errors.password)
            {
                this.setState({errors})
                console.log(this.state.data);
                return 
            }else{
        let data = this.state.data

        let newTeatcher ={
            position:'Преподаватель',
            rank_id: null,//this.state.rank_id,
            degree_id:null,//this.state.degree_id,
            rate:this.state.rate,
            hours_worked:this.state.hourse_worked,
            rinc:this.state.rinc,
            web_of_science:this.state.web_of_science,
            scopus:this.state.scopus,
            name:this.state.name,
            surname:this.state.surname,
            patronymic:this.state.patronymic,
            birthday:this.state.birthday,
            phone:this.state.phone,
            email:this.state.email,
            status:2,
            role:4,
            sub_unit_id:1,
            login:this.state.login,
            password:this.state.password
        }

        data.push({
            position:'Преподаватель',
            rank_id:this.state.rank_id,
            degree_id:this.state.degree_id,
            rate:this.state.rate,
            hourse_worked:this.state.hourse_worked,
            rinc:this.state.rinc,
            web_of_science:this.state.web_of_science,
            scopus:this.state.scopus,
            name:this.state.name,
            surname:this.state.surname,
            patronymic:this.state.patronymic,
            birthday:this.state.birthday,
            phone:this.state.phone,
            email:this.state.email,
            status:2,
            role:4,
            sub_unit_id:1,
            login:this.state.login,
            password:this.state.password
        })

        this.setState({
            name:'',
            secondName:'',
            patronymic:'',
            email:'',
            phone:'',
            rank_id:'',
            degree_id:'',
            rate:'',
            hourse_worked:'',
            rinc:'',
            web_of_science:'',
            scopus:'',
            birthday:'',
            login:'',
            password:'',
            errors:{
                name:'',
                surname:'',
                patronymic:'',
                email:'',
                phone:'',
                rank_id:'',
                degree_id:'',
                rate:'',
                hourse_worked:'',
                rinc:'',
                web_of_science:'',
                scopus:'',
                birthday:'',
                login:'',
                password:'',
            }
            
        })
        console.log(this.state.data);
        this.setState({openModal:false})

        let url = 'http://dashboard.kholodov.xyz/api/teachers'
        const token = localStorage.getItem('token')

        try {
            const response = await fetch(url, {
              method: 'POST', // или 'PUT'
              body: JSON.stringify(newTeatcher), // данные могут быть 'строкой' или {объектом}!
              headers: {
                'Content-Type': 'application/json',//заголовки обязателны для получения данных
                'Authorization': `Bearer ${token}`
            }
            });
            const json = await response.json();
            console.log('Успех:', JSON.stringify(json));
            console.log(newTeatcher)
            newTeatcher = {}
          } catch (error) {
            console.error('Ошибка:', error);
          }
        
        }   

    }

    


    async onUpdate (data, item, id) {
        console.log(data)
        console.log(item)

        


        let url = `http://dashboard.kholodov.xyz/api/teachers/${id}`
        const token = localStorage.getItem('token')

        try {
            const response = await fetch(url, {
              method: 'PUT', // или 'PUT'
              body: JSON.stringify(item), // данные могут быть 'строкой' или {объектом}!
              headers: {
                'Content-Type': 'application/json',//заголовки обязателны для получения данных
                'Authorization': `Bearer ${token}`
            }
            });
            const json = await response.json();
            console.log('Результат:', JSON.stringify(json));
            console.log(item)
            item = {}
          } catch (error) {
            console.error('Ошибка:', error);
          }
    
    }

    render() {



        //количество строк на одну страницу
        const pageSize = 10

        //вызываем функцию поиска
        const filtredData = this.getFiltredData()


        //вычисляем сколько всего будет страниц исходя из общего количества данных и данных на 1 страницу
        const pageCount = Math.ceil(filtredData.length / pageSize)


        const displayData = _.chunk(filtredData, pageSize)[this.state.currentPage]
        return (
            //отрисовка таблицы в базовом контейнере bootstrap
            <div className="container">
                {
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        : <React.Fragment>
                            <TableSearch onSearch={this.searchHandler} />

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.newTeatcher}
                            >NEW</Button>

                            <Table
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                                sortArrow={this.state.sortArrow}
                                onUpdate={this.onUpdate}
                                itemActive={this.state.itemActive}
                            />
                        </React.Fragment>


                }

                {
                    this.state.data.length > pageSize //отображение блока страниц на сайте
                        ? <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            forcePage={this.state.currentPage}
                        /> : null
                }

                {
                    this.state.row //отрисовка окна дополнительных данных
                        ? <DetailRowView person={this.state.row} />
                        : null
                }

    <Dialog open={this.state.openModal} onClose={()=> this.setState({openModal:false})} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление нового преподавателя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные нового преподавателя
          </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.name}
            helperText={this.state.errors.name}
            onChange={(event)=>this.setState({name :event.target.value})}
          />
        <TextField
            margin="dense"
            id="surname"
            label="Фамилия преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.surname}
            helperText={this.state.errors.surname}
            onChange={(event)=>this.setState({surname :event.target.value})}
          />
        <TextField
            margin="dense"
            id="patronymic"
            label="Отчество преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.patronymic}
            helperText={this.state.errors.patronymic}
            onChange={(event)=>this.setState({patronymic :event.target.value})}
          />
        <TextField
            margin="dense"
            id="birthday"
            label="День рождение преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.birthday}
            helperText={this.state.errors.birthday}
            onChange={(event)=>this.setState({birthday :event.target.value})}
            defaultValue='05-03-2020'
          />
        <TextField
            margin="dense"
            id="phone"
            label="Телефон преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.phone}
            helperText={this.state.errors.phone}
            onChange={(event)=>this.setState({phone :event.target.value})}
            defaultValue='8(800)555-35-35'
          />
        <TextField
            margin="dense"
            id="email"
            label="E-mail адрес преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.email}
            helperText={this.state.errors.email}
            onChange={(event)=>this.setState({email :event.target.value})}
            defaultValue='myMail@mail.ru'
          /> 
          {/* <TextField
            margin="dense"
            id="rank_id"
            label="rank_id преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rank_id}
            helperText={this.state.errors.rank_id}
            onChange={(event)=>this.setState({rank_id :event.target.value})}
            defaultValue='null'
          /> */}

        {/* <TextField
            margin="dense"
            id="degree_id"
            label="degree_id преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.degree_id}
            helperText={this.state.errors.degree_id}
            onChange={(event)=>this.setState({degree_id :event.target.value})}
            defaultValue='null'
          /> */}

        <TextField
            margin="dense"
            id="rate"
            label="rate преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rate}
            helperText={this.state.errors.rate}
            onChange={(event)=>this.setState({rate :event.target.value})}
            defaultValue='0.25'
          />
        <TextField
            margin="dense"
            id="hourse_worked"
            label="hourse_worked преподавателя"
            type="hourse_worked"
            fullWidth = {true}
            error={!!this.state.errors.hourse_worked}
            helperText={this.state.errors.hourse_worked}
            onChange={(event)=>this.setState({hourse_worked :event.target.value})}
            defaultValue='300'
          />
        <TextField
            margin="dense"
            id="rinc"
            label="rinc преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rinc}
            helperText={this.state.errors.rinc}
            onChange={(event)=>this.setState({rinc :event.target.value})}
            defaultValue='0.1'
          />
        <TextField
            margin="dense"
            id="web_of_science"
            label="web_of_science преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.web_of_science}
            helperText={this.state.errors.web_of_science}
            onChange={(event)=>this.setState({web_of_science :event.target.value})}
            defaultValue='0.1'
          />
        <TextField
            margin="dense"
            id="scopus"
            label="scopus преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.scopus}
            helperText={this.state.errors.scopus}
            onChange={(event)=>this.setState({scopus :event.target.value})}
            defaultValue='0.1'
          />
        <TextField
            margin="dense"
            id="login"
            label="Login преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.login}
            helperText={this.state.errors.login}
            onChange={(event)=>this.setState({login :event.target.value})}
          />
        <TextField
            margin="dense"
            id="password"
            label="Password преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.password}
            helperText={this.state.errors.password}
            onChange={(event)=>this.setState({password :event.target.value})}
            defaultValue='root'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose.bind(this)} color="primary" variant="contained">
            Отмена
          </Button>
          <Button 
          color="primary" 
          variant="contained"
          onClick={this.onAdd.bind(this)}
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
            </div>
        )
    }
}