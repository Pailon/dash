import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import Dep_loadSearch from './Dep_loadSearch.js'
import Dep_loadTable from './Dep_loadTable.js'
import {link} from "../../Link";
import ProjectTable from "../Project/ProjectTable";
import ModalWindow from "../../components/ModalWindow/ModalWindow";


export default class Dep_load extends Component{

    constructor(props) { //конструктор этого класса
        super(props);
        this.onAgreeDelete = this.onAgreeDelete.bind(this)
        this.onCloseDelete = this.onCloseDelete.bind(this)
        this.openModalDelete = this.openModalDelete.bind(this)
    }

    state ={
        data: [],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search:'', //что искать

        openModalDelete:false,
        id_delete:'',
    }

    async componentDidMount() {
        //в этом методе происходит запрос к серверу по ссылке из параметра url
        //let url = 'http://dashboard.kholodov.xyz/api/dep_load' //localhost:3000
        let url = link + '/dep_load'
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
            //console.log('Я ответ', response)


            const data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата', data)
            for(let x=0; x<data.length; x++){
                let newBeginDate = data[x].begin_date.split('T')
                let newEndDate = data[x].end_date.split('T')
                let newModifDate = data[x].modified_date.split('T')
                data[x].begin_date = newBeginDate[0]
                data[x].end_date = newEndDate[0]
                data[x].modified_date = newModifDate[0]
            }
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
        let result = data.filter(item=>{
            return item['department_name'].toLowerCase().includes(search.toLowerCase())
            || item['begin_date'].toLowerCase().includes(search.toLowerCase())
            || item['end_date'].toLowerCase().includes(search.toLowerCase())
            || item['modified_date'].toLowerCase().includes(search.toLowerCase())


        })
        if(result.length === 0){
            let data = [{department_name:'Не найдено'}]
            return data
        }else return result
    }

    onCloseDelete(){
        this.setState({openModalDelete: false})
    }

    async onAgreeDelete(){
        this.setState({openModalDelete: false})
        console.log('Удалим - ',this.state.id_delete)

        let url = link + `/teachers/${this.state.id_delete}`
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
                            <Dep_loadSearch onSearch={this.searchHandler}/>
                            <Dep_loadTable
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                                openModalDelete={this.openModalDelete}
                            />
                        </React.Fragment>


                }

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

                <ModalWindow
                    openModal ={this.state.openModalDelete}
                    onClose={this.onCloseDelete}
                    onAgree={this.onAgreeDelete}
                    title = {'Вы действительно хотите удалить данные?'}
                    content = {'При удалении произойдет так же удаление всех связанных данных'}
                />

                {/* {
                    this.state.row //отрисовка окна дополнительных данных
                        ? <DetailRowView person={this.state.row} />
                        : null
                } */}
            </div>
        )
    }

}