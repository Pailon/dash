import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import classes from './Dep_load_detail.module.css'
import Dep_load_detail_Table from "./Dep_load_detail_Table/Dep_load_detail_Table";
import Dep_load_detail_Search from "./Dep_load_detail_Table/Dep_load_detail_Search";
import {link} from "../../../Link";
import _ from "lodash";
import Loader from "../../../components/UI/Loader/Loader";
import Button from "@material-ui/core/Button";
import ReactPaginate from "react-paginate";
import { saveAs } from 'file-saver';
import Alert from "../../../components/UI/Alert/Alert";



export default class Dep_load_detail extends Component{

    constructor(props) { //конструктор этого класса
        super(props);
        this.loadingFile = this.loadingFile.bind(this)
    }

    state ={
        data: [],
        disciplines:[],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'name', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search:'', //что искать
        DepFile:[],
        openAlert:false,
        sortArrow: 'arrow-up',
    }

    async componentDidMount() {
        //console.log(this.props.location.propsItem)
        //в этом методе происходит запрос к серверу по ссылке из параметра url
        let url = `http://dashboard.kholodov.xyz/api/dep_load/${this.props.location.propsId}` //localhost:3000
        //let url = link + `/dep_load/${this.props.location.propsItem}`
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        //console.log(token)
        try {
            const response = await fetch(url, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            //console.log('Я ответ', response)


            const full_data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            const data = full_data.disciplines
            //console.log('Я дата', data)
            //const disciplines = data.disciplines
            //console.log(disciplines)
            this.setState({ // обновляем state
                //isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort),//первичная сортировка данных, для порядка
                //data: data,
                //data: _.orderBy(data.disciplines, this.state.sortField, this.state.sort)
                full_data
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }

        console.log(this.state.full_data.id)
        let url3 = link + `/dep_load/${this.state.full_data.id}/files`

        try {

            const response = await fetch(url3, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('Я ответ', response)
            const DepFile = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я ответ DepFile', DepFile)
            this.setState({ // обновляем state
                isLoading: false,
                // data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                DepFile,
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
            // || item['hours_con_project']===null ? item['hours_con_project'] = ' '  : item['hours_con_project'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_lec']===null ? item['hours_lec'] = ' '  : item['hours_lec'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_sem']===null ? item['hours_sem'] = ' ' : item['hours_sem'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_lab']===null ? item['hours_lab'] = ' '  : item['hours_lab'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_con_exam']===null ? item['hours_con_exam'] = ' ' : item['hours_con_exam'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_zachet']===null ? item['hours_zachet'] = ' ' : item['hours_zachet'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_exam']===null ? item['hours_exam'] = ' ' : item['hours_exam'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_kurs_project']===null ? item['hours_kurs_project'] = ' ' : item['hours_kurs_project'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_gek']===null ? item['hours_gek'] = ' '  : item['hours_gek'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_ruk_prakt']===null ? item['hours_ruk_prakt'] = ' ' : item['hours_ruk_prakt'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_ruk_vkr']===null ? item['hours_ruk_vkr'] = ' ' : item['hours_ruk_vkr'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_ruk_mag']===null ? item['hours_ruk_mag'] = ' '  : item['hours_ruk_mag'].toLowerCase().includes(search.toLowerCase())
            // || item['hours_ruk_aspirant']===null ?item['hours_ruk_aspirant'] = ' '  : item['hours_ruk_aspirant'].toLowerCase().includes(search.toLowerCase())
            // ||item['is_approved']===null ? item['is_approved'] = ' '  : item['is_approved'].toLowerCase().includes(search.toLowerCase())
        })
    }

    loadingFile(){
        //event.preventDefault()
        //console.log(this.props.location.propsId)

        if(this.state.DepFile[0] === undefined){
            this.setState({openAlert: true, color: 'danger', text: 'Не найдено'}, () => {
                window.setTimeout(() => {
                    this.setState({openAlert: false})
                }, 2000)
            });
        }else{
            let url = link + `/uploads/dep_load/${this.state.DepFile[0].id}`

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
                    //console.log(res);
                    return res.blob();
                })
                    .then(blob => {
                        saveAs(blob, `${this.state.DepFile[0].name}`)
                    })


            } catch (e) { // на случай ошибки
                console.log(e)
            }
        }
    }

    onCloseAlert = () =>{
        this.setState({openAlert:false}) // закрыть окно оповещения
    }

    render() {
        const pageSize = 7

        //вызываем функцию поиска
        const filtredData = this.getFiltredData()

        //вычисляем сколько всего будет страниц исходя из общего количества данных и данных на 1 страницу
        const pageCount = Math.ceil(filtredData.length / pageSize)


        const displayData = _.chunk(filtredData, pageSize)[this.state.currentPage]
        return(
                <div className="container">
                    {
                        this.state.openAlert ?  //компонент вывода предупреждения
                            <Alert
                                color={this.state.color} //цвет оповещения
                                text={this.state.text} // текст в оповещении
                                onCloseAlert={this.onCloseAlert} // функция как закрыть это окошко
                            />
                            :null
                    }
                    {
                        this.state.isLoading
                            ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                            : <React.Fragment>
                                <Link to={{
                                    pathname: "/dep_load",
                                }}>
                                    {/* <FA name='external-link-square-alt'/>  */}
                                    Назад
                                </Link>
                                <Dep_load_detail_Search onSearch={this.searchHandler} />
                                <Button
                                    //color="primary"
                                    style={{backgroundColor:'#007cff', color:'white'}}
                                    size="small"
                                    variant="contained"
                                    onClick={this.loadingFile}
                                    className="mb-2"
                                >Скачать <br/>xml версию</Button>
                                <div className='table-responsive'>
                                    <Dep_load_detail_Table
                                        //data={this.state.data.dep_load}
                                        data={displayData}
                                        onSort={this.onSort}
                                        sort={this.state.sort}
                                        sortField={this.state.sortField}
                                        onRowSelect={this.onRowSelect}
                                        sortArrow={this.state.sortArrow}
                                        onUpdate={this.onUpdate}
                                    />
                                </div>
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
                </div>

        )
    }
}
