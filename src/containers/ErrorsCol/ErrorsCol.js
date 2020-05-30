import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import ErrorsColTable_Acad from './ErrorsColTable_Acad.js'
import ErrorsColTable_Dep from './ErrorsColTable_Dep'
import {link} from "../../Link";
import {Link} from "react-router-dom";


export default class Dep_load extends Component{

    state ={
        data: [],
        dataAcad:this.props.location.data.acad,
        dataDep:this.props.location.data.dep,
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search:'', //что искать
    }

    async componentDidMount() {
        console.log('dataAcad',this.state.dataAcad)
        console.log('dataDep',this.state.dataDep)


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
            return item['name'].toLowerCase().includes(search.toLowerCase())
                || item['code'].toLowerCase().includes(search.toLowerCase())
                || item['profile'].toLowerCase().includes(search.toLowerCase())
                || item['educ_form'].toLowerCase().includes(search.toLowerCase())
                || item['educ_programm'].toLowerCase().includes(search.toLowerCase())
                || item['educ_years'].toLowerCase().includes(search.toLowerCase())
                || item['year_join'].toLowerCase().includes(search.toLowerCase())
        })
    }

    render() {
        //количество строк на одну страницу
        const pageSize = 10

        console.log('dataAcad',this.state.dataAcad)
        console.log('dataDep',this.state.dataDep)
        //вызываем функцию поиска
        const filtredData = this.getFiltredData()


        //вычисляем сколько всего будет страниц исходя из общего количества данных и данных на 1 страницу
        const pageCount = Math.ceil(filtredData.length / pageSize)


        const displayData = _.chunk(filtredData, pageSize)[this.state.currentPage]
        return (
            //отрисовка таблицы в базовом контейнере bootstrap
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-6">
                        {/*{*/}
                        {/*    this.state.isLoading*/}
                        {/*        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу*/}
                                 <React.Fragment>
                                    {/*<Dep_loadSearch onSearch={this.searchHandler}/>*/}
                                    <ErrorsColTable_Acad
                                        data={this.state.dataAcad}
                                        onSort={this.onSort}
                                        sort={this.state.sort}
                                        sortField={this.state.sortField}
                                        onRowSelect={this.onRowSelect}
                                    />
                                </React.Fragment>
                        {/*}*/}
                    </div>
                    <div className="col-6">
                        {/*{*/}
                        {/*    this.state.isLoading*/}
                        {/*        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу*/}
                                 <React.Fragment>
                                    {/*<Dep_loadSearch onSearch={this.searchHandler}/>*/}
                                     <div className='row'>
                                         <button type="button" className="btn btn-link"><Link to='/dashboard'>Назад</Link> </button>
                                     </div>
                                    <ErrorsColTable_Dep
                                        data={this.state.dataDep}
                                        onSort={this.onSort}
                                        sort={this.state.sort}
                                        sortField={this.state.sortField}
                                        onRowSelect={this.onRowSelect}
                                    />
                                </React.Fragment>
                        {/*}*/}
                    </div>
                </div>


                {
                    this.state.data.length > pageSize //отображение блока количества страниц на сайте
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

            </div>
        )
    }

}