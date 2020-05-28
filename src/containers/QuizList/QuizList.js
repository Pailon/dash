import React, { Component } from 'react'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import Table from '../../components/UI//Table/Table'
import _ from 'lodash'
import ReactPaginate from 'react-paginate';
import TableSearch from '../../containers/TableSearch/TableSearch'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '../../components/UI/Alert/Alert'
import {link} from "../../Link";

export default class QuizList extends Component {


    constructor(props){ //конструктор этого класса
        super(props);
        this.onUpdate = this.onUpdate.bind(this)
    }


    state = {
        data: [],//тут хранится массив приходящих данных
        itemActive:false,
        isLoading: true, //отображать загрузку или нет
        sort: 'asc',  //desc сортировка - asc - это по возрастанию, desc - по убыванию
        sortArrow: 'arrow-up',//куда по умолчанию показывает стрелочка сортировки
        sortField: 'person_id', // параметр для сортировки, person_id - дефолтный
        row: null, // поле для хранения строки для её будущего отображения отдельно/подробно
        currentPage: 0, //количество страниц на данный момент
        search: '', //что искать
        openModal:false,// видно ли модальное окно
        errorModal:false, 
        openAlert:false,//видно ли окно оповещения
        color:'',//значение для окна оповещения - его цвет
        text:'',//текст окна оповещения
        item:'',
        //буферные значения для добавления преподавателя
        name:'',
        surname:'',
        patronymic:'',
        email:'',
        phone:'',
        rank_id:'',
        degree_id:'',
        rate:'',
        hourse_worked:'',
        rinc:'',
        web_of_science:'',
        scopus:'',
        person_id:'',
        birthday:'',
        login:'',
        password:'',
        //значения ошибок при добавлении преподавателя
        errors:{
            // id:'',
            name:'',
            surname:'',
            patronymic:'',
            email:'',
            phone:'',
            rank_id:'',
            degree_id:'',
            rate:'',
            hourse_worked:'',
            rinc:'',
            web_of_science:'',
            scopus:'',
            person_id:'',
            birthday:'',
            login:'',
            password:'',
        }
    }

