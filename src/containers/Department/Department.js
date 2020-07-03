import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import DepartmentSearch from './DepartmentSearch'
import DepartmentTable from './DepartmentTable'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../../components/UI/Alert/Alert'
import MenuItem from '@material-ui/core/MenuItem';
import {link} from "../../Link";
import ModalWindow from "../../components/ModalWindow/ModalWindow";


export default class Department extends Component {


    constructor(props){ //конструктор этого класса
        super(props);
        this.onUpdate = this.onUpdate.bind(this)
        this.delete = this.delete.bind(this)
        this.onAgreeDelete = this.onAgreeDelete.bind(this)
        this.onCloseDelete = this.onCloseDelete.bind(this)
        this.openModalDelete = this.openModalDelete.bind(this)
    }

    state = {
        data: [],
        dataSpec:[],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search: '', //что искать
        openModal: false,// видно ли модальное окно
        errorModal: false,
        openAlert: false,//видно ли окно оповещения
        color: '',//значение для окна оповещения - его цвет
        text: '',//текст окна оповещения

        name: '',

        openModalDelete:false,
        id_delete:'',

        errors: {
            name: '',
        }
    }

    async componentDidMount() {

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        //let url = 'http://dashboard.kholodov.xyz/api/groups'
        let url = link + '/department'

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
            console.log('Я дата Department', data)
            this.setState({ // обновляем state
                isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }

        // let url2 = link + '/specialties'
        // try {
        //
        //     const response = await fetch(url2, {
        //         method: 'GET', //метот для получения данных
        //         headers: {
        //             'Content-Type': 'application/json',//заголовки обязателны для получения данных
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        //     //console.log('Я ответ', response)
        //
        //
        //     const dataSpec = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
        //     console.log('Я дата spec', dataSpec)
        //     for(let i = 0; i<this.state.data.length; i++) {
        //         this.state.data[i].spec = dataSpec
        //     }
        //     //this.state.data.spec = dataSpec
        //     console.log(this.state.data)
        //     this.setState({ // обновляем state
        //         isLoading: false,
        //         dataSpec //: _.orderBy(dataSpec, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
        //     })
        //
        // } catch (e) { // на случай ошибки
        //     console.log(e)
        //
        // }


    }

    // renderOptions(){
    //     return this.state.dataSpec.map((item)=>{
    //         return(
    //             <MenuItem
    //                 key={item.name}
    //                 value={item.id}
    //             >
    //                 {item.name}
    //             </MenuItem>
    //         )
    //     })
    // }

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
            return item['id'].toLowerCase().includes(search.toLowerCase())
                || item['name'].toLowerCase().includes(search.toLowerCase())
        })
    }

    newDepartment = () => { //открыть модальное окно для добавления преподавателя
        this.setState({ openModal: true })

    }

    onClose = () => {
        //функция зарытия модального окна без завершения добавления преподавателя
        //обнуления буферных данных, и закрытие самого окна
        this.setState({
            openModal: false,
            name: '',
            id: '',
            errors: {
                name: '',
                id: '',
            }
        })
    }

    async onAdd() {  //Функция добавления нового преподавателя в таблицу и на сервер
        let errors = {}

        //Серия проверок на пустоту полей, если пусто, то мы добавим в state сообщение об ошибке, для будущего отображения
        //Можно кастомизировать ошибку для каждого поля
        if (!this.state.name) {
            errors.name = 'Это поле не может быть пустым'
        }
        // if (!this.state.id) {
        //     errors.id = 'Это поле не может быть пустым'
        // }


        //Если хотя бы одно из этих полей пустое мы обновляем state и добавляем туда сообщения об ошибках в пустых полях
        //В ином случае, если все поля заполнены мы берем все данные из полей и производим запрос к серверу
        if (errors.name) {
            this.setState({ errors }) //добавление ошибок в state
            console.log(this.state.data);//для проверки выводим в консоль - временно
            return
        } else {
            let data = this.state.data // клонируем обьект data из state

            let newDepartment = {  //Создаём обьект новой группы, чтобы потом отправить на сервер
                name: this.state.name,
            }

            // data.push({ //добавляем в обьект data все то же что и в newTeatcher, чтобы сразу видить изменения в таблице
            //     name: this.state.name,
            // })

            this.setState({ //обнуляем буферные значения  для добавления будущего преподавателя
                name: '',
                errors: {
                    name: '',
                }
            })
            console.log(this.state.data);// выведем обьект с данными для проверки
            this.setState({ openModal: false })//Закрываем модальное окно добавления преподавателя

            let url = 'http://dashboard.kholodov.xyz/api/department' //ссылка для запроса к таблице преподаавтелей
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                    method: 'POST', // или 'PUT'
                    body: JSON.stringify(newDepartment), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.status === 201) {
                    this.setState({openAlert: true, color: 'success', text: 'Успешно'}, () => {
                        window.setTimeout(() => {
                            this.setState({openAlert: false})
                        }, 2000)
                    });
                }
                if (response.status === 400) {
                    this.setState({openAlert: true, color: 'danger', text: 'Ошибка'}, () => {
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

    }

    async onUpdate(data, item, id, oldData) { //функция обновления данных в таблице, получает от таблицы
        //console.log(data)                    //data-значение которое меняют item-весь обьект, в котором значение меняют id oldData
        //console.log(item)                    //id-параметр из обьекта item чтобы проще производить запрос к api oldData-значение до изменения
        //console.log(oldData)

        if (data !== oldData) { //узнаём изменилось ли значение функции, если нет, то зачем производить запрос?

            let url = `http://dashboard.kholodov.xyz/api/department/${id}` //ссылка для запросов, куда подставляется id
            const token = localStorage.getItem('token')//берем токен и локального хранилищя

            let putItem = {
                name: item.name,
            }

            try {
                const response = await fetch(url, { //производим запрос
                    method: 'PUT', // или 'POST'
                    body: JSON.stringify(putItem), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.status === 204) {
                    this.setState({openAlert: true, color: 'success', text: 'Успешно'}, () => {
                        window.setTimeout(() => {
                            this.setState({openAlert: false})
                        }, 2000)
                    });
                }
                if (response.status === 400) {
                    this.setState({openAlert: true, color: 'danger', text: 'Ошибка при изменении'}, () => {
                        window.setTimeout(() => {
                            this.setState({openAlert: false})
                        }, 2000)
                    });
                }
                if (response.status === 404) {
                    this.setState({openAlert: true, color: 'danger', text: 'Не найдено'}, () => {
                        window.setTimeout(() => {
                            this.setState({openAlert: false})
                        }, 2000)
                    });
                }
                await this.componentDidMount()
                item = {}
            } catch (error) {
                console.error('Ошибка:', error);//Отображаем ошибку в консоль
                //this.setState({ openAlert: true, color: 'danger', text: 'Произошла ошибка' })//Выводим окно ошибки
                this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
        } else {
            console.log('Изменений не было')// а если мы ничего не меняли, скажем об этом в консоли
            this.setState({openAlert:true, color:'secondary', text:'Без изменений'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }

    }

    onCloseAlert = () => {
        this.setState({ openAlert: false }) // закрыть окно оповещения
    }

    async delete(id){
        let data = this.state.data

       let url = link + `/department/${id}`
        const token = localStorage.getItem('token')// взяли токен

        try {
            const response = await fetch(url, {
                method: 'DELETE', // или 'PUT'
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
            if(response.status === 204){
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
                this.componentDidMount()


            }
        } catch (error) {
            console.error('Ошибка:', error); //выдаёт ошибку в консоль
            this.setState({openAlert:true, color:'danger', text:'Ошибка'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }
    }

    onCloseDelete(){
        this.setState({openModalDelete: false})
    }

    async onAgreeDelete(){
        this.setState({openModalDelete: false})
        console.log('Удалим - ',this.state.id_delete)

        let url = link + `/specialties/${this.state.id_delete}`
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
                    this.state.openAlert ?  //компонент вывода предупреждения
                        <Alert
                            color={this.state.color} //цвет оповещения
                            text={this.state.text} // текст в оповещении
                            onCloseAlert={this.onCloseAlert} // функция как закрыть это окошко
                        />
                        : null
                }
                {
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        : <React.Fragment>
                            <DepartmentSearch onSearch={this.searchHandler} />

                            <Button
                                style={{backgroundColor:'#007cff', color:'white'}}
                                size="small"
                                //color="primary"
                                variant="contained"
                                onClick={this.newDepartment}
                                className="mb-2"
                            >Добавить <br />кафедру</Button>


                            <DepartmentTable
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                                sortArrow={this.state.sortArrow}
                                onUpdate={this.onUpdate}
                                delete={this.delete}
                                openModalDelete={this.openModalDelete}
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

                <ModalWindow
                    openModal ={this.state.openModalDelete}
                    onClose={this.onCloseDelete}
                    onAgree={this.onAgreeDelete}
                    title = {'Вы действительно хотите удалить данные?'}
                    content = {'При удалении произойдет так же удаление всех связанных данных'}
                />

                <Dialog
                    open={this.state.openModal}
                    onClose={this.onClose.bind(this)}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление кафедры</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите данные о новой кафедре
                        </DialogContentText>
                        <TextField   //все модули TextFiled это поля ввода имеющие несколько ключевых свойств
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Наименование кафедры" //описание поля ввода
                            type="text" //тип вводимой информации
                            fullWidth={true}
                            error={!!this.state.errors.name}// true or false, отображать ошибку или нет
                            helperText={this.state.errors.name} // текст отображаемый при ошибке
                            onChange={(event) => this.setState({ name: event.target.value.trim() })} //функция которая вызывается при изменении значения
                            //функция записывает новое значение при
                            //каждом изменении в нужную  буферную переменную в state
                        />
                        {/*<TextField*/}
                        {/*    margin="dense"*/}
                        {/*    id="specialties_id"*/}
                        {/*    label="Специальность"*/}
                        {/*    type="text"*/}
                        {/*    fullWidth={true}*/}
                        {/*    error={!!this.state.errors.specialties_id}*/}
                        {/*    helperText={this.state.errors.link_trello}*/}
                        {/*    onChange={(event) => {*/}
                        {/*        console.log(event.target.value)*/}
                        {/*        this.setState({ specialties_id: event.target.value })*/}
                        {/*    }}*/}
                        {/*    select*/}
                        {/*>*/}
                        {/*    {this.renderOptions()}*/}
                        {/*</TextField>*/}

                    </DialogContent>
                    <DialogActions>
                        <Button  //компонент кнопки закрытия модального окна
                            onClick={this.onClose.bind(this)}
                            //color="primary"
                            style={{backgroundColor:'#007cff', color:'white'}}
                            size="small"
                            variant="contained"
                        >
                            Отмена
                        </Button>
                        <Button
                            //color="primary"
                            style={{backgroundColor:'#007cff', color:'white'}}
                            size="small"
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