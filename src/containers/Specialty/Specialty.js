import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import SpecialtySearch from './SpecialtySearch'
import SpecialtyTable from './SpecialtyTable'


export default class Specialty extends Component{
    state ={
        data: [],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search:'' //что искать
    }

    async componentDidMount() {

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        let url = 'http://dashboard.kholodov.xyz/api/specialties/'
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


            const data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
             console.log('Я дата', data)
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

        const data = _.orderBy(clonedData, sortField, sort) // создание нового объекта data при помощи библиотеки logash,  
                                                            // которая на вход получала 3 параметра, необходимый массив, по какому полю фильтровать
                                                            // и в какую сторону фильтровать

        this.setState({
            data,
            sort,
            sortField
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

    searchHandler = search =>{
        // обновляет переменную для поиска данных и обнуляет счеткик страниц
        this.setState({search, currentPage: 0})
    }


    getFiltredData(){
        const {data, search} = this.state
        //фильтрация данных


        if (!search){//если нечего фильтровать то отображать все данные
            return data
        }

        //иначе получаем поле для фильтра, приводим его к нижнему регистру на всякий случай на будущее, используем 
        //из state поле search и на основе него проводим поиск
        return data.filter(item=>{
            return item['id'].toLowerCase().includes(search.toLowerCase()) 
            || item['specialties_id'].toLowerCase().includes(search.toLowerCase())
            || item['name'].toLowerCase().includes(search.toLowerCase())
        })
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
                            <SpecialtySearch onSearch={this.searchHandler}/>
                            <SpecialtyTable
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
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

                {/* {
                    this.state.row //отрисовка окна дополнительных данных
                        ? <DetailRowView person={this.state.row} />
                        : null
                } */}
            </div>
        )
    }

}