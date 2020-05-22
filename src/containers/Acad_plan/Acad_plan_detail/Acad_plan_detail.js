import React, {Component} from 'react'
import classes from  './Acad_plan_detail.module.css'
import Acad_plan_detail_Table from "./Acad_plan_detail_Table/Acad_plan_detail_Table";
import Acad_planSearch from "../Acad_planSearch";
import _ from "lodash";
import Loader from "../../../components/UI/Loader/Loader";
import Button from "@material-ui/core/Button";
import ReactPaginate from "react-paginate";


export default class Acad_plan_detail extends Component{

    state ={
        data: [],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search:'', //что искать
    }

    async componentDidMount() {
        //console.log(this.props.location.propsItem)
        //в этом методе происходит запрос к серверу по ссылке из параметра url
        let url = `http://dashboard.kholodov.xyz/api/acad_plan/${this.props.location.propsId}` //localhost:3000
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


            const data1 = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            const data = data1.acad_plan.disciplines
            console.log('Я дата', data)
            //const disciplines = data.disciplines
            //console.log(disciplines)
            this.setState({ // обновляем state
                isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
                //data: data,
                //data: _.orderBy(data.disciplines, this.state.sortField, this.state.sort)
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }



        // alert([1,2,3].join(''))
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
            // ||item['is_approved']===null ? item['is_approved'] = ' '  : item['is_approved'].toLowerCase().includes(search.toLowerCase())
        })
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
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        : <React.Fragment>
                            <Acad_planSearch onSearch={this.searchHandler} />
                            {/*<Button*/}
                            {/*    color="primary"*/}
                            {/*    variant="contained"*/}
                            {/*    onClick={this.newTeatcher}*/}
                            {/*    className="mb-2"*/}
                            {/*>Добавить <br/>преподавателя</Button>*/}
                            <div className='table-responsive'>
                                <Acad_plan_detail_Table
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
