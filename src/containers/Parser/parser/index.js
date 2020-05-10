import React, { Component } from 'react';
import XLSX from 'xlsx'; // Библиотека парсера
import { make_cols, SheetJSFT } from './utils'; // Доп. функции для парсера
import { ViewerTable } from '../viewer-table/index'; // Компонент для отображения данных
import './style.css';
import { Button } from '@material-ui/core';
 
class Parser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      data_filtered: [],
      cols: [],
      search_Text: '',
      search_Text_Value: '',
      disabled: true //включено ли поле для поиска
    }
    this.uploadData = this.uploadData.bind(this)
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.nameSer = this.nameSer.bind(this);
    this.url="http://localhost:4000/shrek/";
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

uploadData(){

    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    let myDate = new Date()
    let today = myDate.getDate() + " " + months[myDate.getMonth()] +
        " " + (myDate.getFullYear()) + ", " + days[myDate.getDay()];

    let nextYear = myDate.getDate() + " " + months[myDate.getMonth()] +
        " " + (myDate.getFullYear()+1) + ", " + days[myDate.getDay()];

    let nextModif = myDate.getDate() + " " + months[myDate.getMonth()+5] +
        " " + (myDate.getFullYear()) + ", " + days[myDate.getDay()+6];

      let fetchData = {
          departament_id:1,
          begin_date:today,
          end_date:nextYear,
          modified_date:nextModif,
          disciplines:[]

      }
    //console.log(fetchData)
    if (this.state.data == 0){
      console.log('Не загруженны данные')
    }else{
      //console.log('Щас посмотрим')
        let sem_number = 1
        if(this.state.data[0].A == 'Расчет часов учебной работы по кафедре Инфокогнитивные технологии'){
            console.log('Нагрузка')
            for(let i=4; i<this.state.data.length; i++){
                let bufData = this.state.data[i]

                let myReg0 = /(Семестр)/
                let sem = myReg0.test(bufData.A)

                let myReg4 = /(Итого)/
                let itogo = myReg4.test(bufData.A)

                let num_groups

                if(sem){
                    let a = bufData.A.split(' ')
                    sem_number = +a[a.length - 1]
                }

                if(bufData.C != undefined){
                    let b = bufData.C.split(';')
                    num_groups = b.slice(0, -1)
                }

                if (sem || itogo) continue;


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
                    fetchData.disciplines.push(newData)
                }

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
                    bufData.D = '-1'

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
                    arrayAG.push(String(bufData.AG).split('.'))
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
                fetchData.disciplines.push(newData)
            }

        }else{
            console.log('differen table')
        }


        console.log(fetchData)



    }
}


  render() {
    /* data - json, schema - cols, html - ... */
    

      return (
      <div style={{'margin-left': '10%'}}>
        <input type="file" id="file" accept={ SheetJSFT } onChange={this.handleChange} />
        {/* <button onClick={(e)=>this.loadClick(e)}>Загрузить с сервера</button> */}
        <Button style={{'margin-left': '10px'}} color="primary" variant="contained" onClick={this.uploadData}>Загрузить на сервер</Button>
        <br />
        <input type="text" value={this.state.search_Text_Value} onChange ={this.nameSer}  disabled = {(this.state.disabled)? "disabled" : ""} />
        <Button style={{'margin-left': '10px'}} color="primary" variant="contained" type="button" onClick={this.search}>Поиск</Button>
        <ViewerTable data={(this.state.search_Text==='') ? this.state.data : this.state.data_filtered} schema={ this.state.cols } filtered={this.state.search_Text!==""}></ViewerTable>
      </div>
    )
      
  }

}


// Можно сделать коллбэк для возврата данных из компонента 
export { Parser };