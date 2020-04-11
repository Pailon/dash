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
        modalData:{
            name:'',
            secondName:''
        },
        errors:{
            name:false,
            secondName:false,
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

        if (!this.state.modalData.name){
            this.setState({errorModal:true})
        }
        else{
            this.setState({errorModal:false})
        }
        if (!this.state.modalData.secondName){
            this.setState({errorModal:true})
        }  
        else{
            this.setState({errorModal:false})
        }



        // if( this.state.errors.name || this.state.errors.secondName){
        //     this.setState({errorModal:false})
            
        // }
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
            error={false}
            onChange={(event, name)=>this.setState({name})}
          />

        <TextField
            autoFocus
            margin="dense"
            id="secondName"
            label="Фамилия преподавателя"
            type="text"
            fullWidth = {true}
            error={false}
            onChange={(event, secondName)=>this.setState({secondName})}
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