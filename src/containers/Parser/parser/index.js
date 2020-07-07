import React, { Component } from 'react';
import XLSX from 'xlsx'; // Библиотека парсера
import { make_cols, SheetJSFT } from './utils'; // Доп. функции для парсера
import { ViewerTable } from '../viewer-table/index'; // Компонент для отображения данных
import './style.css';
import { Button } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {link} from "../../../Link";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "../../../components/UI/Alert/Alert";

class Parser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSpec:[],
        dataDep:[],
        dataDepar:[],
        option_id:1,
        id:'',
        depart_id:'',
        spec_id:'',
        begin_date:'',
        end_date:'',
        openAlert:false,
      file: {},
      data: [],
      data_filtered: [],
      cols: [],
      search_Text: '',
      search_Text_Value: '',
      disabled: true, //включено ли поле для поиска,
        errors:{
            spec_id:'',
            id:'',
        }

    }
    this.uploadData = this.uploadData.bind(this)
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.nameSer = this.nameSer.bind(this);
    this.url="http://localhost:4000/shrek/";
  }


  async componentDidMount() {
      //в этом методе происходит запрос к серверу по ссылке из параметра url
      // let url = 'http://dashboard.kholodov.xyz/api/acad_plan'
      let url1 = link + '/specialties'
      const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
      //console.log(token)
      try {
          const response = await fetch(url1, {
              method: 'GET', //метод для получения данных
              headers: {
                  'Content-Type': 'application/json',//заголовки обязателны для получения данных
                  'Authorization': `Bearer ${token}`
              }
          })
          //console.log('Я ответ', response)
          const dataSpec = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
          console.log('Я дата dataSpec', dataSpec)
          this.setState({ // обновляем state
              isLoading: false,
              //dataAcad: _.orderBy(dadataAcadta, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
              dataSpec
          })
      } catch (e) { // на случай ошибки
          console.log(e)
      }


      let url4 = link + '/department'
      //const token = localStorage.getItem('token') // из localstorage берем токен, если он там есть
      //console.log(token)
      try {
          const response = await fetch(url4, {
              method: 'GET', //метот для получения данных
              headers: {
                  'Content-Type': 'application/json',//заголовки обязателны для получения данных
                  'Authorization': `Bearer ${token}`
              }
          })
          //console.log('Я ответ', response)
          const dataDepar = await response.json() // Запоминаем ответ сервера в переменную data которая есть в state
          console.log('Я дата Depar', dataDepar)

          this.setState({ // обновляем state
              isLoading: false,
              //data: _.orderBy(data, this.state.sortField, this.state.sort)//первичная сортировка данных, для порядка
              dataDepar
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

    renderOptionsDepar(){
        return this.state.dataDepar.map((item)=>{
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

    /* Обработчик input поля для файла */
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] }, () => { this.handleFile() });
    
  };


  handleFile() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Парсинг данных */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Получаем первый лист */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Преобразуем данные в необходимый формат */
      const data = XLSX.utils.sheet_to_json(ws, { header: "A" });
      console.log(data);
      
      const html = XLSX.utils.sheet_to_html(ws);
      /* Обновляем состояние */
      this.setState({data: data, cols: make_cols(ws['!ref']), html: html }, () => {
        /* cols - Наименования столбцов */
      });

    };

    this.setState({disabled: false});

    /* Если бинарник, то читаем как бинарник */
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

loadClick(e)//обработка кнопки "Загрузить с сервера"
 {
    fetch(this.url)
    .then(response => response.json())
    .then(dadata => {this.setState({data: dadata.data, cols: dadata.cols, disabled: false});});
  
 }



 search(event) {//поиск
  this.setState({search_Text: this.state.search_Text_Value});
  let valueSer=this.state.search_Text_Value;

  var filteredList = this.state.data.filter(function(item){

    for (let key in item) {
      if (String(item[key]).toLowerCase().search(valueSer.toLowerCase()) !== -1) {
        return item; 
      }
    }
  });
  this.setState({data_filtered: filteredList});
}
nameSer(event) {
  this.setState({search_Text_Value: event.target.value});
}

async uploadData(){


    const token = localStorage.getItem('token')// взяли токен
    console.log(token)
    //getHours(), getMinutes(), getSeconds(), getMilliseconds()
    //getFullYear() getMonth() getDate()
    //let nowDate = new Date().toLocaleDateString()
    let nowTime = new Date().toLocaleTimeString();
    let nowFullYear = new Date().getFullYear()
    let nowMonth = new Date().getMonth()
    let nowDateD = new Date().getDate()
    let nowDate = `${nowFullYear}-${nowMonth}-${nowDateD}`
    let now = `${nowDate}T${nowTime}`
    console.log(now)



      let fetchDataAcad = {
        modified_date: now,
        specialties_id: this.state.spec_id,
          disciplines:[]
      }

      let fetchDataDep = {
        department_id: this.state.depart_id,
        begin_date: this.state.begin_date,
        end_date: this.state.end_date,
        modified_date: now,
        disciplines:[]
    }

    let groops = []

    //console.log(fetchData)
    if (this.state.data === 0){
      console.log('Не загружены данные')
    }else{
        let sem_number = 1
        if(this.state.data[0].A === 'Расчет часов учебной работы по кафедре Инфокогнитивные технологии'){
            console.log('Нагрузка')
            for(let i=4; i<this.state.data.length; i++){
                let bufData = this.state.data[i]

                let myReg0 = /(Семестр)/
                let sem = myReg0.test(bufData.A)

                let myReg4 = /(Итого)/
                let itogo = myReg4.test(bufData.A)

                let num_groups = []

                if(sem){
                    let a = bufData.A.split(' ')
                    sem_number = +a[a.length - 1]
                }

                if(bufData.C !== undefined){
                    let b = bufData.C.split(';')
                    num_groups = b.slice(0, -1)
                    groops.push(num_groups)


                }

                if (sem || itogo) continue;

                if(itogo) break


                if(!!bufData.A){

                    let newData = {
                        name: bufData.A!==undefined ? bufData.A : null,
                        hours_con_project:bufData.H!==undefined ? bufData.H : null,
                        hours_lec:bufData.I!== undefined ?bufData.I :null,
                        hours_sem:bufData.J!== undefined ? bufData.J : null,
                        hours_lab:bufData.L!== undefined ? bufData.L : null,
                        hours_con_exam:bufData.N!==undefined ? bufData.N : null,
                        hours_zachet:bufData.P!== undefined ? bufData.P : null,
                        hours_exam:bufData.R!== undefined ? bufData.R : null,
                        hours_kurs_project:bufData.T!==undefined ? bufData.T : null,
                        hours_gek:bufData.V!==undefined ? bufData.V : null,
                        hours_ruk_prakt:bufData.W!== undefined ? bufData.W : null,
                        hours_ruk_vkr:bufData.X!==undefined ? bufData.X : null,
                        hours_ruk_mag:bufData.Y!==undefined ? bufData.Y : null,
                        hours_ruk_asperant:bufData.Z!== undefined ? bufData.Z : null,
                        semester_num:sem_number,
                        groups:num_groups,
                        is_approved:false
                    }
                    fetchDataDep.disciplines.push(newData)
                    groops = []
                }

            }

            console.log(fetchDataDep)
            console.log(groops)

            let url = 'http://dashboard.kholodov.xyz/api/dep_load' //ссылка для запроса к таблице преподаавтелей
            try {
                const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(fetchDataDep), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
                })
                const res = await response;
                //console.log('Успех:', JSON.stringify(json));// результат запроса
                console.log('Ответ:',res);
                
                console.log(fetchDataDep)//выводит объект того, что добавлено на сервер


                const resJson = await res.json()
                console.log('resJson:',resJson)
                const newData = new FormData(document.forms.inputForm)
                newData.append('dep_load_id', resJson.id)


                let url3 = `http://dashboard.kholodov.xyz/api/uploads/dep_load` //ссылка для запроса к таблице преподаавтелей
                const token1 = localStorage.getItem('token')// взяли токен

                try {
                    const response = await fetch(url3, {
                        method: 'POST', // или 'PUT'
                        body: newData, // данные могут быть 'строкой' или {объектом}!
                        headers: {
                            // 'Content-Type': 'multipart/form-data;boundary="boundary"',//заголовки обязателны для получения данных
                            'Authorization': `Bearer ${token1}`
                        }
                    });
                    //const json = await response.json();

                    //console.log('Ответ:', JSON.stringify(json))
                    if(response.status === 201) {
                        this.setState({openAlert: true, color: 'success', text: 'Успешно'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }
                    if (response.status === 400) {
                        this.setState({openAlert: true, color: 'danger', text: 'Неверные данные'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }
                    if (response.status === 500) {
                        this.setState({openAlert: true, color: 'danger', text: 'Ошибка загрузки файла'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }
                } catch (error) {
                    console.error('Ошибка:', error); //выдаёт ошибку в консоль
                }



            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
            }
        }


        let nameBlock
        let namePart
        let nameModule

        if(this.state.data[5].V === ' УЧЕБНЫЙ ПЛАН') {
            console.log('Учебный план')
            for(let i=23; i<this.state.data.length - 11; i++){
                let bufData = this.state.data[i]

                let arrayD=[]
                let arrayAG =[]
                let arrayAI =[]
                let arraySem =[]
                let forsName

                let myReg1 = /(БЛОК)/ //block
                let myReg2 = /(Часть|часть)/ //part
                let myReg3 = /(Модуль)/ //module

                let block = myReg1.test(bufData.F)
                let part = myReg2.test(bufData.F)
                let module = myReg3.test(bufData.F)


                if(block){
                    nameBlock = bufData.F
                }
                if(part){
                    namePart = bufData.F
                }
                if(module){
                    nameModule = bufData.F
                }

                if(bufData.D === undefined){
                    if (block===true || part===true || module===true) continue;
                    forsName = bufData.F
                    bufData = this.state.data[i-1]
                    bufData.F = forsName
                }
                if(bufData.D.length>1){
                    arrayD = bufData.D.split('.')
                }

                if(bufData.AG===undefined){
                    bufData.AG=''
                }
                if(String(bufData.AG).length === 1){
                    arrayAG.push(bufData.AG)
                }
                if(String(bufData.AG).length > 1){
                    console.log(bufData.AG,'bufData.AG')
                    arrayAG.push(String(bufData.AG).split('.'))
                    console.log('arrayAG',arrayAG)
                }

                if(bufData.AI===undefined){
                    bufData.AI=''
                }

                if(bufData.AI.length > 1){
                    arrayAI = bufData.AI.split(',')

                    for(let i = 0; i < arrayAI.length; i++) {
                        arrayAI[i] = +arrayAI[i];
                    }

                }
                if(bufData.AI.length === 1){
                    bufData.AI= +bufData.AI
                    arrayAI.push(bufData.AI)
                }

                if(bufData.AV !== undefined){
                    arraySem.push(bufData.AV)
                }else{arraySem.push(null)}
                if(bufData.AW !== undefined){
                    arraySem.push(bufData.AW)
                }else{arraySem.push(null)}
                if(bufData.AX !== undefined){
                    arraySem.push(bufData.AX)
                }else{arraySem.push(null)}
                if(bufData.AY !== undefined){
                    arraySem.push(bufData.AY)
                }else{arraySem.push(null)}
                if(bufData.AZ !== undefined){
                    arraySem.push(bufData.AZ)
                }else{arraySem.push(null)}
                if(bufData.BA !== undefined){
                    arraySem.push(bufData.BA)
                }else{arraySem.push(null)}
                if(bufData.BB !== undefined){
                    arraySem.push(bufData.BB)
                }else{arraySem.push(null)}


                let acad_part_code = String(arrayD[0] + '.' + arrayD[1])
                let acad_module_code = arrayD[0] + '.' + arrayD[1] + '.' + arrayD[2]


                if (block===true || part===true || module===true) continue;

                let newData ={
                    name:bufData.F,
                    code:bufData.D,
                    zet: bufData.AJ,
                    hours_lec: bufData.AO!==undefined ? bufData.AO : null,
                    hours_lab: bufData.AQ!==undefined ? bufData.AQ : null,
                    hours_sem: bufData.AS!==undefined ? bufData.AS : null,
                    acad_block_code: arrayD[0],
                    acad_block_name: nameBlock,
                    acad_part_code: acad_part_code,
                    acad_part_name: namePart,
                    acad_module_code:acad_module_code,
                    acad_module_name: nameModule,
                    exam:arrayAG,
                    zachets:arrayAI,
                    semesters:arraySem,
                    is_optional: false
                }
                fetchDataAcad.disciplines.push(newData)
            }
            console.log(fetchDataAcad)

            let url = 'http://dashboard.kholodov.xyz/api/acad_plan' //ссылка для запроса к таблице преподаавтелей
            //const token = localStorage.getItem('token')// взяли токен
            try {
                const response = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(fetchDataAcad), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json',//заголовки обязателны для получения данных
                    'Authorization': `Bearer ${token}`
                }
                });
                const res = await response;
                console.log('Ответ:', res)// результат запроса
                console.log(fetchDataAcad)//выводит обьект того, что добавлено на сервер

                const resJson = await res.json()
                console.log('resJson:',resJson)

                const newData = new FormData(document.forms.inputForm)
                newData.append('acad_plan_id', resJson.id)

                let url3 = `http://dashboard.kholodov.xyz/api/uploads/acad_plan` //ссылка для запроса к таблице преподаавтелей
                const token1 = localStorage.getItem('token')// взяли токен

                try {
                    const response = await fetch(url3, {
                        method: 'POST', // или 'PUT'
                        body: newData, // данные могут быть 'строкой' или {объектом}!
                        headers: {
                            // 'Content-Type': 'multipart/form-data;boundary="boundary"',//заголовки обязателны для получения данных
                            'Authorization': `Bearer ${token1}`
                        }
                    });
                    //const json = await response.json();
                    //console.log('Ответ:', JSON.stringify(json))

                    if(response.status === 201) {
                        this.setState({openAlert: true, color: 'success', text: 'Успешно'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }
                    if (response.status === 400) {
                        this.setState({openAlert: true, color: 'danger', text: 'Неверные данные'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }
                    if (response.status === 500) {
                        this.setState({openAlert: true, color: 'danger', text: 'Ошибка загрузки файла'}, () => {
                            window.setTimeout(() => {
                                this.setState({openAlert: false})
                            }, 2000)
                        });
                    }


                } catch (error) {
                    console.error('Ошибка:', error); //выдаёт ошибку в консоль
                }
            } catch (error) {
                console.error('Ошибка:', error); //выдаёт ошибку в консоль
            }

        }else{
            console.log('differen table')
        }
    }
        }



  render() {
    /* data - json, schema - cols, html - ... */
    

      return (
      <div style={{marginLeft: '10%'}}>
          {
              this.state.openAlert ?  //компонент вывода предупреждения
                  <Alert
                      color={this.state.color} //цвет оповещения
                      text={this.state.text} // текст в оповещении
                      onCloseAlert={this.onCloseAlert} // функция как закрыть это окошко
                  />
                  :null
          }
          <form name='inputForm' >
            <input type="file" id="file" name='file' accept={ SheetJSFT } onChange={this.handleChange} />
          </form>
          <div style={{height:'150px', width:'500px', marginLeft:'40%'}}>
              <TextField
                  margin="dense"
                  id="option_id"
                  label="Выберете загрузка учебного плана или нагрузки"
                  type="text"
                  fullWidth={true}
                  error={!!this.state.errors.option_id}
                  helperText={this.state.errors.option_id}
                  onChange={(event) => this.setState({ option_id: event.target.value })}
                  defaultValue= '1'
                  select
              >
                  <MenuItem key={Math.random()*100} value="1">Учебный план</MenuItem>
                  <MenuItem key={Math.random()*100} value="2">Нагрузка</MenuItem>

              </TextField>
              {this.state.option_id == 1?
                  <TextField
                      margin="dense"
                      id="spec_id"
                      label="Выберете Специальность"
                      type="text"
                      fullWidth={true}
                      error={!!this.state.errors.spec_id}
                      helperText={this.state.errors.spec_id}
                      onChange={(event) => {
                          console.log(event.target.value)
                          this.setState({ spec_id: event.target.value })
                      }}
                      defaultValue=''
                      select
                  >
                      {this.renderOptionsSpec()}

                  </TextField>
                  :
                  null
              }
              {this.state.option_id == 2?
                  <React.Fragment>
                  <TextField
                      margin="dense"
                      id="depart_id"
                      label="Выберете кафедру для загрузки нагрузки"
                      type="text"
                      fullWidth={true}
                      error={!!this.state.errors.id}
                      helperText={this.state.errors.id}
                      onChange={(event) => {
                          console.log(event.target.value)
                          this.setState({ depart_id: event.target.value })
                      }}
                      defaultValue=''
                      select
                  >
                      {this.renderOptionsDepar()}

                  </TextField>

                  <TextField
                      margin="dense"
                      id="year_join"
                      label="Год начала действия нагрузки"
                      type="date"
                      fullWidth={true}
                      error={!!this.state.errors.begin_date}
                      helperText={this.state.errors.begin_date}
                      onChange={(event) => {
                          this.setState({ begin_date: event.target.value })
                          //console.log(event.target.value)

                      }}
                      defaultValue="2017-05-24"
                  />
                  <TextField
                  margin="dense"
                  id="year_join"
                  label="Год окончания действия нагрузки"
                  type="date"
                  fullWidth={true}
                  error={!!this.state.errors.end_date}
                  helperText={this.state.errors.end_date}
                  onChange={(event) => {
                  this.setState({ end_date: event.target.value })
                  //console.log(event.target.value)

              }}
                  defaultValue="2017-05-24"
                  />
                  </React.Fragment>
                  :
                    null
              }
          </div>
        {/* <button onClick={(e)=>this.loadClick(e)}>Загрузить с сервера</button> */}
        <Button
            style={{backgroundColor:'#007cff', color:'white', marginLeft: '10px'}}
            size="small"
            //color="primary"
            variant="contained"
            onClick={this.uploadData}
        >Загрузить на сервер</Button>
        <br />
        <input type="text" value={this.state.search_Text_Value} onChange ={this.nameSer}  disabled = {(this.state.disabled)? "disabled" : ""} />
        <Button
            style={{backgroundColor:'#007cff', color:'white', marginLeft: '10px'}}
            size="small"
            //color="primary"
            variant="contained"
            type="button"
            onClick={this.search}
        >Поиск</Button>
        <ViewerTable data={(this.state.search_Text==='') ? this.state.data : this.state.data_filtered} schema={ this.state.cols } filtered={this.state.search_Text!==""}></ViewerTable>
      </div>
    )
      
  }

}


// Можно сделать коллбэк для возврата данных из компонента 
export { Parser };