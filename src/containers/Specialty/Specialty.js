import React, { Component } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import SpecialtySearch from './SpecialtySearch'
import SpecialtyTable from './SpecialtyTable'
import Alert from '../../components/UI/Alert/Alert'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class Specialty extends Component {


    constructor(props) { //конструктор этого класса
        super(props);
        this.onUpdate = this.onUpdate.bind(this)
    }

    state = {
        data: [],
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

        code: '',
        name: '',
        profile: '',
        educ_form: '',
        educ_programm: '',
        educ_years: '',
        year_join: '',
        sub_unit_id: '',

        errors: {
            code: '',
            name: '',
            profile: '',
            educ_form: '',
            educ_programm: '',
            educ_years: '',
            year_join: '',
            sub_unit_id: '',
        }
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
        {/* 
                    code
                    name
                    sub_unit_name
                    profile
                    educ_form
                    educ_programm
                    educ_years
                    year_join
                    sub_unit_id */}
        return data.filter(item => {
            return item['id'].toLowerCase().includes(search.toLowerCase())
                || item['code'].toLowerCase().includes(search.toLowerCase())
                || item['name'].toLowerCase().includes(search.toLowerCase())
                || item['sub_unit_name'].toLowerCase().includes(search.toLowerCase())
                || item['profile'].toLowerCase().includes(search.toLowerCase())
                || item['educ_form'].toLowerCase().includes(search.toLowerCase())
                || item['educ_programm'].toLowerCase().includes(search.toLowerCase())
                || item['educ_years'].toLowerCase().includes(search.toLowerCase())
                || item['year_join'].toLowerCase().includes(search.toLowerCase())
                || item['sub_unit_id'].toLowerCase().includes(search.toLowerCase())

        })
    }

    newSpecialty = () => {
        this.setState({ openModal: true })
    }

    onClose = () => {
        this.setState({
            openModal:false,
            code: '',
            name: '',
            profile: '',
            educ_form: '',
            educ_programm: '',
            educ_years: '',
            year_join: '',
            sub_unit_id: '',

            errors: {
                code: '',
                name: '',
                profile: '',
                educ_form: '',
                educ_programm: '',
                educ_years: '',
                year_join: '',
                sub_unit_id: '',
            }
        })
    }

    async onAdd() {  //Функция добавления нового преподавателя в таблицу и на сервер
        let errors = {}

        //Серия проверок на пустоту полей, если пусто, то мы добавим в state сообщение об ошибке, для будущего отображения
        //Можно кастомизировать ошибку для каждого поля
        if (!this.state.code) {
            errors.name = 'Это поле не может быть пустым'
        }
        if (!this.state.name) {
            errors.students_count = 'Это поле не может быть пустым'
        }
        if (!this.state.profile) {
            errors.link_trello = 'Это поле не может быть пустым'
        }
        if (!this.state.educ_form) {
            errors.begin_date = 'Это поле не может быть пустым'
        }
        if (!this.state.educ_programm) {
            errors.end_date = 'Это поле не может быть пустым'
        }
        if (!this.state.educ_years) {
            errors.description = 'Это поле не может быть пустым'
        }
        if (!this.state.year_join) {
            errors.description = 'Это поле не может быть пустым'
        }
        if (!this.state.sub_unit_id) {
            errors.description = 'Это поле не может быть пустым'
        }


        //Если хотя бы одно из этих полей пустое мы обновляем state и добавляем туда сообщения об ошибках в пустых полях
        //В ином случае, если все поля заполнены мы берем все данные из полей и производим запрос к серверу
        if (errors.name || errors.code || errors.profile
            || errors.educ_form || errors.educ_programm || errors.educ_years
            || errors.year_join || errors.sub_unit_id) {
            this.setState({ errors }) //добавление ошибок в state
            console.log('Я из ошибки', this.state.data);//для проверки выводим в консоль - временно
            return
        } else {
            let data = this.state.data // клонируем обьект data из state

            let newGroup = {  //Создаём обьект нового преподавателя, чтобы потом отправить на сервер
                code: this.state.code,
                name: this.state.name,
                profile: this.state.profile,
                educ_form: this.state.educ_form,
                educ_programm: this.state.educ_programm,
                educ_years: this.state.educ_years,
                year_join: this.state.year_join,
                sub_unit_id: this.state.sub_unit_id,
            }

            data.push({ //добавляем в обьект data все то же что и в newTeatcher, чтобы сразу видить изменения в таблице
                code: this.state.code,
                name: this.state.name,
                profile: this.state.profile,
                educ_form: this.state.educ_form,
                educ_programm: this.state.educ_programm,
                educ_years: this.state.educ_years,
                year_join: this.state.year_join,
                sub_unit_id: this.state.sub_unit_id,
            })

            this.setState({ //обнуляем буферные значения  для добавления будущего преподавателя
                code: '',
                name: '',
                profile: '',
                educ_form: '',
                educ_programm: '',
                educ_years: '',
                year_join: '',
                sub_unit_id: '',

                errors: {
                    code: '',
                    name: '',
                    profile: '',
                    educ_form: '',
                    educ_programm: '',
                    educ_years: '',
                    year_join: '',
                    sub_unit_id: '',
                }

            })
            console.log('После добавления', this.state.data);// выведем обьект с данными для проверки
            this.setState({ openModal: false })//Закрываем модальное окно добавления преподавателя

            let url = 'http://dashboard.kholodov.xyz/api/projects' //ссылка для запроса к таблице преподаавтелей
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                    method: 'POST', // или 'PUT'
                    body: JSON.stringify(newGroup), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                });
                const json = await response.json();
                console.log('Ответ:', JSON.stringify(json));// результат запроса
                console.log(newGroup)//выводит обьект того, что добавлено на сервер
                newGroup = {}//обнулили буферный обьект для нового преподавателя
            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
            }
        }
    }

    async onUpdate(data, item, id, oldData) { //функция обновления данных в таблице, получает от таблицы
        //console.log(data)                    //data-значение которое меняют item-весь обьект, в котором значение меняют id oldData 
        //console.log(item)                    //id-параметр из обьекта item чтобы проще производить запрос к api oldData-значение до изменения  
        //console.log(oldData)

        if (data != oldData) { //узнаём изменилось ли значение функции, если нет, то зачем производить запрос?

            let url = `http://dashboard.kholodov.xyz/api/specialties/${id}` //ссылка для запросов, куда подставляется id
            const token = localStorage.getItem('token')//берем токен и локального хранилищя

            let putItem = {
                code: item.code,
                name: item.name,
                profile: item.profile,
                educ_form: item.educ_form,
                educ_programm: item.educ_programm,
                educ_years: item.educ_years,
                year_join: item.year_join,
                sub_unit_id: item.sub_unit_id,
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
                console.log(item)
                this.setState({ openAlert: true, color: 'success', text: 'Изменено' })//при успешном отображении отображаем окно об успешноти
                item = {}
            } catch (error) {
                console.error('Ошибка:', error);//Отображаем ошибку в консоль
                this.setState({ openAlert: true, color: 'danger', text: 'Произошла ошибка' })//Выводим окно ошибки
            }
        } else {
            console.log('Изменений не было')// а если мы ничего не меняли, скажем об этом в консоли
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
                            <SpecialtySearch onSearch={this.searchHandler} />

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.newSpecialty}
                                className="mb-2"
                            >Добавить <br />новую специальность</Button>


                            <SpecialtyTable
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
                    <DialogTitle id="form-dialog-title">Добавление новой специальности</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Введите данные о новой специальности
          </DialogContentText>
                        <TextField   //все модули TextFiled это поля ввода имеющие несколько ключевых свойств
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Наименование специальности" //описание поля ввода
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
                            id="cone"
                            label="Введите код специальности"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.code}
                            helperText={this.state.errors.code}
                            onChange={(event) => this.setState({ code: event.target.value.trim() })}
                        />
                        <TextField
                            margin="dense"
                            id="profile"
                            label="Введите профиль специальности"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.profile}
                            helperText={this.state.errors.profile}
                            onChange={(event) => this.setState({ profile: event.target.value.trim() })}
                        />
                        <TextField
                            margin="dense"
                            id="educ_form"
                            label="Форма обучения"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.educ_form}
                            helperText={this.state.errors.educ_form}
                            onChange={(event) => this.setState({ educ_form: event.target.value.trim() })}
                            defaultValue='05-03-2020'
                        />
                        <TextField
                            margin="dense"
                            id="educ_programm"
                            label="Программа обучения"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.educ_programm}
                            helperText={this.state.errors.educ_programm}
                            onChange={(event) => this.setState({ educ_programm: event.target.value.trim() })}
                            defaultValue=''
                        />
                        <TextField
                            margin="dense"
                            id="educ_years"
                            label="Длятельность обучения"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.educ_years}
                            helperText={this.state.errors.educ_years}
                            onChange={(event) => this.setState({ educ_years: event.target.value.trim() })}
                            defaultValue=''
                        />
                        <TextField
                            margin="dense"
                            id="year_join"
                            label="Что то про года"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.year_join}
                            helperText={this.state.errors.year_join}
                            onChange={(event) => this.setState({ year_join: event.target.value.trim() })}
                            defaultValue=''
                        />
                        <TextField
                            margin="dense"
                            id="sub_unit_id"
                            label="Sub_unit_id"
                            type="text"
                            fullWidth={true}
                            error={!!this.state.errors.sub_unit_id}
                            helperText={this.state.errors.sub_unit_id}
                            onChange={(event) => this.setState({ sub_unit_id: event.target.value.trim() })}
                            defaultValue=''
                        />
            
                    </DialogContent>
                    <DialogActions>
                        <Button  //компонент кнопки закрытия модального окна
                            onClick={this.onClose.bind(this)}
                            color="primary"
                            variant="contained"
                        >
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