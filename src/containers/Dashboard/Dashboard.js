import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './Dashboard.module.css'
import {link} from "../../Link";
import {Link} from "react-router-dom";
import {Pie, Bar} from 'react-chartjs-2';
import Moment from 'react-moment';
import _ from "lodash";
import Loader from "../../components/UI/Loader/Loader";


export default class Dashboard extends Component{


    constructor(props) {
        super(props);

        this.data1 = {
        };

        this.state= {
            button_active: false,
            isLoading: true,
            Acad_data: [],
            Dep_data: [],
            dataProject: [],
            choiseAcad: '',
            choiseDep: '',
            choise: '',
            result_choise: '',
            Acad_data_choise: '',
            Dep_data_choise: '',
            errorAcad: [],
            errorsLab: 0,
            errorsSem: 0,
            notData: 0,
            errorCol_Acad: [],
            errorCol_Dep: [],
            sendData: [],
            dataTeatcher: [],
            date: '',
            failProject: [],
            failProject_count: [],
            dataProjectGraf: [],
            filesTeatcherSum: [],
            failTeatcher:0,
            failTeatcherGraf:[],
            teatcherSAPR:0,
            teatcherWEB:0,
            teatcherKIS:0,
            teatcherGraf:{},
            dataStudents:[],
            statisticStudents:{},
            dataStudentsGraf:[],
        }

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this)
        this.comparison = this.comparison.bind(this)

    }

    async componentDidMount() {

        let nowTime = new Date().toLocaleTimeString();
        let nowFullYear = new Date().getFullYear()
        let nowMonth = new Date().getMonth()
        let nowDateD = new Date().getDate()
        let nowDate = `${nowFullYear}-${nowMonth}-${nowDateD}`
        let now = `${nowDate}T${nowTime}`
        //console.log(nowDate)
        //console.log(now)
        this.setState({date: nowDate})

        //в этом методе происходит запрос к серверу по ссылке из параметра url

        // let url = 'http://dashboard.kholodov.xyz/api/acad_plan'
        let url1 = link + '/acad_plan'
        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        try {
            const response = await fetch(url1, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const Acad_data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата ACAD', Acad_data)
            for (let x = 0; x < Acad_data.length; x++) {
                let newYear_join = Acad_data[x].year_join.split('T')
                Acad_data[x].year_join = newYear_join[0]
            }
            this.setState({ // обновляем state
                //isLoading: false,
                Acad_data //_.orderBy(Acad_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }


        let url2 = link + '/dep_load'
        try {
            const response = await fetch(url2, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const Dep_data = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я дата DEP', Dep_data)
            for (let x = 0; x < Dep_data.length; x++) {
                let newBeginDate = Dep_data[x].begin_date.split('T')
                let newEndDate = Dep_data[x].end_date.split('T')
                let newModifDate = Dep_data[x].modified_date.split('T')
                Dep_data[x].begin_date = newBeginDate[0]
                Dep_data[x].end_date = newEndDate[0]
                Dep_data[x].modified_date = newModifDate[0]
            }
            this.setState({ // обновляем state
                //isLoading: false,
                Dep_data //_.orderBy(Dep_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


        let url3 = link + '/projects'
        try {
            const response = await fetch(url3, {
                method: 'GET', //метот для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const dataProject = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я дата dataProject', dataProject)
            for (let x = 0; x < dataProject.length; x++) {
                let newBeginDate = dataProject[x].begin_date.split('T')
                let newEndDate = dataProject[x].end_date.split('T')
                dataProject[x].begin_date = newBeginDate[0]
                dataProject[x].end_date = newEndDate[0]
            }
            this.setState({ // обновляем state
                //isLoading: false,
                dataProject //_.orderBy(Dep_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

            dataProject.map(item => {
                if (item.students_count == 0) {
                    this.state.failProject_count.push(item)
                }
            })

            this.setState({
                dataProjectGraf: {
                    labels: [
                        'Просроченных проектов',
                        'Рабочих проектов',
                        'Проектов без студентов'
                    ],
                    datasets: [{
                        data: [this.state.dataProject.length - this.state.failProject.length, this.state.failProject.length, this.state.failProject_count.length],
                        backgroundColor: [
                            '#FF6384',
                            '#ADFF2F',
                            '#faff5c'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#ADFF2F',
                            '#faff5c'
                        ]
                    }]
                }
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


        let url4 = link + `/teachers`
        try {
            const response = await fetch(url4, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const dataTeatcher = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я дата dataTeatcher', dataTeatcher)
            this.setState({ // обновляем state
                //isLoading: false,
                dataTeatcher //_.orderBy(Acad_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }

        for (let q = 0; q < this.state.dataTeatcher.length; q++) {
            let url5 = link + `/teachers/${this.state.dataTeatcher[q].id}/files_ind_plan`
            try {
                const response = await fetch(url5, {
                    method: 'GET', //метод для получения данных
                    headers: {
                        'Content-Type': 'application/json',//заголовки обязателны для получения данных
                        'Authorization': `Bearer ${token}`
                    }
                })
                const item = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
                //console.log('Я дата filesTeatcher', item)
                this.state.filesTeatcherSum.push(item)

            } catch (e) { // на случай ошибки
                console.log(e)
            }
        }
        //console.log('filesTeatcherSum',this.state.filesTeatcherSum)

        let teatcherSAPR = 0
        let teatcherWEB = 0
        let teatcherKIS = 0

        for (let t = 0; t < this.state.dataTeatcher.length; t++) {
            if (this.state.dataTeatcher[t].sub_unit_id === 1) {
                teatcherSAPR++

            } else if (this.state.dataTeatcher[t].sub_unit_id === 2) {
                teatcherWEB++

            } else if (this.state.dataTeatcher[t].sub_unit_id === 3) {
                teatcherKIS++

            }
            //console.log(`id ${this.state.dataTeatcher[t].id}`,teatcherSAPR, teatcherWEB, teatcherKIS)
        }
        this.setState({
            teatcherSAPR,
            teatcherWEB,
            teatcherKIS,
        })
        //console.log('Финал',this.state.teatcherSAPR, this.state.teatcherWEB, this.state.teatcherKIS)

        this.state.filesTeatcherSum.map(item => {
            if (item.length === 0) {
                this.state.failTeatcher++
            }
        })


        this.setState({
            failTeatcherGraf: {
                labels: [
                    'Преподааватели С инд. планом',
                    'Преподааватели БЕЗ инд. плана',
                ],
                datasets: [{
                    data: [this.state.filesTeatcherSum.length - this.state.failTeatcher, this.state.failTeatcher],
                    backgroundColor: [
                        '#ADFF2F',
                        '#FF6384',
                    ],
                    hoverBackgroundColor: [
                        '#ADFF2F',
                        '#FF6384',
                    ]
                }]
            }
        })


        this.setState({
            teatcherGraf: {
                labels: [
                    'САПР',
                    'ВЕБ',
                    'КИС'
                ],
                datasets: [{
                    data: [this.state.teatcherSAPR, this.state.teatcherWEB, this.state.teatcherKIS],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }
        })




        ////
        let url6 = link + `/students`
        try {
            const response = await fetch(url6, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const dataStudents = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            console.log('Я дата dataStudents', dataStudents)
            this.setState({ // обновляем state
                isLoading: false,
                dataStudents //_.orderBy(Acad_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }
    }

    testingStudents(){
        const {dataStudents} = this.state
        var massYear = []

        function unique(arr) {
            let result = [];

            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }

            return result;
        }

        var statisticStudents = {}

        dataStudents.map(item=>{
            let numGroup = item.group_name.match(/.{1,2}/g)
            massYear.push(numGroup[0])

            let numYear = unique(massYear)

            var result = {};
            massYear.forEach(function(a){
                result[a] = result[a] + 1 || 1;
            });
            for (var key in result){
                statisticStudents[key] = result[key]
            }
            //console.log(statisticStudents)
        })

        let names = Object.keys(statisticStudents)
        let numbers = Object.values(statisticStudents)

        let names_group = []
        for (var i = 0, l = names.length; i < l; i++) {
            names_group.push(`Год 20${names[i]}`)
        }

        this.state.dataStudentsGraf = {
            labels:
                names_group
            ,
            datasets: [{
                data: numbers,
                backgroundColor: [
                    '#00C90D',
                    '#0776A0',
                    '#FF8500',
                    '#FF0700',
                    '#26972D',
                    '#226078',
                    '#BF7A30',
                    '#BF3330',
                    '#008209',
                    '#024C68',
                    '#A65600',
                    '#A60400',
                    '#39E444',
                    '#3AA6D0',
                    '#FFA340',
                    '#FF4540',
                    '#67E46F',
                    '#62B1D0',
                    '#FFBC73',
                    '#FF7673',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
    }

    testingProject(){
        const {dataProject} = this.state

        dataProject.map(item=>{
            if(item.end_date < this.state.date){
                this.state.failProject.push(item)
            }
        })

        dataProject.map(item =>{
            if(item.students_count == 0){
                this.state.failProject_count.push(item)
            }
        })
    }

    testingTeatcher(){
        const {filesTeatcherSum} = this.state

        filesTeatcherSum.map(item=>{
            if(item === []){
                this.state.failTeatcher++
            }
        })
    }

    renderOptionsAcad(){
        return this.state.Acad_data.map((item)=>{
            return(
                <option
                    key={item.name}
                    value={item.id}
                    className={classes.optionList}
                >
                    {item.name}
                </option>
            )
        })
    }

    renderOptionsDep(){
        return this.state.Dep_data.map((item)=>{
            return(
                <option
                    key={item.department_name}
                    value={item.id}
                    className={classes.optionList}
                >
                    {`${item.department_name} ${item.begin_date}:${item.end_date}`}
                </option>
            )
        })
    }

    handleChange(e){
        //console.log('Выбрано',e.target.value)
        this.setState({
            choise:e.target.value
        })
        e.preventDefault();
    }

    search(){
        const {Acad_data, Dep_data, choise, result_choise} = this.state

        let choiseAcad
        let choiseDep
        if(!choise){
            return result_choise
        }

        let res_acad = Acad_data.filter(item=>{
            return item['name'].toLowerCase().includes(choise.toLowerCase())
        })
        choiseAcad = res_acad[0]
        console.log('Результат акад планов, первый, имя',res_acad[0].name)

        let res_dep = Dep_data.filter(item=>{
            return item['department_name'].toLowerCase().includes(choise.toLowerCase())
        })
        choiseDep = res_dep[0]
        if(res_dep.length === 0){
            res_dep.push({department_name:'пусто'})
        }
        console.log('Результат , первый, имя',res_dep[0].department_name)
        if(res_acad[0].name === res_dep[0].department_name){
            let result_choise = res_acad[0].name
            console.log(result_choise)
            this.setState({
                result_choise,
                choiseAcad,
                choiseDep,
                button_active:true,
            })
        }else{
            console.log('Нет совпадений')
        }
    }

    async comparison(){
        const {choiseDep, choiseAcad} = this.state
        //console.log('сравнение')
        //console.log(choiseAcad)
        //console.log(choiseDep)

         let url1 = link + `/acad_plan/${choiseAcad}`
        //let url1 = link + `/acad_plan/102`

        const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
        try {
            const response = await fetch(url1, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const Acad_data_choise = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я дата ACAD detail', Acad_data_choise)
            this.setState({ // обновляем state
                Acad_data_choise
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }


         let url2 = link + `/dep_load/${choiseDep}`
        //let url2 = link + `/dep_load/119`

        try {
            const response = await fetch(url2, {
                method: 'GET', //метод для получения данных
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
            })
            const Dep_data_choise = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
            //console.log('Я дата ACAD detail', Dep_data_choise)
            this.setState({ // обновляем state
                Dep_data_choise
            })

        } catch (e) { // на случай ошибки
            console.log(e)
        }
        let errorsLab = 0
        let errorsSem = 0
        let notData = 0

        let item_dep = this.state.Dep_data_choise.disciplines
        let item_acad = this.state.Acad_data_choise.disciplines

        for(let j=0; j<item_dep.length; j++){

            for (let k = 0;k<item_acad.length; k++ ){


                if(item_dep[j].name === item_acad[k].name){
                    let countGroup = 0
                    item_dep[j].groups.map(itemG =>{
                        countGroup += itemG.count
                    })
                    let xl = 1
                    let xs = 1
                    if(countGroup > 12){
                        xl = Math.ceil(countGroup/12)
                        xs = Math.ceil(countGroup/15)
                    }

                    let idealModel = {
                        i_hours_lec:item_acad.i_hours_lec,
                        i_hours_lab:item_acad.hours_lab*xl,
                        i_hours_sem:item_acad.hours_sem*xs,
                    }

                    if (idealModel.i_hours_lab !== item_dep[j].hours_lab){
                        errorsLab++
                        this.setState({errorsLab})
                        this.state.errorCol_Acad.push(item_acad[k])
                        this.state.errorCol_Dep.push(item_dep[j])
                    }

                    if (idealModel.i_hours_sem !== item_dep[j].hours_sem){
                        errorsSem++
                        this.setState({errorsSem})
                        this.state.errorCol_Acad.push(item_acad[k])
                        this.state.errorCol_Dep.push(item_dep[j])
                    }

                }
            }
        }

        var obj = {};

        for ( var q=0, len=this.state.errorCol_Acad.length; q < len; q++ )
            obj[this.state.errorCol_Acad[q]['id']] = this.state.errorCol_Acad[q];

        this.state.errorCol_Acad = new Array();
        for ( var key in obj )
            this.state.errorCol_Acad.push(obj[key]);

        var obj1 = {};

        for ( var q1=0, len1=this.state.errorCol_Dep.length; q1 < len1; q1++ )
            obj1[this.state.errorCol_Dep[q1]['id']] = this.state.errorCol_Dep[q1];

        this.state.errorCol_Dep = new Array();
        for ( var key1 in obj1 )
            this.state.errorCol_Dep.push(obj1[key1]);

        let errorCol_Acad = this.state.errorCol_Acad
        let errorCol_Dep = this.state.errorCol_Dep

        this.setState({
            errorCol_Acad,
            errorCol_Dep
        })

        this.setState({sendData:{
                acad:this.state.errorCol_Acad,
                dep:this.state.errorCol_Dep
            }})
    }






    render(){
        this.state.failProject = []
        this.testingProject()
        this.testingStudents()
        //this.testingTeatcher()
        const date = new Date();
        return (

            <div className="container">
                {this.state.isLoading
                ?<Loader/>
                :<React.Fragment>
                        <div className="row">
                            <div className="col-4" style={{ height: '300px', width: '300px'}}>
                                <TextField
                                    margin="dense"
                                    id="acad"
                                    label="Выберете учебный план"
                                    type="text"
                                    fullWidth={true}
                                    //error={!!this.state.errors.Acad_data_choise}
                                    //helperText={this.state.errors.Acad_data_choise}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.setState({choiseAcad: event.target.value})
                                    }}
                                    select
                                >
                                    {this.renderOptionsAcad()}
                                </TextField>

                                <TextField
                                    margin="dense"
                                    id="dep"
                                    label="Выберете нагрузку"
                                    type="text"
                                    fullWidth={true}
                                    //error={!!this.state.errors.Acad_data_choise}
                                    //helperText={this.state.errors.Acad_data_choise}
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        this.setState({choiseDep: event.target.value})
                                    }}
                                    select
                                >
                                    {this.renderOptionsDep()}
                                </TextField>

                                {(this.state.choiseDep && this.state.choiseAcad)
                                    ?
                                    <Button
                                        variant="contained"
                                        //color="primary"
                                        style={{backgroundColor:'#007cff', color:'white'}}
                                        size="small"
                                        onClick={this.comparison}
                                    >
                                        Сравнить
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        //color="primary"
                                        //style={{backgroundColor:'#007cff', color:'white'}}
                                        size="small"
                                        disabled
                                    >
                                        Сравнить
                                    </Button>
                                }

                            </div>
                            <div className="col-4" style={{height: '500px', width: '500px'}}>
                                <div className="col-6" style={{padding: '5px'}}>
                                    <div className='row' style={{padding: '5px'}}>
                                        <div className="col">
                                            <h4>Результат сравнения</h4>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding: '5px'}}>
                                        <div className="col">
                                            <h5>Ошибок в лаб. работах:{this.state.errorsLab} </h5>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding: '5px'}}>
                                        <div className="col">
                                            <h5>Ошибок в семенарах:{this.state.errorsSem} </h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            {(this.state.errorsLab || this.state.errorsSem) ?
                                                <button
                                                    type="button"
                                                    className="btn btn-link"
                                                >
                                                    <Link to={{
                                                        pathname: "/errors_col",
                                                        data: this.state.sendData,
                                                    }}>
                                                        {/* <FA name='external-link-square-alt'/>  */}
                                                        Подробнее
                                                    </Link>
                                                </button>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4" style={{height: '500px', width: '500px'}}>
                                <h5>Соотношение студентов по году поступления</h5>
                                <Pie data={this.state.dataStudentsGraf} width={730} height={550} />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4" style={{height: '500px', width: '500px'}}>
                                <h5>Статистика проектов</h5>
                                <Pie data={this.state.dataProjectGraf} width={730} height={550} getElementAtEvent={e => {
                                    console.log(e)}} />
                            </div>
                            <div className="col-4" style={{height: '500px', width: '500px'}}>
                                <h5>Статистика сдачи Индив. планов</h5>
                                <Pie data={this.state.failTeatcherGraf} width={730} height={550} />
                            </div>
                            <div className="col-4" style={{height: '500px', width: '500px'}}>
                                <h5>Распределение преподавателей по профилям</h5>
                                <Pie data={this.state.teatcherGraf} width={730} height={550} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" style={{height: '123px'}}>

                            </div>
                        </div>
                    </React.Fragment>
                }

            </div>
        );
    }
}