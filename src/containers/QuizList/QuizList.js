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
        secondName:'',
        patronomic:'',
        email:'',
        number:'',
        // modalData:{
        //     name:'',
        //     secondName:''
        // },
        errors:{
            id:'',
            name:'',
            secondName:'',
            patronomic:'',
            email:'',
            number:'',
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
        if (!this.state.name) {
            errors.name = 'Это поле не может быть пустым' 
        }
        if (!this.state.secondName) {
            errors.secondName = 'Это поле не может быть пустым'
        }
        if (!this.state.patronomic) {
            errors.patronomic = 'Это поле не может быть пустым' 
        }
        if (!this.state.email) {
            errors.email = 'Это поле не может быть пустым'
        }
        if (!this.state.number) {
            errors.number = 'Это поле не может быть пустым'
        }


        if(errors.name || errors.secondName || this.state.patronomic || this.state.email || this.state.number){
            this.setState({errors})
            console.log(this.state.data);
        

        let data = this.state.data
        data.push({
            id:10,
            position:'Преподаватель',
            rank_id:null,
            degree_id:null,
            rate:null,
            hourse_worked:null,
            rinc:null,
            web_of_science:null,
            scopus:null,
            person_id:66,
            name:this.state.name,
            surname:this.state.secondName,
            patronymic:this.state.patronomic,
            birthday:null,
            phone:this.state.number,
            email:this.state.email,
            status:2
        })

        this.setState({
            name:'',
            secondName:'',
            patronomic:'',
            number:'',
            email:''
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
            autoFocus
            margin="dense"
            id="secondName"
            label="Фамилия преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.secondName}
            helperText={this.state.errors.secondName}
            onChange={(event)=>this.setState({secondName :event.target.value})}
          />

        <TextField
            autoFocus
            margin="dense"
            id="patronomic"
            label="Отчество преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.patronomic}
            helperText={this.state.errors.patronomic}
            onChange={(event)=>this.setState({patronomic :event.target.value})}
          />
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="E-mail преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.email}
            helperText={this.state.errors.email}
            onChange={(event)=>this.setState({email :event.target.value})}
          />
        <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Мобильный номер преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.number}
            helperText={this.state.errors.number}
            onChange={(event)=>this.setState({number :event.target.value})}
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