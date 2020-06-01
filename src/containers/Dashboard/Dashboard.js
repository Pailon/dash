import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './Dashboard.module.css'
import {link} from "../../Link";
import {Link} from "react-router-dom";
import _ from "lodash";

export default class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            button_active:false,
            Acad_data:[],
            Dep_data:[],
            dataProject:[],
            choiseAcad:'',
            choiseDep:'',
            choise: '',
            result_choise:'',
            Acad_data_choise:'',
            Dep_data_choise:'',
            errorAcad:[],
            errorsLab:0,
            errorsSem:0,
            notData:0,
            errorCol_Acad:[],
            errorCol_Dep:[],
            sendData:[],
            date: '',
            failProject:[],
            preFailProject:[],
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
        console.log(nowDate)
        console.log(now)
        this.setState({date:nowDate})

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
            for(let x=0; x<Acad_data.length; x++){
                let newYear_join = Acad_data[x].year_join.split('T')
                Acad_data[x].year_join = newYear_join[0]
            }
            this.setState({ // обновляем state
                isLoading: false,
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
            console.log('Я дата DEP', Dep_data)
            for(let x=0; x<Dep_data.length; x++){
                let newBeginDate = Dep_data[x].begin_date.split('T')
                let newEndDate = Dep_data[x].end_date.split('T')
                let newModifDate = Dep_data[x].modified_date.split('T')
                Dep_data[x].begin_date = newBeginDate[0]
                Dep_data[x].end_date = newEndDate[0]
                Dep_data[x].modified_date = newModifDate[0]
            }
            this.setState({ // обновляем state
                isLoading: false,
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
            console.log('Я дата dataProject', dataProject)
            for(let x=0; x<dataProject.length; x++){
                let newBeginDate = dataProject[x].begin_date.split('T')
                let newEndDate = dataProject[x].end_date.split('T')
                dataProject[x].begin_date = newBeginDate[0]
                dataProject[x].end_date = newEndDate[0]
            }
            this.setState({ // обновляем state
                isLoading: false,
                dataProject //_.orderBy(Dep_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


    }

    testingProject(){
        const {dataProject} = this.state

        dataProject.map(item=>{
            if(item.end_date < this.state.date){
                this.state.failProject.push(item)
            }
        })
    }

    renderOptionsAcad(){
        return this.state.Acad_data.map((item)=>{
            return(
                <option
                    key={item.name}
                    value={item.id}
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
                >
                    {`${item.department_name} ${item.begin_date}:${item.end_date}`}
                </option>
            )
        })
    }

    handleChange(e){
        console.log('Выбрано',e.target.value)
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
        console.log('сравнение')
        console.log(choiseAcad)
        console.log(choiseDep)

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
        //console.log(this.state.Acad_data_choise.acad_plan.disciplines)
        // for(let i=0; i<this.state.Acad_data_choise.acad_plan.disciplines.length; i++){
        //     //console.log(this.state.Dep_data_choise.dep_load.disciplines)
        //     this.state.Dep_data_choise.dep_load.disciplines.map((item)=>{
        //         if(this.state.Acad_data_choise.acad_plan.disciplines[i].name === item.name){
        //             console.log('совпало')
        //             if(this.state.Acad_data_choise.acad_plan.disciplines.hours_lab !== item.hours_lab){
        //                 console.log('Ошибка в лабах')}
        //             if(this.state.Acad_data_choise.acad_plan.disciplines.hours_lec !== item.hours_lec){
        //                 console.log('Ошибка в лекциях')
        //             }
        //             if(this.state.Acad_data_choise.acad_plan.disciplines.hours_sem !== item.hours_sem){
        //                 console.log('Ошибка в семенарах')
        //             }
        //         }
        //     })
        // }
        //console.log('dep',this.state.Dep_data_choise)
        //console.log('acad',this.state.Acad_data_choise)
        let errorsLab = 0
        let errorsSem = 0
        let notData = 0
        for(let i=0; i<this.state.Dep_data_choise.dep_load.disciplines.length; i++){
            this.state.Acad_data_choise.acad_plan.disciplines.map((item)=>{
                if(this.state.Dep_data_choise.dep_load.disciplines[i].name === item.name){
                    let countGroup = 0
                    //for(let j=0; j<this.state.Dep_data_choise.dep_load.disciplines[i].groups.length; j++){
                        //countGroup= countGroup+ this.state.Dep_data_choise.dep_load.disciplines[i].groups.count
                        this.state.Dep_data_choise.dep_load.disciplines[i].groups.map(item =>{
                            countGroup += item.count
                        })
                    //}
                    //console.log('Сумма всех студентов',countGroup)
                    let xl = 1
                    let xs = 1
                    if(countGroup > 12){
                         xl = Math.ceil(countGroup/12)
                         xs = Math.ceil(countGroup/15)
                        //console.log(`${xl} : ${xs}`)
                    }

                    let idealModel = {
                        i_hours_lec:item.i_hours_lec,
                        i_hours_lab:item.hours_lab*xl,
                        i_hours_sem:item.hours_sem*xs,
                    }

                    if (idealModel.i_hours_lab !== this.state.Dep_data_choise.dep_load.disciplines[i].hours_lab){
                        // console.log('Ошибка лабы')
                        // console.log(idealModel.i_hours_lab)
                        // console.log(this.state.Dep_data_choise.dep_load.disciplines[i].hours_lab)
                        errorsLab++
                        this.setState({errorsLab})
                        this.state.errorCol_Acad.push(item)
                        this.state.errorCol_Dep.push(this.state.Dep_data_choise.dep_load.disciplines[i])
                    }

                    if (idealModel.i_hours_sem !== this.state.Dep_data_choise.dep_load.disciplines[i].hours_sem){
                        // console.log('Ошибка семенары')
                        // console.log(idealModel.i_hours_sem)
                        // console.log(this.state.Dep_data_choise.dep_load.disciplines[i].hours_sem)
                        errorsSem++
                        this.setState({errorsSem})
                        this.state.errorCol_Acad.push(item)
                        this.state.errorCol_Dep.push(this.state.Dep_data_choise.dep_load.disciplines[i])
                    }

                    console.log(idealModel)
                }
            })
            notData++
            this.setState({notData})
        }
        console.log('Без совпадений',notData)
        console.log('Ошибок в лабах',errorsLab)
        console.log('Ошибок в семенарах',errorsSem)
        console.log('Ошибочные акады',this.state.errorCol_Acad)
        console.log('Ошибочные депы',this.state.errorCol_Dep)

        this.setState({sendData:{
            acad:this.state.errorCol_Acad,
            dep:this.state.errorCol_Dep
            }})

        // this.state.sendData.acad = this.state.errorCol_Acad
        // this.state.sendData.dep = this.state.errorCol_Dep

        console.log(this.state.sendData)


    }



    render(){
        this.state.failProject = []
        this.testingProject()
        return(
            <div>
                <div className='container' style={{height: '300px', width:'500px'}}>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                id="acad"
                                label="Acad"
                                type="text"
                                fullWidth={true}
                                //error={!!this.state.errors.Acad_data_choise}
                                //helperText={this.state.errors.Acad_data_choise}
                                onChange={(event) => {
                                    console.log(event.target.value)
                                    this.setState({ choiseAcad: event.target.value })
                                }}
                                select
                            >
                                {this.renderOptionsAcad()}
                            </TextField>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                id="dep"
                                label="Dep"
                                type="text"
                                fullWidth={true}
                                //error={!!this.state.errors.Acad_data_choise}
                                //helperText={this.state.errors.Acad_data_choise}
                                onChange={(event) => {
                                    console.log(event.target.value)
                                    this.setState({ choiseDep: event.target.value })
                                }}
                                select
                            >
                                {this.renderOptionsDep()}
                            </TextField>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.comparison}
                    >
                        Сравнить
                    </Button>
                </div>


                <div className='container'>
                    <div className="row">
                        <div className="col-6" style={{border:'1px solid', padding:'5px'}}>
                            <div className='row' style={{padding:'5px'}}>
                                <div className="col">
                                    <h4>Результат сравнения</h4>
                                </div>
                            </div>
                            <div className="row" style={{padding:'5px'}}>
                                <div className="col">
                                    <h5>Без совпадения:{this.state.notData} </h5>
                                </div>
                            </div>
                            <div className="row" style={{padding:'5px'}}>
                                <div className="col">
                                    <h5>Ошибок в лаб. работах:{this.state.errorsLab} </h5>
                                </div>
                            </div>
                            <div className="row" style={{padding:'5px'}}>
                                <div className="col">
                                    <h5>Ошибок в семенарах:{this.state.errorsSem} </h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {(this.state.errorsLab || this.state.errorsSem)?
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
                        <div className="col-6" style={{border:'1px solid'}}>
                            <div className='row' style={{padding:'5px'}}>
                                <div className="col">
                                    <h4>Проектная деятельность</h4>
                                </div>
                            </div>
                            <div className="row" style={{padding:'5px'}}>
                                <div className="col">
                                    <h5>Активных проектов:{this.state.dataProject.length} </h5>
                                </div>
                            </div>
                            {/*<div className="row" style={{padding:'5px'}}>*/}
                            {/*    <div className="col">*/}
                            {/*        <h5>Подходят к концу: {this.state.preFailProject.length}</h5>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="row" style={{padding:'5px'}}>
                                <div className="col">
                                    <h5>Просроченные проекты: {this.state.failProject.length}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {(this.state.failProject)?
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                        >
                                            <Link to={{
                                                pathname: "/fail_project",
                                                data: this.state.failProject,
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


                </div>

            </div>
    )
    }
}