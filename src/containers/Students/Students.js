import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import StudentsSearch from './StudentsSearch'
import StudentsTable from './StudentsTable'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../../components/UI/Alert/Alert'
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import {link} from "../../Link";




export default class Students extends Component {


    constructor(props){ //конструктор этого класса
        super(props);
        this.onUpdate = this.onUpdate.bind(this)
    }

    state = {
        data: [],
        dataSpec:[],
        dataGroup:[],
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortField: 'id', // параметр для сортировки, id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно
        currentPage: 0, //количество страниц на данный момент
        search: '', //что искать
        openModal: false,// видно ли модальное окно
        errorModal: false,
        openAlert: false,//видно ли окно оповещения
        color: '',//значение для окна оповещения - его цвет
        text: '',//текст окна оповещения
        specialty_id: 1,
        f_group_id:178,
        choise:'',
        checked:true,

        name: '',
        surname: '',
        patronymic:'',
        birthday:'',
        phone:'',
        email:'',
        group_id:'',

        errors: {
            name: '',
            surname: '',
            patronymic:'',
            birthday:'',
            phone:'',
            email:'',
            group_id:'',
        }
    }

    async componentDidMount() {

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        //let url = 'http://dashboard.kholodov.xyz/api/groups'
        let url
        // if(this.state.checked === true){
        //     url = link + `/students/group/${this.state.f_group_id}`
        // }else{
        //     url = link + `/students/specialty/${this.state.specialty_id}`
        // }
        url = link + `/students`

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


            const data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата студенты 2 специальности', data)
            this.setState({ // обновляем state
                isLoading: false,
                data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }

        let url2 = link + '/specialties'
        try {

            const response = await fetch(url2, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            //console.log('Я ответ', response)


            const dataSpec = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата spec', dataSpec)
            // for(let i = 0; i<this.state.data.length; i++) {
            //     this.state.data[i].spec = dataSpec
            // }
            //this.state.data.spec = dataSpec
            //console.log(this.state.data)
            this.setState({ // обновляем state
                isLoading: false,
                dataSpec //: _.orderBy(dataSpec, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


        let url3 = link + '/groups'
        try {

            const response = await fetch(url3, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            //console.log('Я ответ', response)


            const dataGroup = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата group', dataGroup)

            //this.state.data.spec = dataSpec
            //console.log(this.state.dataGroup)
            this.setState({ // обновляем state
                isLoading: false,
                dataGroup //: _.orderBy(dataSpec, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


    }



    renderOptionsSpec(){
        return this.state.dataSpec.map((item)=>{
            return(
                <MenuItem
                    key={item.name}
                    value={item.id}
                >
                    {item.name}
                </MenuItem>
            )
        })
    }

    renderOptionsGroup(){
        return this.state.dataGroup.map((item)=>{
            return(
                <MenuItem
                    key={item.name}
                    value={item.id}
                >
                    {item.name}
                </MenuItem>
            )
        })
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
            return item['id'].toLowerCase().includes(search.toLowerCase())
                || item['name'].toLowerCase().includes(search.toLowerCase())
                || item['surname'].toLowerCase().includes(search.toLowerCase())
                || item['patronymic'].toLowerCase().includes(search.toLowerCase())
                || item['birthday'].toLowerCase().includes(search.toLowerCase())
                || item['phone'].toLowerCase().includes(search.toLowerCase())
                || item['email'].toLowerCase().includes(search.toLowerCase())
                || item['group_id'].toLowerCase().includes(search.toLowerCase())

        })
    }

    newStudents = () => { //открыть модальное окно для добавления преподавателя
        this.setState({ openModal: true })

    }

    onClose = () => {
        //функция зарытия модального окна без завершения добавления преподавателя
        //обнуления буферных данных, и закрытие самого окна
        this.setState({
            openModal: false,
            name: '',
            surname: '',
            patronymic:'',
            birthday:'',
            phone:'',
            email:'',
            group_id:'',
            errors: {
                name: '',
                surname: '',
                patronymic:'',
                birthday:'',
                phone:'',
                email:'',
                group_id:'',
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
        if (!this.state.group_id) {
            errors.group_id = 'Это поле не может быть пустым'
        }



        //Если хотя бы одно из этих полей пустое мы обновляем state и добавляем туда сообщения об ошибках в пустых полях
        //В ином случае, если все поля заполнены мы берем все данные из полей и производим запрос к серверу
        if (errors.name || errors.surname || errors.patronymic || errors.birthday
            || errors.phone || errors.email || errors.group_id) {
            this.setState({ errors }) //добавление ошибок в state
            console.log(this.state.data);//для проверки выводим в консоль - временно
            return
        } else {
            let data = this.state.data // клонируем обьект data из state

            let newStudent = {  //Создаём обьект новой группы, чтобы потом отправить на сервер
                name: this.state.name,
                surname: this.state.surname,
                patronymic:this.state.patronymic,
                birthday:this.state.birthday,
                phone:this.state.phone,
                email:this.state.email,
                group_id:this.state.group_id,
            }

            // data.push({ //добавляем в обьект data все то же что и в newTeatcher, чтобы сразу видить изменения в таблице
            //     name: this.state.name,
            //     surname: this.state.surname,
            //     patronymic:this.state.patronymic,
            //     birthday:this.state.birthday,
            //     phone:this.state.phone,
            //     email:this.state.email,
            //     group_id:this.state.group_id,
            // })

            this.setState({ //обнуляем буферные значения  для добавления будущего преподавателя
                name: '',
                surname: '',
                patronymic:'',
                birthday:'',
                phone:'',
                email:'',
                group_id:'',
                errors: {
                    name: '',
                    surname: '',
                    patronymic:'',
                    birthday:'',
                    phone:'',
                    email:'',
                    group_id:'',
                }
            })
            console.log(this.state.data);// выведем обьект с данными для проверки
            this.setState({ openModal: false })//Закрываем модальное окно добавления преподавателя

            //let url = 'http://dashboard.kholodov.xyz/api/students' //ссылка для запроса к таблице преподаавтелей
            let url = link + '/students'
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                    method: 'POST', // или 'PUT'
                    body: JSON.stringify(newStudent), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                const json = await response.json();
                console.log('Успех:', JSON.stringify(json));// результат запроса
                console.log(newStudent)//выводит обьект того, что добавлено на сервер
                newStudent = {}//обнулили буферный обьект для нового преподавателя
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
                this.componentDidMount()
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

            let url = `http://dashboard.kholodov.xyz/api/groups/${id}` //ссылка для запросов, куда подставляется id
            const token = localStorage.getItem('token')//берем токен и локального хранилищя

            let putItem = {
                name: item.name,
                specialties_id: item.specialties_id,
                surname: item.surname,
                patronymic:item.patronymic,
                birthday:item.birthday,
                phone:item.phone,
                email:item.email,
                group_id:item.group_id,
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
                const json = await response.json();
                console.log('Результат:', JSON.stringify(json));
                //console.log(item)
                //this.setState({ openAlert: true, color: 'success', text: 'Изменено' })//при успешном отображении отображаем окно об успешноти
                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
                this.componentDidMount()
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
                            <StudentsSearch onSearch={this.searchHandler} />
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-1'>
                                        <Button
                                            //color="primary"
                                            style={{backgroundColor:'#007cff', color:'white'}}
                                            size="small"
                                            variant="contained"
                                            onClick={this.newStudents}
                                            className="mb-2"
                                        >Добавить <br />студента</Button>
                                    </div>
                                    <React.Fragment>
                                    {/*<div className='col-1 ml-5'>*/}
                                    {/*    <p>По специальности</p>*/}
                                    {/*</div>*/}
                                    {/*<div className='col-1'>*/}
                                    {/*    <Switch*/}
                                    {/*        defaultChecked*/}
                                    {/*        checked={this.state.checked}*/}
                                    {/*        color="default"*/}
                                    {/*        inputProps={{ 'aria-label': 'checkbox with default color' }}*/}
                                    {/*        onChange={(event) => {*/}
                                    {/*            console.log(event.target.checked)*/}
                                    {/*            this.setState({ checked: event.target.checked })*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div className='col-1'>*/}
                                    {/*<p>По группе</p>*/}
                                    {/*</div>*/}
                                    </React.Fragment>
                                    {/*<div className='col-2'>*/}
                                    {/*    {*/}
                                    {/*        this.state.checked===true*/}
                                    {/*        ?<TextField*/}
                                    {/*                margin="dense"*/}
                                    {/*                id="group_id"*/}
                                    {/*                label="Группа"*/}
                                    {/*                type="text"*/}
                                    {/*                fullWidth={true}*/}
                                    {/*                error={!!this.state.errors.f_group_id}*/}
                                    {/*                helperText={this.state.errors.f_group_id}*/}
                                    {/*                onChange={(event) => {*/}
                                    {/*                    console.log(event.target.value)*/}
                                    {/*                    this.setState({ f_group_id: event.target.value })*/}
                                    {/*                }}*/}
                                    {/*                select*/}
                                    {/*            >*/}
                                    {/*                {this.renderOptionsGroup()}*/}
                                    {/*            </TextField>*/}
                                    {/*            :<TextField*/}
                                    {/*                margin="dense"*/}
                                    {/*                id="specialty_id"*/}
                                    {/*                label="Специальность"*/}
                                    {/*                type="text"*/}
                                    {/*                fullWidth={true}*/}
                                    {/*                error={!!this.state.errors.specialty_id}*/}
                                    {/*                helperText={this.state.errors.specialty_id}*/}
                                    {/*                onChange={(event) => {*/}
                                    {/*                    console.log(event.target.value)*/}
                                    {/*                    this.setState({ specialty_id: event.target.value })*/}
                                    {/*                }}*/}
                                    {/*                select*/}
                                    {/*            >*/}
                                    {/*                {this.renderOptionsSpec()}*/}
                                    {/*            </TextField>*/}

                                    {/*    }*/}

                                    {/*</div>*/}
                                    {/*<div className='col-1'>*/}
                                    {/*    <Button*/}
                                    {/*        color="primary"*/}
                                    {/*        variant="contained"*/}
                                    {/*        onClick={()=>{this.componentDidMount()}}*/}
                                    {/*        className="mb-2"*/}
                                    {/*    >*/}
                                    {/*        Показать*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>


                            <StudentsTable
                                data={displayData}
                                onSort={this.onSort}
                                sort={this.state.sort}
                                sortField={this.state.sortField}
                                onRowSelect={this.onRowSelect}
                                sortArrow={this.state.sortArrow}
                                onUpdate={this.onUpdate}
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

                <Dialog
                    open={this.state.openModal}
                    onClose={this.onClose.bind(this)}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление нового студента</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите данные о новом студенте
                        </DialogContentText>
                        <TextField   //все модули TextFiled это поля ввода имеющие несколько ключевых свойств
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Имя студента" //описание поля ввода
                            type="text" //тип вводимой информации
                            fullWidth={true}
                            error={!!this.state.errors.name}// true or false, отображать ошибку или нет
                            helperText={this.state.errors.name} // текст отображаемый при ошибке
                            onChange={(event) => this.setState({ name: event.target.value.trim() })} //функция которая вызывается при изменении значения
                            //функция записывает новое значение при
                            //каждом изменении в нужную  буферную переменную в state
                        />
                        <TextField
                            margin="dense"
                            id="surname"
                            label="Фамилия"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.surname}
                            helperText={this.state.errors.surname}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ surname: event.target.value })
                            }}

                        />
                        <TextField
                            margin="dense"
                            id="patronymic"
                            label="Отчество"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.patronymic}
                            helperText={this.state.errors.patronymic}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ patronymic: event.target.value })
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="birthday"
                            label="Дата рождения"
                            type="date"
                            fullWidth={true}
                            error={!!this.state.errors.birthday}
                            helperText={this.state.errors.birthday}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ birthday: event.target.value })
                            }}
                            defaultValue="2017-05-24"
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            ref="phone"
                            label="Телефон студента"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.phone}
                            helperText={this.state.errors.phone}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ phone: event.target.value })
                            }}
                        />

                        <TextField
                            margin="dense"
                            id="email"
                            label="Email студента"
                            type="email"
                            fullWidth={true}
                            error={!!this.state.errors.email}
                            helperText={this.state.errors.email}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ email: event.target.value })
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="group_id"
                            label="Группа студента"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.group_id}
                            helperText={this.state.errors.group_id}
                            onChange={(event) => {
                                console.log(event.target.value)
                                this.setState({ group_id: event.target.value })
                            }}
                            select
                        >
                            {this.renderOptionsGroup()}
                        </TextField>


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