    async componentDidMount() {

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        //let url = 'http://dashboard.kholodov.xyz/api/teachers'
        let url = link + '/teachers'
        //console.log(url1)
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
             //console.log('Я ответ', response)


            const data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я ответ', data)
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
        return data.filter(item => {
            return item['name'].toLowerCase().includes(search.toLowerCase())
                || item['surname'].toLowerCase().includes(search.toLowerCase()) 
                || item['patronymic'].toLowerCase().includes(search.toLowerCase())
                || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }

    newTeatcher = () => { //открыть модальное окно для добавления преподавателя
        this.setState({openModal:true})
    }

    onClose = () =>{
        //функция зарытия модального окна без завершения добавления преподавателя
        //обнуления буферных данных, и закрытие самого окна
        this.setState({
            openModal:false,
            name:'',
            secondName:'',
            patronymic:'',
            email:'',
            phone:'',
            rank_id:'',
            degree_id:'',
            rate:'',
            hourse_worked:'',
            rinc:'',
            web_of_science:'',
            scopus:'',
            person_id:'',
            birthday:'',
            login:'',
            password:'',
            errors:{
                name:'',
                surname:'',
                patronymic:'',
                email:'',
                phone:'',
                rank_id:'',
                degree_id:'',
                rate:'',
                hourse_worked:'',
                rinc:'',
                web_of_science:'',
                scopus:'',
                person_id:'',
                birthday:'',
                login:'',
                password:'',
            }  
        })
    }

        async onAdd() {  //Функция добавления нового преподавателя в таблицу и на сервер
            let errors = {}
            //Серия проверок на пустоту полей, если пусто, то мы добавим в state сообщение об ошибке, для будущего отображения
            //Можно кастомизировать ошибку для каждого поля
            if (!this.state.rate) {
                errors.rate = 'Это поле не может быть пустым'
            }
            if (!this.state.hourse_worked) {
                errors.hourse_worked = 'Это поле не может быть пустым'
            }
            if (!this.state.rinc) {
                errors.rinc = 'Это поле не может быть пустым'
            }
            if (!this.state.web_of_science) {
                errors.web_of_science = 'Это поле не может быть пустым'
            }
            if (!this.state.scopus) {
                errors.scopus = 'Это поле не может быть пустым'
            }
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
            if (!this.state.login) {
                errors.login = 'Это поле не может быть пустым'
            }
            if (!this.state.password) {
                errors.password = 'Это поле не может быть пустым'
            }
            //Если хотя бы одно из этих полей пустое мы обновляем state и добавляем туда сообщения об ошибках в пустых полях
            //В ином случае, если все поля заполнены мы берем все данные из полей и производим запрос к серверу
            if(/*errors.rank_id || errors.degree_id ||*/ errors.rate
                || errors.hourse_worked || errors.rinc || errors.web_of_science || errors.scopus || errors.name
                || errors.surname || errors.patronymic || errors.birthday || errors.phone || errors.email 
                ||errors.login || errors.password)
                {
                    this.setState({errors}) //добавление ошибок в state
                    console.log(this.state.data);//для проверки выводим в консоль - временно
                    return 
                }else{
            let data = this.state.data // клонируем обьект data из state

            let newTeatcher ={  //Создаём обьект нового преподавателя, чтобы потом отправить на сервер
                position:'Преподаватель', //Позиция статична, так как таблица преподавателей
                rank_id: null,//this.state.rank_id, //сейчас статично null потом поменять
                degree_id:null,//this.state.degree_id, //сейчас статично null потом поменять
                rate:this.state.rate,
                hours_worked:this.state.hourse_worked,
                rinc:this.state.rinc,
                web_of_science:this.state.web_of_science,
                scopus:this.state.scopus,
                name:this.state.name,
                surname:this.state.surname,
                patronymic:this.state.patronymic,
                birthday:this.state.birthday,
                phone:this.state.phone,
                email:this.state.email,
                status:2,//статично
                role:4,//статично
                sub_unit_id:1,//не знаю что это
                login:this.state.login.trim(),
                password:this.state.password.trim()
            }
            //console.log(this.state.data);// выведем обьект с данными для проверки
            this.setState({openModal:false})//Закрываем модальное окно добавления преподавателя

            let url = 'http://dashboard.kholodov.xyz/api/teachers' //ссылка для запроса к таблице преподаавтелей
            const token = localStorage.getItem('token')// взяли токен

            try {
                const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(newTeatcher), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
                });
                const json = await response.json();
                console.log('Успех:', JSON.stringify(json));// результат запроса
                console.log(newTeatcher)//выводит обьект того, что добавлено на сервер
                newTeatcher = {}//обнулили буферный обьект для нового преподавателя

                data.push({ //добавляем в обьект data все то же что и в newTeatcher, чтобы сразу видить изменения в таблице
                    position:'Преподаватель',
                    rank_id:this.state.rank_id,
                    degree_id:this.state.degree_id,
                    rate:this.state.rate,
                    hourse_worked:this.state.hourse_worked,
                    rinc:this.state.rinc,
                    web_of_science:this.state.web_of_science,
                    scopus:this.state.scopus,
                    name:this.state.name,
                    surname:this.state.surname,
                    patronymic:this.state.patronymic,
                    birthday:this.state.birthday,
                    phone:this.state.phone,
                    email:this.state.email,
                    status:2,
                    role:4,
                    sub_unit_id:1,
                    login:this.state.login,
                    password:this.state.password,
                    id:json.id
                })
                this.setState({ //обнуляем буферные значения  для добавления будущего преподавателя
                    name:'',
                    secondName:'',
                    patronymic:'',
                    email:'',
                    phone:'',
                    rank_id:'',
                    degree_id:'',
                    rate:'',
                    hourse_worked:'',
                    rinc:'',
                    web_of_science:'',
                    scopus:'',
                    birthday:'',
                    login:'',
                    password:'',
                    errors:{
                        name:'',
                        surname:'',
                        patronymic:'',
                        email:'',
                        phone:'',
                        rank_id:'',
                        degree_id:'',
                        rate:'',
                        hourse_worked:'',
                        rinc:'',
                        web_of_science:'',
                        scopus:'',
                        birthday:'',
                        login:'',
                        password:'',
                    }
                })


                this.setState({openAlert:true, color:'success', text:'Успешно'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
                this.setState({openAlert:true, color:'danger', text:'Произошла ошибка'},()=>{
                    window.setTimeout(()=>{
                        this.setState({openAlert:false})
                    },2000)
                });
            }
            }  
        }

    


    async onUpdate (data, item, id, oldData) { //функция обновления данных в таблице, получает от таблицы
        //console.log(data)                    //data-значение которое меняют item-весь обьект, в котором значение меняют id oldData 
        //console.log(item)                    //id-параметр из обьекта item чтобы проще производить запрос к api oldData-значение до изменения  
        //console.log(oldData)
        
        if (data != oldData){ //узнаём изменилось ли значение функции, если нет, то зачем производить запрос?

        let url = `http://dashboard.kholodov.xyz/api/teachers/${id}` //ссылка для запросов, куда подставляется id
        const token = localStorage.getItem('token')//берем токен и локального хранилищя

        try {
            const response = await fetch(url, { //производим запрос
              method: 'PUT', // или 'POST'
              body: JSON.stringify(item), // данные могут быть 'строкой' или {объектом}!
              headers: {
                'Content-Type': 'application/json',//заголовки обязателны для получения данных
                'Authorization': `Bearer ${token}`
            }
            });
            const json = await response.json();
            console.log('Результат:', JSON.stringify(json));
            //console.log(item)
            //this.setState({openAlert:true, color:'success', text:'Изменено'})//при успешном отображении отображаем окно об успешноти
            this.setState({openAlert:true, color:'success', text:'Изменено'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
            item = {}
          } catch (error) {
            console.error('Ошибка:', error);//Отображаем ошибку в консоль
            //this.setState({openAlert:true, color:'danger', text:'Произошла ошибка'})//Выводим окно ошибки
            this.setState({openAlert:true, color:'danger', text:'Произошла ошибка'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
          }
        }else{
            console.log('Изменений не было')// а если мы ничего не меняли, скажем об этом в консоли
            this.setState({openAlert:true, color:'secondary', text:'Без изменений'},()=>{
                window.setTimeout(()=>{
                    this.setState({openAlert:false})
                },2000)
            });
        }
    
    }
    onCloseAlert = () =>{
        this.setState({openAlert:false}) // закрыть окно оповещения
    }

    render() {
        //количество строк на одну страницу
        const pageSize = 10

        //вызываем функцию поиска
        const filtredData = this.getFiltredData()

        //вычисляем сколько всего будет страниц исходя из общего количества данных и данных на 1 страницу
        const pageCount = Math.ceil(filtredData.length / pageSize)

        const displayData = _.chunk(filtredData, pageSize)[this.state.currentPage]// 
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
                    :null
                }
                {
                    this.state.isLoading
                        ? <Loader /> //пока не получены данные отображается loader иначе отображам таблицу
                        : <React.Fragment>                       
                            <TableSearch onSearch={this.searchHandler} />

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.newTeatcher}
                                className="mb-2"
                            >Добавить <br/>преподавателя</Button>

                            <Table
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

                {/* {
                    this.state.row //отрисовка окна дополнительных данных
                        ? <DetailRowView person={this.state.row} />
                        : null
                } */}
    { //Далее идет описание модального окна в которое входят все поля ввода, прописанные отдель
    }
    <Dialog 
            open={this.state.openModal} 
            onClose={this.onClose.bind(this)} 
            aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавление нового преподавателя</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные нового преподавателя
          </DialogContentText>
        <TextField   //все модули TextFiled это поля ввода имеющие несколько ключевых свойств
            autoFocus 
            margin="dense"
            id="name"
            label="Имя преподавателя" //описание поля ввода
            type="text" //тип вводимой информации
            fullWidth = {true} 
            error={!!this.state.errors.name}// true or false, отображать ошибку или нет
            helperText={this.state.errors.name} // текст отображаемый при ошибке
            onChange={(event)=>this.setState({name :event.target.value.trim()})} //функция которая вызывается при изменении значения
                                                                                //функция записывает новое значение при  
                                                                                //каждом изменении в нужную  буферную переменную в state
          />
        <TextField
            margin="dense"
            id="surname"
            label="Фамилия преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.surname}
            helperText={this.state.errors.surname}
            onChange={(event)=>this.setState({surname :event.target.value.trim()})}
          />
        <TextField
            margin="dense"
            id="patronymic"
            label="Отчество преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.patronymic}
            helperText={this.state.errors.patronymic}
            onChange={(event)=>this.setState({patronymic :event.target.value.trim()})}
          />
        <TextField
            margin="dense"
            id="birthday"
            label="День рождение преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.birthday}
            helperText={this.state.errors.birthday}
            onChange={(event)=>this.setState({birthday :event.target.value.trim()})}
            defaultValue='05-03-2020'
          />
        <TextField
            margin="dense"
            id="phone"
            label="Телефон преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.phone}
            helperText={this.state.errors.phone}
            onChange={(event)=>this.setState({phone :event.target.value.trim()})}
            defaultValue='8(800)555-35-35'
          />
        <TextField
            margin="dense"
            id="email"
            label="E-mail адрес преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.email}
            helperText={this.state.errors.email}
            onChange={(event)=>this.setState({email :event.target.value.trim()})}
            defaultValue='myMail@mail.ru'
          /> 

        <TextField
            margin="dense"
            id="rate"
            label="Ставка преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rate}
            helperText={this.state.errors.rate}
            onChange={(event)=>this.setState({rate :event.target.value.trim()})}
            defaultValue='0.25'
          />
        <TextField
            margin="dense"
            id="hourse_worked"
            label="Количество рабочих часов преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.hourse_worked}
            helperText={this.state.errors.hourse_worked}
            onChange={(event)=>this.setState({hourse_worked :event.target.value.trim()})}
            defaultValue='300'
          />
        <TextField
            margin="dense"
            id="rinc"
            label="Rinc преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.rinc}
            helperText={this.state.errors.rinc}
            onChange={(event)=>this.setState({rinc :event.target.value.trim()})}
            defaultValue='0.1'
          />
        <TextField
            margin="dense"
            id="web_of_science"
            label="Web of science преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.web_of_science}
            helperText={this.state.errors.web_of_science}
            onChange={(event)=>this.setState({web_of_science :event.target.value.trim()})}
            defaultValue='0.1'
          />
        <TextField
            margin="dense"
            id="scopus"
            label="Scopus преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.scopus}
            helperText={this.state.errors.scopus}
            onChange={(event)=>this.setState({scopus :event.target.value.trim()})}
            defaultValue='0.1'//знчение по умолчанию
          />
        <TextField
            margin="dense"
            id="login"
            label="Login преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.login}
            helperText={this.state.errors.login}
            onChange={(event)=>this.setState({login :event.target.value.trim()})}
          />
        <TextField
            margin="dense"
            id="password"
            label="Пароль преподавателя"
            type="text"
            fullWidth = {true}
            error={!!this.state.errors.password}
            helperText={this.state.errors.password}
            onChange={(event)=>this.setState({password :event.target.value.trim()})}
            defaultValue='root'
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