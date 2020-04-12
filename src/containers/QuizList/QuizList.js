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


export default class QuizList extends Component {



    state = {
        data: [],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortArrow: 'arrow-up',
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно/подробно
        currentPage: 0, //количество страниц на данный момент
        search: '', //что искать
        openModal:false,
        errorModal:false,
        id:'',
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

    }

    onSort = (sortField) => { // функция для сортировки данных в таблице
        const clonedData = this.state.data.concat() // клонируем массив из state чтобы случайно не изменить исходные данные
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc' // выбор метода сортировки
        const sortArrow = this.state.sortArrow === 'arrow-up' ? 'arrow-down' : 'arrow-up'

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

    onAdd() {
        console.log('i add somethick', this.state.name, '+', this.state.secondName, '+', this.state.patronomic
        , '+', this.state.email, '+', this.state.number);


        let errors = {}
        // if (!this.state.id) {
        //     errors.id = 'Это поле не может быть пустым' 
        // }
        if (!this.state.rank_id) {
            errors.rank_id = 'Это поле не может быть пустым'
        }
        if (!this.state.degree_id) {
            errors.degree_id = 'Это поле не может быть пустым' 
        }
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
        if (!this.state.person_id) {
            errors.person_id = 'Это поле не может быть пустым'
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


        if(errors.position || this.state.rank_id || this.state.degree_id || this.state.rate
            || this.state.hourse_worked || this.state.rinc || this.state.web_of_science || this.state.scopus || this.state.person_id || this.state.name
            || this.state.surname || this.state.patronymic || this.state.birthday || this.state.phone || this.state.email){
            this.setState({errors})
            console.log(this.state.data);
        

        let data = this.state.data
        data.push({
            // id:this.state.id,
            position:'Преподаватель',
            rank_id:this.state.rank_id,
            degree_id:this.state.degree_id,
            rate:this.state.rate,
            hourse_worked:this.state.hourse_worked,
            rinc:this.state.rinc,
            web_of_science:this.state.web_of_science,
            scopus:this.state.scopus,
            person_id:this.state.person_id,
            name:this.state.name,
            surname:this.state.secondName,
            patronymic:this.state.patronomic,
            birthday:this.state.birthday,
            phone:this.state.phone,
            email:this.state.email,
            status:2
        })

        this.setState({
            //id:'',
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
        })
        console.log(this.state.data);
        this.setState({openModal:false})
        return
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
        <DialogTitle id="form-dialog-title">Добавление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные нового преподавателя
          </DialogContentText>

           {/* <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.id}
            helperText={this.state.errors.id}
            onChange={(event)=>this.setState({id :event.target.value})}
          /> */}
          <TextField
            margin="dense"
            id="rank_id"
            label="rank_id преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rank_id}
            helperText={this.state.errors.rank_id}
            onChange={(event)=>this.setState({rank_id :event.target.value})}
          />

        <TextField
            margin="dense"
            id="degree_id"
            label="degree_id преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.degree_id}
            helperText={this.state.errors.degree_id}
            onChange={(event)=>this.setState({degree_id :event.target.value})}
          />

        <TextField
            margin="dense"
            id="rate"
            label="rate преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rate}
            helperText={this.state.errors.rate}
            onChange={(event)=>this.setState({rate :event.target.value})}
          />
        <TextField
            margin="dense"
            id="email"
            label="hourse_worked преподавателя"
            type="hourse_worked"
            fullWidth = {true}
            error={!!this.state.errors.hourse_worked}
            helperText={this.state.errors.hourse_worked}
            onChange={(event)=>this.setState({hourse_worked :event.target.value})}
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
          />
        <TextField
            margin="dense"
            id="id"
            label="scopus преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.scopus}
            helperText={this.state.errors.scopus}
            onChange={(event)=>this.setState({scopus :event.target.value})}
          />
        <TextField
            margin="dense"
            id="person_id"
            label="person_id преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.person_id}
            helperText={this.state.errors.person_id}
            onChange={(event)=>this.setState({person_id :event.target.value})}
          />
        <TextField
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
          /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> this.setState({openModal:false})} color="primary" variant="contained">
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