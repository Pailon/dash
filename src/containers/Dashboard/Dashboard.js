import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './Dashboard.module.css'
import {link} from "../../Link";
import _ from "lodash";

export default class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state={
            button_active:false,
            Acad_data:[],
            Dep_data:[],
            choiseAcad:'',
            choiseDep:'',
            choise: '',
            result_choise:'',
            Acad_data_choise:'',
            Dep_data_choise:'',
            errorAcad:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this)
        this.comparison = this.comparison.bind(this)
    }



    async componentDidMount() {

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
            this.setState({ // обновляем state
                isLoading: false,
                Acad_data: _.orderBy(Acad_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
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
            this.setState({ // обновляем state
                isLoading: false,
                Dep_data: _.orderBy(Dep_data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
            })

        } catch (e) { // на случай ошибки
            console.log(e)

        }


    }

    renderOptions(){
        return this.state.Acad_data.map((item)=>{
            return(
                <option
                    key={item.name}
                    value={item.name}
                >
                    {item.name}
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
        const {choiseAcad, choiseDep} = this.state
        console.log('сравнение')
        //console.log(choiseAcad)
        //console.log(choiseDep)

        // let url1 = link + `/acad_plan/${choiseAcad.id}`
        let url1 = link + `/acad_plan/102`

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


        // let url2 = link + `/dep_load/${choiseDep.id}`
        let url2 = link + `/dep_load/119`

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
        console.log('dep',this.state.Dep_data_choise)
        console.log('acad',this.state.Acad_data_choise)
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
                    console.log('Сумма всех студентов',countGroup)
                    let xl = 1
                    let xs = 1
                    if(countGroup > 12){
                         xl = Math.ceil(countGroup/12)
                         xs = Math.ceil(countGroup/15)
                        console.log(`${xl} : ${xs}`)
                    }

                    let idealModel = {
                        i_hours_lec:item.i_hours_lec,
                        i_hours_lab:item.hours_lab*xl,
                        i_hours_sem:item.hours_sem*xs,
                    }

                    if (idealModel.i_hours_lab !== this.state.Dep_data_choise.dep_load.disciplines[i].hours_lab){
                        console.log('Ошибка лабы')
                        console.log(idealModel.i_hours_lab)
                        console.log(this.state.Dep_data_choise.dep_load.disciplines[i].hours_lab)
                    }

                    if (idealModel.i_hours_sem !== this.state.Dep_data_choise.dep_load.disciplines[i].hours_sem){
                        console.log('Ошибка семенары')
                        console.log(idealModel.i_hours_sem)
                        console.log(this.state.Dep_data_choise.dep_load.disciplines[i].hours_sem)
                    }

                    console.log(idealModel)
                }
            })
        }

    }



    render(){
        return(
            <div className={classes.inputText}>
                <select
                onChange={this.handleChange}
                >
                    <option value="none" hidden="">Выберите учебный план</option>
                    {this.renderOptions()}
                </select>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.search}
                >
                    Найти
                </Button>

                {this.state.button_active
                    ?<Button
                        variant="contained"
                        color="primary"
                        onClick={this.comparison}
                    >
                        Сравнить
                    </Button>
                    :
                    <Button
                        variant="contained"
                        color="primary"
                        disabled
                    >
                        Сравнить
                    </Button>
                }
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    onClick={this.comparison}*/}

                {/*>*/}
                {/*    Сравнить*/}
                {/*</Button>*/}
            </div>
        )
    }
}